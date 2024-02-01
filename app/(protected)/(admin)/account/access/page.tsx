import LoadingScreen from "@/components/ui/loading-screen";
import { GETAllAccessList } from "@/services/account/access/api";
import { AccessDataResponseType } from "@/types/general";
import dynamic from "next/dynamic";

const getAccessData = async () => {
  const result = await GETAllAccessList();
  return result;
};

const AccessMainPagePartial = dynamic(
  () => import("@/components/pageComponent/Account/Access/AccessMainPage"),
  {
    loading: () => <LoadingScreen />,
  }
);

const AccountAccessPage = async () => {
  const data = await getAccessData();
  return (
    <AccessMainPagePartial accessData={data.data as AccessDataResponseType[]} />
  );
};

export default AccountAccessPage;
