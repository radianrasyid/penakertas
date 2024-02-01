import LoadingScreen from "@/components/ui/loading-screen";
import { GETProvinceList } from "@/services/geolocation/api";
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

const AddEmployeeFormPartial = dynamic(
  () => import("@/components/pageComponent/Employee/AddEmployeeForm"),
  {
    loading: () => <LoadingScreen />,
  }
);

const getData = async () => {
  const provinceData = await GETProvinceList({});
  const workGroupData = await GETListWorkGroup();
  const workUnitData = await GETListWorkUnit();
  const workPartData = await GETListWorkPart();
  const religionData = await GETListReligion();
  const genderData = await GETListGender();
  const educationLevelData = await GETListEducationLevel();
  const maritalStatusData = await GETListMaritalStatus();
  return {
    province: provinceData.data,
    workGroup: workGroupData.data,
    workUnit: workUnitData.data,
    workPart: workPartData.data,
    religion: religionData.data,
    gender: genderData.data,
    educationLevel: educationLevelData.data,
    maritalStatus: maritalStatusData.data,
  };
};

const AddEmployee = async () => {
  const data = await getData();
  return (
    <AddEmployeeFormPartial
      provinceList={data.province}
      educationLevelList={data.educationLevel}
      genderList={data.gender}
      maritalStatusList={data.maritalStatus}
      religionList={data.religion}
      workGroupList={data.workGroup}
      workPartList={data.workPart}
      workUnitList={data.workUnit}
    />
  );
};

export default AddEmployee;
