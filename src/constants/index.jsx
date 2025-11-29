import Products from "@/assets/icons/products.svg?react";
import Orders from "@/assets/icons/orders.svg?react";
import Users from "@/assets/icons/users.svg?react";
import Admins from "@/assets/icons/admins.svg?react";

export const sideBarNav = [
  {
    title: "الطلبات",
    icon: Orders,
    path: "/orders",
  },
  {
    title: "التصنيفات",
    icon: Products,
    path: "/categories",
  },
  {
    title: "المنتجات",
    icon: Products,
    path: "/products",
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
  PENDING: createStatusStyle("قيد المعالجة", "yellow"),
  CONFIRMED: createStatusStyle("تم التأكيد", "lite-green"),
  SHIPPED: createStatusStyle("تم الشحن", "blue"),
  COMPLETED: createStatusStyle("تم التوصيل", "green"),
  CANCELLED: createStatusStyle("تم الإلغاء", "red"),
};

function createStatusStyle(text, color) {
  const colorMap = {
    yellow: {
      class: "bg-yellow-100 text-[#FAC200]",
      border: "border border-[#FAC200]",
      hover: "hover:bg-yellow-100 hover:text-[#FAC200] hover:border-[#FAC200]",
    },
    "lite-green": {
      class: "bg-lime-100 text-[#5EB756]",
      border: "border border-[#5EB756]",
      hover: "hover:bg-lime-100 hover:text-[#5EB756] hover:border-[#5EB756]",
    },
    blue: {
      class: "bg-blue-100 text-[#5DADE2]",
      border: "border border-[#5DADE2]",
      hover: "hover:bg-blue-100 hover:text-[#5DADE2] hover:border-[#5DADE2]",
    },
    green: {
      class: "bg-green-100 text-[#1A7012]",
      border: "border border-[#1A7012]",
      hover: "hover:bg-green-100 hover:text-[#1A7012] hover:border-[#1A7012]",
    },
    red: {
      class: "bg-red-100 text-[#E74C3C]",
      border: "border border-[#E74C3C]",
      hover: "hover:bg-red-100 hover:text-[#E74C3C] hover:border-[#E74C3C]",
    },
  };

  return {
    text: text || "fghfhfg",
    ...colorMap[color],
  };
}
