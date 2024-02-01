import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const WorkPartListPartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/workPart/WorkPartList"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <WorkPartListPartial />;
};

export default Page;
