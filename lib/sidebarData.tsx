import { RouteData } from "@/types/sidebar";
import { MdEditDocument, MdPolicy } from "react-icons/md";

export const sidebarData: RouteData[] = [
  {
    route: "/registration",
    children: [
      {
        route: "/admin/registration-list",
        children: [],
        name: "Registration List",
        icon: null,
      },
    ],
    icon: <MdEditDocument />,
    name: "Registration",
  },
  {
    route: "/admin/policy-input",
    children: [],
    icon: <MdPolicy />,
    name: "Police Input",
  },
];
