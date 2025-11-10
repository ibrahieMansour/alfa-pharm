import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadOrderPDF = (order) => {
  if (!order) return;

  // Create PDF
  const doc = new jsPDF();

  // ===== PAGE BORDER =====
  doc.setLineWidth(1.5);
  doc.setDrawColor(0, 0, 0); // black
  doc.rect(5, 5, 200, 287); // x, y, width, height (A4 with 10mm margin)

  // ===== TITLE =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(41, 128, 185); // blue
  doc.text("Order Details", 14, 25);

  // ===== BASIC INFO =====
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  const info = [
    { label: "Order ID", value: order.id },
    { label: "Date", value: order.date },
    { label: "Status", value: order.status },
    { label: "Customer", value: order.customer },
    { label: "Total", value: `$${order.total}` },
  ];

  let y = 35;
  info.forEach((item) => {
    doc.text(`${item.label}: ${item.value}`, 14, y);
    y += 7;
  });

  doc.text("Items:", 14, y + 5);

  // ===== TABLE DATA =====
  const tableData = order.items.map((item) => [
    item.id,
    item.name,
    item.quantity,
    `$${item.price}`,
    `$${item.quantity * item.price}`,
  ]);

  // ===== DRAW TABLE =====
  autoTable(doc, {
    startY: y + 10,
    head: [["#", "Name", "Qty", "Price", "Subtotal"]],
    body: tableData,
    theme: "grid", // adds borders
    styles: { fontSize: 10, cellPadding: 4, lineColor: [0, 0, 0], lineWidth: 0.5 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
    bodyStyles: { fillColor: [245, 245, 245] }, // light gray for body rows
    alternateRowStyles: { fillColor: [255, 255, 255] }, // white for alternate rows
    columnStyles: {
      2: { halign: "center" }, // quantity center
      3: { halign: "right" },  // price right
      4: { halign: "right" },  // subtotal right
    },
  });

  // ===== SAVE PDF =====
  doc.save(`Order_${order.id}.pdf`);
};
