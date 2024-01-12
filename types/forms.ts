export interface OptionsType {
  id: string;
  name: string;
  value: string | any;
}

export interface AddEmployeeType {
  nrpt: string;
  firstName: string;
  lastName: string;
  prefixDegree: string;
  suffixDegree: string;
  workGroup: string;
  workUnit: string;
  workPart: string;
  religion: null | OptionsType;
  gender: null | OptionsType;
  latestEducation: null | OptionsType;
  maritalStatus: null | OptionsType;
  workDescription: string;
  placement: string;
  startYear: Date;
  skNumber: string;
  neighborhood: string;
  neighborhoodHead: string;
  province: null | OptionsType;
  district: null | OptionsType;
  homeAddress: string;
  subdistrict: null | OptionsType;
  ward: null | OptionsType;
  birthPlace: string;
  dob: string;
  phoneNumber: string;
  telephoneNumber: string;
  email: string;
  familyCertificateNumber: string;
  identitiyNumber: string;
  npwp: string;
  bpjsEmployee: string;
  bpjsHealth: string;
  photograph: string;
  identityPhoto: string;
  familyCertificatePhoto: string;
  npwpPhoto: string;
  bpjsEmployeePhoto: string;
  bpjsHealthPhoto: string;
  skPhoto: string;
}
