export function createInvoiceHTML(order) {
//     return `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8" />

//     <style>
//       @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&display=swap');

//       body {
//         font-family: 'Cairo', sans-serif;
//         padding: 25px;
//         background: #fff;
//       }

//       .rtl { direction: rtl; text-align: right; }
//       .ltr { direction: ltr; text-align: left; }

//       h1, h2, h3 { margin: 5px 0; }

//       .header {
//         display: flex;
//         justify-content: space-between;
//         margin-bottom: 25px;
//       }

//       .box {
//         border: 1px solid #ddd;
//         padding: 15px;
//         border-radius: 6px;
//         margin-bottom: 20px;
//       }

//       table {
//         width: 100%;
//         border-collapse: collapse;
//         margin-top: 20px;
//       }

//       th, td {
//         border: 1px solid #ccc;
//         padding: 12px;
//         font-size: 14px;
//       }

//       th {
//         background: #f5f5f5;
//       }

//       .total {
//         font-size: 18px;
//         font-weight: bold;
//         margin-top: 20px;
//       }
//     </style>
//   </head>

//   <body>

//     <!-- English Header -->
//     <div class="header ltr">
//       <div>
//         <h2>Invoice</h2>
//         <p>Invoice Number: ${order.orderNumber}</p>
//         <p>Date: ${order.createdAt}</p>
//         <p>Status: ${order.status}</p>
//       </div>
//     </div>

//     <!-- Arabic Header -->
//     <div class="header rtl">
//       <div>
//         <h2>فاتورة</h2>
//         <p>رقم الفاتورة: ${order.orderNumber}</p>
//         <p>التاريخ: ${order.createdAt}</p>
//         <p>الحالة: ${order.status}</p>
//       </div>
//     </div>

//     <!-- Customer Info -->
//     <div class="box">
//       <h3 class="ltr">Customer Information</h3>
//       <p class="ltr">Name: ${order.user.name}</p>
//       <p class="ltr">Phone: ${order.user.phone}</p>
//       <p class="ltr">Address: ${order.user.address}</p>

//       <h3 class="rtl">معلومات العميل</h3>
//       <p class="rtl">الاسم: ${order.user.name}</p>
//       <p class="rtl">الهاتف: ${order.user.phone}</p>
//       <p class="rtl">العنوان: ${order.user.address}</p>
//     </div>

//     <!-- Items Table -->
//     <table>
//       <thead>
//         <tr>
//           <th class="ltr">Product</th>
//           <th class="ltr">Quantity</th>
//           <th class="ltr">Price</th>
//           <th class="ltr">Total</th>
//         </tr>
//       </thead>

//       <tbody>
//         ${order.items
//             .map(
//                 (item) => `
//               <tr>
//                 <td>${item.product.name}</td>
//                 <td>${item.quantity}</td>
//                 <td>${item.price}</td>
//                 <td>${item.quantity * item.price}</td>
//               </tr>
//             `
//             )
//             .join("")}
//       </tbody>
//     </table>

//     <!-- Total -->
//     <div class="total ltr">Total Amount: ${order.totalAmount}</div>
//     <div class="total rtl">الإجمالي: ${order.totalAmount}</div>

//   </body>
//   </html>
//   `;

return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Invoice</title>
  <style>
    /* Paste the CSS provided above here */
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&display=swap');

    body {
      font-family: 'Cairo', sans-serif;
      padding: 25px;
      background: #f5f5f5;
      color: #333;
    }

    .rtl {
      direction: rtl;
      text-align: right;
    }

    .ltr {
      direction: ltr;
      text-align: left;
    }

    h1,
    h2,
    h3 {
      margin: 0;
    }

    .header-container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px 25px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .logo {
      text-align: center;
      margin-bottom: 20px;
    }

    .logo img {
      max-width: 150px;
    }

    .invoice-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      flex-wrap: wrap;
    }

    .invoice-title h1 {
      font-size: 28px;
      color: #333;
      flex-grow: 1;
    }

    .invoice-meta {
      display: flex;
      gap: 20px;
      font-size: 14px;
      color: #555;
      flex-wrap: wrap;
    }

    .invoice-meta p {
      margin: 0;
    }

    .order-details-box {
      display: flex;
      justify-content: space-between;
      background-color: #e0f2f7; /* Light blue background */
      border: 1px solid #b3e5fc; /* Slightly darker blue border */
      border-radius: 6px;
      padding: 15px 20px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #01579b; /* Dark blue text */
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      flex-wrap: wrap;
    }

    .detail-item {
      margin-bottom: 5px;
    }

    .status-pending {
      background-color: #ff9800; /* Orange for pending */
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 13px;
    }

    .customer-info-box {
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 15px 20px;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .customer-info-box h3 {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
    }

    .customer-info-grid {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .customer-info-item {
      flex: 1;
      min-width: 200px;
      margin-right: 20px;
      margin-bottom: 10px;
    }

    .customer-info-item:last-child {
      margin-right: 0;
    }

    .customer-info-item p {
      margin: 5px 0;
      font-size: 14px;
      color: #555;
    }

    .section-title {
      font-size: 18px;
      color: #333;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0;
      background-color: #ffffff;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    th,
    td {
      border: 1px solid #eee;
      padding: 12px 15px;
      font-size: 14px;
      text-align: left;
    }

    th {
      background: #f8f8f8;
      font-weight: 600;
      color: #333;
    }

    td {
      color: #555;
    }

    .product-details-table thead th:first-child {
      width: 40%;
    }

    .total-amount-box {
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 15px 20px;
      margin-top: 20px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .total-amount-box .label {
      color: #333;
    }

    .total-amount-box .value {
      color: #007bff; /* Blue for total amount */
    }

    @media (max-width: 768px) {
      .invoice-title {
        flex-direction: column;
        align-items: flex-start;
      }

      .invoice-meta {
        flex-direction: column;
        gap: 5px;
        margin-top: 10px;
      }

      .order-details-box,
      .customer-info-grid {
        flex-direction: column;
      }

      .customer-info-item {
        margin-right: 0;
        width: 100%;
      }

      th, td {
        padding: 10px;
      }
    }
  </style>
</head>

<body>
  <div class="header-container">
    <div class="logo">
      <img src="https://example.com/alfapharm_logo.png" alt="AlfaPharm Logo" /> </div>

    <div class="invoice-title ltr">
      <h1>Order Invoice - فاتورة الطلب</h1>
      <div class="invoice-meta">
        <p>Order #: 69-20251113 - 20251113-69</p>
        <p>رقم الطلب: 69-20251113 - 20251113-69</p>
      </div>
    </div>
    <p class="ltr" style="text-align: center; font-size: 12px; color: #777;">Generated on: 14/11/2025 00:30</p>
  </div>

  <div class="order-details-box">
    <div class="ltr">
      <div class="detail-item">Order Date: <strong>13/11/2025</strong></div>
      <div class="detail-item">Order Status: <span class="status-pending">PENDING</span></div>
    </div>
    <div class="rtl">
      <div class="detail-item">تاريخ الطلب: <strong>13/11/2025</strong></div>
      <div class="detail-item">حالة الطلب: <span class="status-pending">معلقة</span></div>
    </div>
  </div>

  <div class="customer-info-box">
    <h3 class="ltr">Customer Information</h3>
    <h3 class="rtl">بيانات العميل</h3>
    <div class="customer-info-grid">
      <div class="customer-info-item ltr">
        <p>Name - الاسم: محمد أحمد</p>
        <p>Phone - رقم الهاتف: 201023738366</p>
      </div>
      <div class="customer-info-item ltr">
        <p>Address - العنوان: المبيش أول</p>
      </div>
    </div>
  </div>

  <h3 class="section-title ltr">Product Details - تفاصيل المنتجات</h3>
  <table class="product-details-table">
    <thead>
      <tr>
        <th class="ltr">Product Name - اسم المنتج</th>
        <th class="ltr">Qty - الكمية</th>
        <th class="ltr">Price - السعر</th>
        <th class="ltr">Total - الإجمالي</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>aspain 100mg 4</td>
        <td>9</td>
        <td>$450.00</td>
        <td>$4050.00</td>
      </tr>
      <tr>
        <td>aspain 100mg 9</td>
        <td>2</td>
        <td>$100.00</td>
        <td>$200.00</td>
      </tr>
      <tr>
        <td>gfg</td>
        <td>2</td>
        <td>$10.00</td>
        <td>$20.00</td>
      </tr>
      <tr>
        <td>aspain 100mg 7</td>
        <td>10</td>
        <td>$50.00</td>
        <td>$500.00</td>
      </tr>
      <tr>
        <td>aspain 100mg 8</td>
        <td>3</td>
        <td>$150.00</td>
        <td>$450.00</td>
      </tr>
    </tbody>
  </table>

  <div class="total-amount-box">
    <span class="label ltr">Total Amount - المجموع الكلي</span>
    <span class="value ltr">$1210.00</span>
  </div>
</body>
</html>
`;
}