import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const WorkUnitListPartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/workUnit/WorkUnitList"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <WorkUnitListPartial />;
};

export default Page;
