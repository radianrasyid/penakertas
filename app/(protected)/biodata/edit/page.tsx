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
import { PromiseAllResponseType } from "@/types/general";
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
  const provinceData = GETProvinceList({});
  const workGroupData = GETListWorkGroup();
  const workUnitData = GETListWorkUnit();
  const workPartData = GETListWorkPart();
  const religionData = GETListReligion();
  const genderData = GETListGender();
  const educationLevelData = GETListEducationLevel();
  const maritalStatusData = GETListMaritalStatus();
  const userData = GETEmployeeDetail(authData?.user?.email as string);
  const test = (await Promise.allSettled([
    provinceData,
    workGroupData,
    workUnitData,
    workPartData,
    religionData,
    genderData,
    educationLevelData,
    maritalStatusData,
    userData,
  ])) as PromiseAllResponseType[];
  return {
    province: test[0].value.data,
    workGroup: test[1].value.data,
    workUnit: test[2].value.data,
    workPart: test[3].value.data,
    religion: test[4].value.data,
    gender: test[5].value.data,
    educationLevel: test[6].value.data,
    maritalStatus: test[7].value.data,
    userData: test[8].value,
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
