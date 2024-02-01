import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const WardMasterPagePartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/ward/WardList"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <WardMasterPagePartial />;
};

export default Page;
