import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const WorkGroupListPartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/workGroup/WorkGroupList"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <WorkGroupListPartial />;
};

export default Page;
