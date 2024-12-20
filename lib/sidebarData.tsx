import { RouteData } from "@/types/sidebar";
import { HiDatabase, HiDocument } from "react-icons/hi";
import { IoMdHeart } from "react-icons/io";
import {
  MdChildCare,
  MdGroup,
  MdHistory,
  MdHome,
  MdManageAccounts,
  MdPerson2,
  MdReport,
  MdSchool,
  MdStar,
} from "react-icons/md";

export const sidebarData: RouteData[] = [
  {
    route: "/",
    children: [],
    icon: <MdHome />,
    name: "Beranda",
    isHidden: false,
  },
  {
    route: "/data-master",
    children: [
      {
        icon: null,
        children: [],
        name: "Provinsi",
        route: "/data-master/province",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Kabupaten/Kota",
        route: "/data-master/districts",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Kecamatan",
        route: "/data-master/subdistricts",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Kelurahan",
        route: "/data-master/wards",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Agama",
        route: "/data-master/religion",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Golongan",
        route: "/data-master/group",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Bagian",
        route: "/data-master/part",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Jenis Kelamin",
        route: "/data-master/gender",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Jenis Cuti",
        route: "/data-master/leave-type",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Kegiatan Anak",
        route: "/data-master/children-activity",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Kelompok Pekerjaan",
        route: "/data-master/work-group",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Pekerjaan",
        route: "/data-master/profession",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Pendidikan",
        route: "/data-master/education",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Status Anak",
        route: "/data-master/child-status",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Sumber Gaji",
        route: "/data-master/income-source",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Status Orang Tua",
        route: "/data-master/parent-status",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Status Pasangan",
        route: "/data-master/partner-status",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Status Perkawinan",
        route: "/data-master/marital-status",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Tunjangan Anak",
        route: "/data-master/child-support",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Unit Kerja",
        route: "/data-master/work-unit",
        isHidden: false,
      },
    ],
    icon: <HiDatabase />,
    name: "Data Master",
    isHidden: false,
  },
  {
    route: "/employee",
    children: [],
    icon: <MdGroup />,
    name: "Pegawai",
    isHidden: false,
  },
  {
    route: "/biodata",
    children: [],
    icon: <MdPerson2 />,
    name: "Biodata",
    isHidden: false,
  },
  {
    route: "/education-history",
    children: [],
    icon: <MdSchool />,
    name: "Riwayat Pendidikan",
    isHidden: false,
  },
  {
    route: "/marital-history",
    children: [],
    icon: <IoMdHeart />,
    name: "Status Pernikahan",
    isHidden: false,
  },
  {
    route: "/child-data",
    children: [],
    icon: <MdChildCare />,
    name: "Data Anak",
    isHidden: false,
  },
  {
    route: "/parent-data",
    children: [],
    icon: <MdStar />,
    name: "Data Orang Tua",
    isHidden: false,
  },
  {
    route: "/leaves",
    children: [],
    icon: <MdHistory />,
    name: "Cuti",
    isHidden: false,
  },
  {
    route: "/employment-letter",
    children: [],
    icon: <HiDocument />,
    name: "SK Kerja",
    isHidden: false,
  },
  {
    route: "/report",
    children: [
      {
        icon: null,
        children: [],
        name: "Laporan Pegawai",
        route: "/report/employee-report",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Laporan Pegawai ASN",
        route: "/report/employee-report/asn",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Laporan Pegawai CPNS",
        route: "/report/employee-report/cpns",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Laporan Pegawai Honor",
        route: "/report/employee-report/honor",
        isHidden: false,
      },
    ],
    icon: <MdReport />,
    name: "Laporan",
    isHidden: false,
  },
  {
    route: "/account",
    children: [
      {
        icon: null,
        children: [],
        name: "Role",
        route: "/account/role",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Akun",
        route: "/account/accounts",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Akses",
        route: "/account/access",
        isHidden: false,
      },
      {
        icon: null,
        children: [],
        name: "Profil",
        route: "/account/profile",
        isHidden: false,
      },
    ],
    icon: <MdManageAccounts />,
    name: "Akun",
    isHidden: false,
  },
];
