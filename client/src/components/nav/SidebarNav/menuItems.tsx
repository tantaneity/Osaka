import { ReactNode } from "react";
import { PresentationChartBarIcon, ShoppingBagIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";

export interface MenuItemType {
  title: string;
  icon: ReactNode;
  children: string[];
}

export const menuItems: MenuItemType[] = [
  {
    title: "Dashboard",
    icon: <PresentationChartBarIcon className="h-5 w-5" />,
    children: ["Analytics"],
  },
  {
    title: "E-Commerce",
    icon: <ShoppingBagIcon className="h-5 w-5" />,
    children: ["Orders", "Products", "New Product"],
  },
  { title: "Inbox", icon: <InboxIcon className="h-5 w-5" />, children: [] },
  { title: "Log Out", icon: <PowerIcon className="h-5 w-5" />, children: [] },
];
