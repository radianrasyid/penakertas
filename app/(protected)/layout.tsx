import { GetSessionData } from "@/lib/actions";
import { POSTCheckUserRole } from "@/services/user/api";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const NavbarPartial = dynamic(() => import("@/components/layout/Navbar"), {
  loading: () => (
    <div className="h-11 flex items-center justify-between bg-blue-950 px-3 py-7 flex-grow md:px-3 animate-pulse">
      <span></span>
    </div>
  ),
  ssr: false,
});
const SidebarPartial = dynamic(() => import("@/components/layout/Layout"), {
  loading: () => (
    <div className="bg-blue-950 min-h-screen translate-x-0 w-60 md:w-0 animate-pulse"></div>
  ),
  ssr: false,
});

const getRole = async () => {
  const data = await GetSessionData();
  const res = await POSTCheckUserRole({
    email: data?.user?.email as string,
  });

  return res;
};

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const dataRole = await getRole();
  return (
    <div className="flex w-full">
      {/* SIDEBAR */}
      <SidebarPartial role={dataRole.data as string} />

      {/* NAVBAR AND CONTENT */}
      <div className="flex flex-col flex-1 flex-grow gap-3 transition-all duration-200 ease-in-out md:gap-0">
        {/* NAVBAR */}
        <NavbarPartial />

        {/* CONTENT */}
        <main className="transition-all flex-1 px-3 max-w-[92vw] min-w-full min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
