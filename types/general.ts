export interface Data {
  [key: string]: any;
}

export interface UserData {
  id: string;
  email: string;
  username: string;
  employmentId: string;
  password: string;
  firstName: string;
  lastName: string;
  frontTitle: string;
  backTitle: string;
  workGroup: string;
  workUnit: string;
  workPart: string;
  gender: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  identity: string;
  photograph: string;
  familyCertificate: string;
  bpjsOfEmploymentFile: string;
  bpjsOfHealthFile: string;
  npwp: string;
  bpjsOfEmployment: string;
  bpjsOfHealth: string;
  decisionLetter: string;
  latestEducationLevel: string;
  maritalStatus: string;
  religion: string;
  identityNumber: string;
  npwpNumber: string;
  familyCertificateNumber: string;
  jobDescription: string;
  placementLocation: string;
  startingYear: string;
  decisionLetterNumber: string;
  homeAddress: string;
  neighborhood: string;
  neighborhoodHead: string;
  Province: string;
  cityDistrict: string;
  subdistrict: string;
  ward: string;
  birthPlace: string;
  dateOfBirth: string;
  phoneNumber: string;
  telephone: string;
}

export interface UserListPaginatedResponseType {
  status: string;
  message: string;
  data: UserData[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalData: number;
}

export interface WhoAmIResponseType {
  id: string;
  email: string;
  username: string;
  employmentId: string;
  firstName: string;
  lastName: string;
  frontTitle: string;
  backTitle: string;
  workGroup: string;
  workUnit: string;
  workPart: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  identity?: string;
  photograph?: string;
  familyCertificate?: string;
  bpjsOfEmploymentFile?: string;
  bpjsOfHealthFile?: string;
  npwp?: string;
  latestEducationLevel?: string;
  maritalStatus?: string;
  religion?: string;
  identityNumber: string;
  npwpNumber: string;
  familyCertificateNumber?: string;
  jobDescription?: string;
  placementLocation?: string;
  startingYear?: string;
  decisitonLetterNumber?: string;
  homeAddress?: string;
  neighborhood?: string;
  neighborhoodHead?: string;
  Province?: string;
  cityDistrict?: string;
  subdistrict?: string;
  ward?: string;
  birthPlace?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  telephone?: string;
  decisionLetter?: string;
  bpjsOfEmployment?: string;
  bpjsOfHealth?: string;
}
