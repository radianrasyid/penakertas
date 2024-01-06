import { ReactNode } from "react";

export interface RouteData {
  route: string;
  name: string;
  icon: ReactNode | null;
  children: RouteData[];
}
