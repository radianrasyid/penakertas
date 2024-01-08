import { GetSessionData } from "@/lib/actions";
import { POSTCheckUserRole } from "@/services/user/api";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { ReactNode } from "react";

const isAdmin = async () => {
  const data = await GetSessionData();
  const res = await POSTCheckUserRole(data?.user?.email as string);
  console.log("ini response", res.data);
  if (res.data === "ADMIN" || res.data === "SUPER_ADMIN") return true;
  else return false;
};

const DataMasterLayout = async ({
  children,
  req,
}: {
  children: ReactNode;
  req: NextRequest;
}) => {
  const isAdminCheck = await isAdmin();
  if (isAdminCheck) return <>{children}</>;
  return redirect("/");
};

export default DataMasterLayout;
