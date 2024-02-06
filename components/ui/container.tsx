import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div className={cn("rounded-lg bg-white p-4", className)}>{children}</div>
  )
);

export default Container;
