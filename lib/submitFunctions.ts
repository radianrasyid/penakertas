// @ts-nocheck
import { AddEmployeeType } from "@/types/forms";
import { Data } from "@/types/general";

export const createPegawaiSubmition = (data: AddEmployeeType) => {
  let preprocessData: any = {
    province: data.province?.name,
    district: data.district?.name,
    subdistrict: data.subdistrict?.name,
    ward: data.ward?.name,
    workUnit: data.workUnit?.name,
    workGroup: data.workGroup?.name,
    workPart: data.workPart?.name,
    religion: data.religion?.name,
    gender: data.gender?.name,
    latestEducation: data.latestEducation?.name,
    maritalStatus: data.maritalStatus?.name,
  };

  let tobeDeployedData: Data = {
    ...data,
  };

  Object.keys(preprocessData).map((i) => {
    tobeDeployedData[i] = preprocessData[i];
  });

  return tobeDeployedData;
};
