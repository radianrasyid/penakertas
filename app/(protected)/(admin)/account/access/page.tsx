import { GETAllAccessList } from "@/services/account/access/api";
import { AccessDataResponseType } from "@/types/general";
import dynamic from "next/dynamic";
import { VscLoading } from "react-icons/vsc";

const getAccessData = async () => {
  const result = await GETAllAccessList();
  return result;
};

const AccessMainPagePartial = dynamic(
  () => import("@/components/pageComponent/Account/Access/AccessMainPage"),
  {
    loading: () => (
      <div className="w-full min-h-screen rounded-lg bg-slate-300 animate-pulse flex gap-2 flex-wrap items-center justify-center">
        <VscLoading className={"animate-spin"} />
        <span className="text-sm font-semibold text-slate-900 bg-clip-text animate-pulse">
          Loading Page...
        </span>
      </div>
    ),
  }
);

const AccountAccessPage = async () => {
  const data = await getAccessData();
  return (
    <AccessMainPagePartial accessData={data.data as AccessDataResponseType[]} />
  );
};

export default AccountAccessPage;
