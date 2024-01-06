import Sidebar from "@/components/layout/Layout";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full">
      {/* SIDEBAR */}
      <Sidebar />

      {/* NAVBAR AND CONTENT */}
      <div className="flex flex-col flex-1 flex-grow gap-3 transition-all duration-200 ease-in-out md:gap-0">
        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <main className="transition-all flex-1 px-3 max-w-[92vw] min-w-full min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
