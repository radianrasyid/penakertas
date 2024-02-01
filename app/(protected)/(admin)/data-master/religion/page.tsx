import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const ReligionListPartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/religion/ReligionList"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <ReligionListPartial />;
};

export default Page;
