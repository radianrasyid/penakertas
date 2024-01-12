import { ReactNode } from "react";
import { Toaster } from "sonner";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen md:min-h-[100vh] tab:min-h-[50vh] tab_port:min-h-[50vh] sm:min-h-screen w-full">
        {children}
      </div>
      <Toaster richColors />
    </>
  );
};

export default AuthLayout;
