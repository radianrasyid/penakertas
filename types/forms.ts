export interface OptionsType {
  id: string;
  name: string;
  value: string | any;
}

export interface AddEmployeeType {
  address: string | null;
  backTitle: string | null;
  birthPlace: string | null;
  bpjsOfEmployment: string | null;
  bpjsOfHealth: string | null;
  dateOfBirth: Date | null;
  decisionLetterNumber: string | null;
  district: OptionsType | null;
  email: string | null;
  familyCertificateNumber: string | null;
  firstname: string | null;
  frontTitle: string | null;
  gender: OptionsType | null;
  identityNumber: string | null;
  lastname: string | null;
  latestEducation: OptionsType | null;
  maritalStatus: OptionsType | null;
  neighborhood: string | null;
  neighborhoodHead: string | null;
  nrpt: string | null;
  phoneNumber: string | null;
  placement: string | null;
  province: OptionsType | null;
  religion: OptionsType | null;
  startYear: string | null;
  subdistrict: OptionsType | null;
  telephone: string | null;
  ward: OptionsType | null;
  workDescription: string | null;
  workGroup: OptionsType | null;
  workPart: OptionsType | null;
  npwpNumber: string | null;
  workUnit: OptionsType | null;
  photographFile: File | null;
  familyCertificateFile: File | null;
  bpjsOfEmploymentFile: File | null;
  decisionLetterFile: File | null;
  identityFile: File | null;
  npwpFile: File | null;
  bpjsOfHealthFile: File | null;
}
