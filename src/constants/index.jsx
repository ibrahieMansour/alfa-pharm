import Products from "@/assets/icons/products.svg?react";
import Orders from "@/assets/icons/orders.svg?react";
import Users from "@/assets/icons/users.svg?react";
import Admins from "@/assets/icons/admins.svg?react";

import avatar from "../assets/images/avatar.png";

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

export const orderOrderOrder = {
  orderNumber: "INV-1001",
  createdAt: "2025-11-11",
  status: "Pending",
  companyLogo: avatar,
  user: {
    image: avatar,
    name: "John Doe",
    phone: "123456789",
    address: "123 Main St",
  },
  items: [
    {
      price: 50,
      quantity: 1,
      product: { image: avatar, name: "Product 1" },
    },
    {
      price: 75,
      quantity: 2,
      product: { image: avatar, name: "Product 2" },
    },
    {
      price: 60,
      quantity: 3,
      product: { image: avatar, name: "Product 3" },
    },
    {
      price: 80,
      quantity: 1,
      product: { image: avatar, name: "Product 4" },
    },
    {
      price: 45,
      quantity: 2,
      product: { image: avatar, name: "Product 5" },
    },
    {
      price: 120,
      quantity: 1,
      product: { image: avatar, name: "Product 6" },
    },
    {
      price: 90,
      quantity: 2,
      product: { image: avatar, name: "Product 7" },
    },
    {
      price: 100,
      quantity: 1,
      product: { image: avatar, name: "Product 8" },
    },
    {
      price: 55,
      quantity: 3,
      product: { image: avatar, name: "Product 9" },
    },
    {
      price: 70,
      quantity: 2,
      product: { image: avatar, name: "Product 10" },
    },
  ],
};
