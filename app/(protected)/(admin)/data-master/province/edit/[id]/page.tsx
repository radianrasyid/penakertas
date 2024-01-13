import { GETProvinceById } from "@/services/geolocation/api";
import dynamic from "next/dynamic";
import { VscLoading } from "react-icons/vsc";

const ProvinceEditPagePartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/province/ProvinceUpdate"),
  {
    loading: () => (
      <div className="w-full h-24 rounded-lg bg-slate-300 animate-pulse flex gap-2 flex-wrap items-center justify-center">
        <VscLoading className={"animate-spin"} />
        <span className="text-sm font-semibold text-slate-900 bg-clip-text animate-pulse">
          Loading Page...
        </span>
      </div>
    ),
  }
);

const getData = async (id: string) => {
  const provinceDetail = await GETProvinceById({
    id: id,
  });

  return provinceDetail;
};

const EditProvince = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const data = await getData(params.id);
  return <ProvinceEditPagePartial provinceData={data.data} />;
};

export default EditProvince;
