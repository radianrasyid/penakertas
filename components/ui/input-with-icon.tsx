import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  inputClassname?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement | undefined>;
}

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      prefixIcon,
      inputClassname,
      suffixIcon,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={`${cn(
          "flex h-9 w-full rounded-lg border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )} ${error ? "border-red-500" : ""}`}
        onClick={() => {}}
      >
        {prefixIcon}
        <input
          type={type}
          ref={ref}
          onClick={onClick}
          {...props}
          className={`${cn(
            "flex-1 px-4 py-2 outline-none border-none bg-transparent flex w-full text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            inputClassname
          )}`}
        />
        <div className="flex-initial">{suffixIcon}</div>
      </div>
    );
  }
);
InputCustom.displayName = "Input";

export { InputCustom };
