import { statusStyles } from "@/constants/index.jsx"
import { formatDate } from "@/utils/formatDate"

export function createInvoiceHTML(order) {
  const itemsHTML = order.items
    .map(
      (item) => `
        <tr>
          <td>${item.product.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.price * item.quantity}</td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Invoice</title>

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&display=swap");
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');

      body {
        font-family: "Cairo", sans-serif;
        padding: 25px;
        background: white;
        color: #333;
      }

      .rtl { direction: rtl; text-align: right; }
      .ltr { direction: ltr; text-align: left; }

      h1, h2, h3 { margin: 0; }

      .header-container { text-align: center; }
      .logo {
        font-weight: bold;
        font-size: 65px;
        margin-bottom: 20px;
        color: #E97E39;
        font-family: 'Roboto Slab', serif;
        font-weight: 400;
      }
      .logo span { color: green; }
      .pdf-logo { width: 100px; height: 100px; }

      .header-container .date {
        font-size: 12px;
        color: #777;
      }

      .order-details-box,
      .customer-info-box {
        background-color: #e3e3e3;
        border: 1px solid #000;
        border-radius: 20px;
        padding: 15px 20px;
        margin-bottom: 20px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      }

      .order-details-grid,
      .customer-info-grid {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .order-details-item p,
      .customer-info-item p {
        margin: 5px 0;
        font-size: 14px;
        color: #000;
      }

      .order-details-item span {
        font-size: 12px;
        font-weight: bold;
        padding: 1px 20px;
        border-radius: 8px;
        border: 1px solid;
      }

      /* STATUS COLORS */
      .PENDING {
        color: #fac200;
        background-color: #fff7cc;
        border-color: #fac200;
      }
      .CONFIRMED {
        color: #5eb756;
        background-color: #e8f7e7;
        border-color: #5eb756;
      }
      .SHIPPED {
        color: #5dade2;
        background-color: #e8f4fb;
        border-color: #5dade2;
      }
      .COMPLETED {
        color: #1a7012;
        background-color: #e4f4e2;
        border-color: #1a7012;
      }
      .CANCELLED {
        color: #e74c3c;
        background-color: #fdecea;
        border-color: #e74c3c;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      }

      table th, table td {
        border: 1px solid #eee;
        padding: 12px 15px;
        font-size: 14px;
        text-align: left;
        color: #555;
      }

      table th {
        background: #f8f8f8;
        font-weight: 600;
        color: #333;
      }

      .total-amount-box {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 15px 20px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: bold;
      }

      .value { color: #007bff; }
    </style>
  </head>

  <body>
    <div class="header-container">
      <div class="logo">Alfa<span>Pharm</span></div>

      <h1>Order Invoice - فاتورة الطلب</h1>
      <p>Order #${order.orderNumber}: رقم الطلب</p>
      <p class="date">Generated on: ${formatDate(new Date())}</p>
    </div>

    <div class="order-details-box">
      <div class="order-details-grid">
        <div class="order-details-item">
          <p>Order Date - تاريخ الطلب</p>
          <p>${formatDate(order.createdAt)}</p>
        </div>

        <div class="order-details-item">
          <p>Order Status - حالة الطلب</p>
          <span class="${order.status}">${statusStyles[order.status].text}</span>
        </div>
      </div>
    </div>

    <div class="customer-info-box">
      <h3 class="ltr">Customer Information - بيانات العميل</h3>
      <div class="customer-info-grid">
        <div class="customer-info-item ltr">
          <p>Name - الاسم</p>
          <p>${order.user.name}</p>
        </div>
        <div class="customer-info-item ltr">
          <p>Phone - رقم الهاتف</p>
          <p>${order.user.phone.slice(1)}</p>
        </div>
        <div class="customer-info-item ltr">
          <p>Address - العنوان</p>
          <p>${order.user.address}</p>
        </div>
      </div>
    </div>

    <h3 class="section-title ltr">Product Details - تفاصيل المنتجات</h3>

    <table class="product-details-table">
      <thead>
        <tr>
          <th class="ltr">Product Name</th>
          <th class="ltr">Qty</th>
          <th class="ltr">Price</th>
          <th class="ltr">Total</th>
        </tr>
      </thead>

      <tbody>
        ${itemsHTML}
      </tbody>
    </table>

    <div class="total-amount-box">
      <span class="label ltr">Total Amount - المجموع الكلي</span>
      <span class="value ltr">$${order.totalAmount}</span>
    </div>
  </body>
</html>
`;
}
