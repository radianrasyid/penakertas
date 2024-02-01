import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const WardCreatePartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/ward/CreateWard"),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <WardCreatePartial />;
};

export default Page;
