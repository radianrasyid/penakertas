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
  access?: AccessData;
}

export type Access = {
  read: boolean;
  add: boolean;
  update: boolean;
  delete: boolean;
  detail: boolean;
};

export type MenuItem = {
  access: Access;
  name: string;
  _id: string;
  children: MenuItem[];
};

export type AccessData = {
  access: {
    menu: MenuItem[];
  };
  title: string;
};

export type AccessDataResponseType = {
  _id: string;
  data: AccessData;
};

export type JwtDecodedType = {
  username: string;
  fullname: string;
  id: string;
  email: string;
  image: null | string;
  role: string;
  access: {
    data: AccessData;
  };
  iat: number;
};
export interface UserDetailResponseType {
  status: string;
  message: string;
  data: User;
}

interface User {
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
  leaves: any[]; // Adjust type if necessary
  childs: any[]; // Adjust type if necessary
  relationships: any[]; // Adjust type if necessary
  identity?: {
    mimetype: string;
    link: string;
  }; // Adjust type if necessary
  photograph?: {
    mimetype: string;
    link: string;
  };
  familyCertificate?: {
    mimetype: string;
    link: string;
  }; // Adjust type if necessary
  bpjsOfEmploymentFile?: {
    mimetype: string;
    link: string;
  }; // Adjust type if necessary
  bpjsOfHealthFile?: {
    mimetype: string;
    link: string;
  }; // Adjust type if necessary
  npwp?: {
    mimetype: string;
    link: string;
  };
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
  cityDistrict: string; // Adjust type if necessary
  subdistrict: string; // Adjust type if necessary
  ward: string; // Adjust type if necessary
  birthPlace: string;
  dateOfBirth: string;
  phoneNumber: string;
  telephone: string;
  decisionLetter?: {
    mimetype: string;
    link: string;
  }; // Adjust type if necessary
  bpjsOfEmployment: string;
  bpjsOfHealth: string;
}

export type PromiseAllResponseType = {
  status: "rejected" | "fulfilled";
  value: any;
};

export type FileResponseType = {
  mimetype: string;
  link: string;
};
