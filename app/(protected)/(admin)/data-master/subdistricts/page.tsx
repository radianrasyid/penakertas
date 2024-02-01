import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const SubdistrictMasterPagePartial = dynamic(
  () =>
    import("@/components/pageComponent/DataMaster/subdistrict/SubdistrictList"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <SubdistrictMasterPagePartial />;
};

export default Page;
