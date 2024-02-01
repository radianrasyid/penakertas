import LoadingScreen from "@/components/ui/loading-screen";
import dynamic from "next/dynamic";

const ProvinceEditPagePartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/ward/WardUpdate"),
  {
    loading: () => <LoadingScreen />,
  }
);

const EditProvince = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return <ProvinceEditPagePartial id={params.id} />;
};

export default EditProvince;
