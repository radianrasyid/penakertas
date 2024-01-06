import { ReactNode } from "react";
import { Toaster } from "sonner";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full">
        {children}
      </div>
      <Toaster richColors />
    </>
  );
};

export default AuthLayout;
