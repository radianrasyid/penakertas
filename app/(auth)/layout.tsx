import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen md:min-h-[100vh] tab:min-h-[50vh] tab_port:min-h-[50vh] sm:min-h-screen w-full">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
