import Products from "@/assets/icons/products.svg?react";
import Orders from "@/assets/icons/orders.svg?react";
import Users from "@/assets/icons/users.svg?react";
import Staff from "@/assets/icons/staff.svg?react";

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
    path: "/customers",
  },
  {
    title: "المسؤولين",
    icon: Staff,
    path: "/staff",
  },
];

export const statusStyles = {
  PENDING: {
    text: "قيد الانتظار",
    class: "bg-yellow-100 text-yellow-800",
  },
  CONFIRMED: {
    text: "تم التأكيد",
    class: "bg-blue-100 text-blue-800",
  },
  SHIPPED: {
    text: "تم الشحن",
    class: "bg-violet-100 text-violet-800",
  },
  COMPLETED: {
    text: "مكتمل",
    class: "bg-green-100 text-green-800",
  },
  CANCELLED: {
    text: "تم الإلغاء",
    class: "bg-red-100 text-red-800",
  },
};
