import { GetSessionData } from "@/lib/actions";
import { POSTCheckUserRole } from "@/services/user/api";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const isAdmin = async () => {
  const data = await GetSessionData();
  const res = await POSTCheckUserRole({
    email: data?.user?.email as string,
  });
  if (res.data === "ADMIN" || res.data === "ROOT") return true;
  else return false;
};

const DataMasterLayout = async ({ children }: { children: ReactNode }) => {
  const isAdminCheck = await isAdmin();
  if (isAdminCheck) return <>{children}</>;
  return redirect("/");
};

export default DataMasterLayout;
