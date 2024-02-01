import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const ProvinceListPartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/province/ProvinceList"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <ProvinceListPartial />;
};

export default Page;
