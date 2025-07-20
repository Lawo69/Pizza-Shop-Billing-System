import { FaHome } from 'react-icons/fa';
import { FaBoxOpen } from "react-icons/fa";
import { PiInvoiceBold } from "react-icons/pi";

export const menuItems = [
    {
        text: "Dashboard",
        icon: <FaHome />,
        href: "/",
    },
    {
        text: "Items",
        icon: <FaBoxOpen />,
        href: "/item",
    },
    {
        text: "Invoices",
        icon: <PiInvoiceBold />,
        href: "/invoice",
    },
]

export const routeTitles = {
  '/': 'Dashboard',
  '/item': 'Items Managements',
  '/invoice': 'Invoices',
}