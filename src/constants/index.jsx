import Products from "@/assets/icons/products.svg?react";
import Orders from "@/assets/icons/orders.svg?react";
import Users from "@/assets/icons/users.svg?react";
import Admins from "@/assets/icons/admins.svg?react";

export const sideBarNav = [
  {
    title: "المنتجات",
    icon: Products,
    path: "/products",
  },
  {
    title: "الطلبات",
    icon: Orders,
    path: "/orders",
  },
  {
    title: "المستخدمين",
    icon: Users,
    path: "/users",
  },
  {
    title: "المسؤولين",
    icon: Admins,
    path: "/admins",
    roleNeed: "ADMIN",
  },
];

export const statusStyles = {
  PENDING: createStatusStyle("قيد الانتظار", "yellow"),
  CONFIRMED: createStatusStyle("تم التأكيد", "blue"),
  SHIPPED: createStatusStyle("تم الشحن", "violet"),
  COMPLETED: createStatusStyle("مكتمل", "green"),
  CANCELLED: createStatusStyle("تم الإلغاء", "red"),
};

function createStatusStyle(text, color) {
  const colorMap = {
    yellow: {
      class: "bg-yellow-100 text-yellow-800",
      border: "border border-yellow-800",
      hover: "hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-800",
    },
    blue: {
      class: "bg-blue-100 text-blue-800",
      border: "border border-blue-800",
      hover: "hover:bg-blue-100 hover:text-blue-800 hover:border-blue-800",
    },
    violet: {
      class: "bg-violet-100 text-violet-800",
      border: "border border-violet-800",
      hover: "hover:bg-violet-100 hover:text-violet-800 hover:border-violet-800",
    },
    green: {
      class: "bg-green-100 text-green-800",
      border: "border border-green-800",
      hover: "hover:bg-green-100 hover:text-green-800 hover:border-green-800",
    },
    red: {
      class: "bg-red-100 text-red-800",
      border: "border border-red-800",
      hover: "hover:bg-red-100 hover:text-red-800 hover:border-red-800",
    },
  };

  return {
    text: text || "fghfhfg",
    ...colorMap[color],
  };
}

// export const order = {
//   id: "ORD-1024",
//   date: "2025-11-08",
//   status: "SHIPPED",
//   total: 240.5,
//   customer: "John Doe",
//   items: [
//     {
//       id: 1,
//       name: "Wireless Headphones",
//       image: "https://picsum.photos/400/300",
//       quantity: 2,
//       price: 50,
//     },
//     {
//       id: 2,
//       name: "Smart Watch Smart Watch Smart Watch Smart Watch",
//       image: "https://picsum.photos/400/300",
//       quantity: 1,
//       price: 120.5,
//     },
//     {
//       id: 3,
//       name: "Phone Case",
//       image: "https://picsum.photos/400/300",
//       quantity: 3,
//       price: 20,
//     },
//     {
//       id: 4,
//       name: "Phone Case",
//       image: "https://picsum.photos/400/300",
//       quantity: 3,
//       price: 20,
//     },
//     {
//       id: 5,
//       name: "Phone Case",
//       image: "https://picsum.photos/400/300",
//       quantity: 3,
//       price: 20,
//     },
//     {
//       id: 6,
//       name: "Phone Case",
//       image: "https://picsum.photos/400/300",
//       quantity: 3,
//       price: 20,
//     },
//     {
//       id: 7,
//       name: "Phone Case",
//       image: "https://picsum.photos/400/300",
//       quantity: 3,
//       price: 20,
//     },
//     {
//       id: 8,
//       name: "Phone Case",
//       image: "https://picsum.photos/400/300",
//       quantity: 3,
//       price: 20,
//     },
//     {
//       id: 9,
//       name: "Phone Case",
//       image: "https://picsum.photos/400/300",
//       quantity: 3,
//       price: 20,
//     },
//     {
//       id: 10,
//       name: "Phone Case",
//       image: "https://picsum.photos/400/300",
//       quantity: 3,
//       price: 20,
//     },
//     {
//       id: 11,
//       name: "Phone Case",
//       image: "https://picsum.photos/400/300",
//       quantity: 3,
//       price: 20,
//     },
//   ],
// };

export const order = {
  id: "ORD-1024",
  date: "2025-11-08",
  status: "SHIPPED",
  total: 240.5,
  customer: "John Doe",
  items: Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    image: `https://picsum.photos/400/300?random=${i + 1}`,
    quantity: Math.floor(Math.random() * 5) + 1, // quantity between 1 and 5
    price: Math.floor(Math.random() * 100) + 10, // price between 10 and 109
  })),
};
