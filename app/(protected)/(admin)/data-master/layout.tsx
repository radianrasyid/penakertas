import { GetSessionData } from "@/lib/actions";
import { POSTCheckUserRole } from "@/services/user/api";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const isAdmin = async () => {
  const data = await GetSessionData();
  const res = await POSTCheckUserRole(data?.user?.email as string);
  console.log("ini response", res.data);
  if (res.data === "ADMIN" || res.data === "SUPER_ADMIN") return true;
  else return false;
};

const DataMasterLayout = async ({ children }: { children: ReactNode }) => {
  const isAdminCheck = await isAdmin();
  if (isAdminCheck)
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  return redirect("/");
};

export default DataMasterLayout;
