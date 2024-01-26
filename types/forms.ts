import { FileResponseType } from "./general";

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

export interface EditEmployeeType {
  employmentId?: string;
  backTitle?: string;
  birthPlace?: string;
  bpjsOfEmployment?: string;
  bpjsOfHealth?: string;
  childs?: string;
  cityDistrict?: OptionsType;
  createdAt?: string;
  dateOfBirth?: string;
  decisionLetterNumber?: string;
  email?: string;
  familyCertificateNumber?: string;
  firstName?: string;
  frontTitle?: string;
  gender?: OptionsType;
  homeAddress?: string;
  identityNumber?: string;
  jobDescription?: string;
  lastName?: string;
  latestEducationLevel?: OptionsType;
  leaves?: string;
  maritalStatus?: OptionsType;
  neighborhood?: string;
  neighborhoodHead?: string;
  npwpNumber?: string;
  phoneNumber?: string;
  placementLocation?: string;
  Province?: OptionsType;
  relationships?: string;
  religion?: OptionsType;
  startingYear?: string;
  subdistrict?: OptionsType;
  telephone?: string;
  ward?: OptionsType;
  workGroup?: OptionsType;
  workPart?: OptionsType;
  workUnit?: OptionsType;
  bpjsOfEmploymentFile?: FileResponseType;
  bpjsOfHealthFile?: FileResponseType;
  npwp?: FileResponseType;
  identity?: FileResponseType;
  decisionLetter?: FileResponseType;
  photograph?: FileResponseType;
  familyCertificate?: FileResponseType;
}
