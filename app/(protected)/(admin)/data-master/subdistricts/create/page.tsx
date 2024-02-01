import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const SubdistrictCreatePartial = dynamic(
  () =>
    import(
      "@/components/pageComponent/DataMaster/subdistrict/CreateSubdistrict"
    ),
  {
    loading: () => <LoadingScreen />,
  }
);

const Page = () => {
  return <SubdistrictCreatePartial />;
};

export default Page;
