import { GETProvinceList } from "@/services/geolocation/api";
import dynamic from "next/dynamic";
import { VscLoading } from "react-icons/vsc";

const AddEmployeeFormPartial = dynamic(
  () => import("@/components/pageComponent/Employee/AddEmployeeForm"),
  {
    loading: () => (
      <div className="w-full h-24 rounded-lg bg-slate-300 animate-pulse flex gap-2 flex-wrap items-center justify-center">
        <VscLoading className={"animate-spin"} />
        <span className="text-sm font-semibold text-slate-900 bg-clip-text animate-pulse">
          Loading Form
        </span>
      </div>
    ),
  }
);

const getData = async () => {
  const ProvinceData = await GETProvinceList({});
  console.log(ProvinceData);
  return ProvinceData.data;
};

const AddEmployee = async () => {
  const data = await getData();
  return <AddEmployeeFormPartial provinceList={data} />;
};

export default AddEmployee;
