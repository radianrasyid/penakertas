import LoadingScreen from "@/components/ui/loading-screen";
import { GetSessionData } from "@/lib/actions";
import { GETProvinceList } from "@/services/geolocation/api";
import { GETEmployeeDetail } from "@/services/user/api";
import {
  GETListChildStatus,
  GETListEducationLevel,
  GETListGender,
  GETListLeaveType,
  GETListMaritalStatus,
  GETListParentStatus,
  GETListReligion,
  GETListWorkGroup,
  GETListWorkPart,
  GETListWorkUnit,
} from "@/services/userInfo/api";
import { PromiseAllResponseType } from "@/types/general";
import dynamic from "next/dynamic";

const EditEmployeeFormPartial = dynamic(
  () => import("@/components/pageComponent/Employee/EditEmployeeForm"),
  {
    loading: () => <LoadingScreen />,
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
  const childStatusList = GETListChildStatus();
  const parentStatusList = GETListParentStatus();
  const leaveTypeList = GETListLeaveType();
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
    childStatusList,
    parentStatusList,
    leaveTypeList,
  ])) as PromiseAllResponseType[];
  console.log("ini test", test[9].value);
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
    childStatusList: test[9].value.data,
    parentStatusList: test[10].value.data,
    leaveTypeList: test[11].value.data,
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
      childStatusList={data.childStatusList}
      parentStatusList={data.parentStatusList}
      leaveTypeList={data.leaveTypeList}
    />
  );
};

export default EditEmployee;
