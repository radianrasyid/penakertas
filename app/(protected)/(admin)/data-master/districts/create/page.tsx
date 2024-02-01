import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const DistrictCreateFormPartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/district/CreateDistrict"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <DistrictCreateFormPartial />;
};

export default Page;
