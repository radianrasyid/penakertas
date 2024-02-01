import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const MaritalStatusListPartial = dynamic(
  () =>
    import(
      "@/components/pageComponent/DataMaster/maritalStatus/MaritalStatusList"
    ),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <MaritalStatusListPartial />;
};

export default Page;
