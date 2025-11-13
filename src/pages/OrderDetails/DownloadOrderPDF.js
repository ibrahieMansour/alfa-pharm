import jsPDF from "jspdf";

// Utility to convert URL to base64
async function getBase64FromUrl(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Utility to add image to PDF (URL or imported)
async function addImageToPDF(doc, src, x, y, width, height, format = "PNG") {
  let imageSrc = src;
  if (src.startsWith("http") || src.startsWith("https")) {
    imageSrc = await getBase64FromUrl(src);
  }
  const img = new Image();
  img.src = imageSrc;
  await new Promise((resolve) => {
    img.onload = resolve;
  });
  doc.addImage(img, format, x, y, width, height);
}

// Draw border on page
function drawPageBorder(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
}

// Main PDF generator
export default async function generateInvoice(order) {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  drawPageBorder(doc);

  // ------------------ Header ------------------
  const logoSize = 30;
  if (order.companyLogo) {
    await addImageToPDF(doc, order.companyLogo, 10, 10, logoSize, logoSize);
  }
  doc.setFontSize(18);
  doc.setTextColor(41, 128, 185); // blue
  doc.setFont("helvetica", "bold");
  doc.text("My Company", 10 + logoSize + 5, 20);

  // Invoice number
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text(`Invoice: ${order.orderNumber}`, pageWidth / 2, 45, { align: "center" });

  // ------------------ Order Info Box ------------------
  const orderInfoY = 50;
  doc.setFillColor(230, 240, 250); // light blue background
  doc.rect(10, orderInfoY, pageWidth - 20, 20, "F");
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.text(`Status: ${order.status}`, 15, orderInfoY + 7);
  doc.text(`Created At: ${order.createdAt}`, 15, orderInfoY + 15);

  // ------------------ User Info Box ------------------
  const userY = orderInfoY + 30;
  doc.setFillColor(245, 245, 245); // light gray
  doc.rect(10, userY, pageWidth - 20, 25, "F");
  if (order.user.image) {
    await addImageToPDF(doc, order.user.image, pageWidth - 60, userY + 2, 20, 20);
  }
  doc.text(`Name: ${order.user.name}`, 15, userY + 7);
  doc.text(`Phone: ${order.user.phone}`, 15, userY + 14);
  doc.text(`Address: ${order.user.address}`, 15, userY + 21);

  // ------------------ Table ------------------
  const tableStartY = userY + 40;
  const colX = [10, 50, 120, 150, 180];
  const rowHeight = 20;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255);
  doc.setFillColor(41, 128, 185); // header blue
  doc.rect(10, tableStartY - 6, pageWidth - 20, 8, "F");
  doc.text("Image", colX[0], tableStartY);
  doc.text("Product Name", colX[1], tableStartY);
  doc.text("Qty", colX[2], tableStartY);
  doc.text("Price", colX[3], tableStartY);
  doc.text("Total", colX[4], tableStartY);

  let currentY = tableStartY + 5;
  let totalQty = 0;
  let totalPrice = 0;

  doc.setFont("helvetica", "normal");
  for (let i = 0; i < order.items.length; i++) {
    const item = order.items[i];
    const itemTotal = item.price * item.quantity;
    totalQty += item.quantity;
    totalPrice += itemTotal;

    // alternating row color
    if (i % 2 === 0) doc.setFillColor(245, 245, 245);
    else doc.setFillColor(255, 255, 255);
    doc.rect(10, currentY - 2, pageWidth - 20, rowHeight, "F");

    // Product image
    if (item.product.image)
      await addImageToPDF(doc, item.product.image, colX[0], currentY - 2, 15, 15);
    doc.setTextColor(0);
    doc.text(item.product.name, colX[1], currentY + 7);
    doc.text(String(item.quantity), colX[2], currentY + 7);
    doc.text(String(item.price), colX[3], currentY + 7);
    doc.text(String(itemTotal), colX[4], currentY + 7);

    currentY += rowHeight;

    if (currentY > pageHeight - 40) {
      doc.addPage();
      drawPageBorder(doc);
      currentY = 20;
    }
  }

  // ------------------ Totals ------------------
  doc.setFont("helvetica", "bold");
  doc.setFillColor(200, 230, 255); // light blue for totals
  doc.rect(colX[2] - 2, currentY - 2, 28, 10, "F"); // under qty
  doc.rect(colX[4] - 2, currentY - 2, 28, 10, "F"); // under total
  doc.setTextColor(0);
  doc.text(`Total Qty: ${totalQty}`, colX[2], currentY + 5);
  doc.text(`Total Amount: ${totalPrice}`, colX[4], currentY + 5);

  // ------------------ Footer ------------------
  const footerY = pageHeight - 15;
  doc.setDrawColor(200);
  doc.setLineWidth(0.5);
  doc.line(10, footerY - 2, pageWidth - 10, footerY - 2);
  doc.setFontSize(10);
  doc.text("Thank you for your order!", pageWidth / 2, footerY, { align: "center" });
  doc.text("www.mycompany.com", pageWidth / 2, footerY + 5, { align: "center" });

  doc.save(`Invoice_${order.orderNumber}.pdf`);
}
