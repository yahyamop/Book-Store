import {
  Fullscreen,
  ClipboardList,
} from "lucide-react";

export const adminRoutes = [
  {
    label: "Categories",
    path: `/dashboard/categories`,
    icon: ClipboardList,
  },
  {
    label: "Books",
    path: `/dashboard/books`,
    icon: Fullscreen,
  },
];
