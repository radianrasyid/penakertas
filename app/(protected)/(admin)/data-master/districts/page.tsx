import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const DistrictMasterPagePartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/district/DistrictList"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <DistrictMasterPagePartial />;
};

export default Page;
