import { GetSessionData } from "@/lib/actions";
import { GETProvinceList } from "@/services/geolocation/api";
import { GETEmployeeDetail } from "@/services/user/api";
import {
  GETListEducationLevel,
  GETListGender,
  GETListMaritalStatus,
  GETListReligion,
  GETListWorkGroup,
  GETListWorkPart,
  GETListWorkUnit,
} from "@/services/userInfo/api";
import dynamic from "next/dynamic";
import { VscLoading } from "react-icons/vsc";

const EditEmployeeFormPartial = dynamic(
  () => import("@/components/pageComponent/Employee/EditEmployeeForm"),
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
  const authData = await GetSessionData();
  console.log("ini auth data", authData);
  const provinceData = await GETProvinceList({});
  const workGroupData = await GETListWorkGroup();
  const workUnitData = await GETListWorkUnit();
  const workPartData = await GETListWorkPart();
  const religionData = await GETListReligion();
  const genderData = await GETListGender();
  const educationLevelData = await GETListEducationLevel();
  const maritalStatusData = await GETListMaritalStatus();
  const userData = await GETEmployeeDetail(authData?.user?.email as string);
  return {
    province: provinceData.data,
    workGroup: workGroupData.data,
    workUnit: workUnitData.data,
    workPart: workPartData.data,
    religion: religionData.data,
    gender: genderData.data,
    educationLevel: educationLevelData.data,
    maritalStatus: maritalStatusData.data,
    userData,
  };
};

const EditEmployee = async () => {
  const data = await getData();
  return (
    <EditEmployeeFormPartial
      provinceList={data.province}
      educationLevelList={data.educationLevel}
      genderList={data.gender}
      maritalStatusList={data.maritalStatus}
      religionList={data.religion}
      workGroupList={data.workGroup}
      workPartList={data.workPart}
      workUnitList={data.workUnit}
      userData={data.userData}
    />
  );
};

export default EditEmployee;
