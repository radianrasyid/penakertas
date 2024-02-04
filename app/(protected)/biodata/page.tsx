import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/ui/loading-screen";
import { Separator } from "@/components/ui/separator";
import { getMsOfficeExtension } from "@/lib/functions";
import { GETWhoAmI } from "@/services/user/api";
import { Data, WhoAmIResponseType } from "@/types/general";
import { IDocument } from "@cyntler/react-doc-viewer";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { BsFillPhoneVibrateFill } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";

import { HiLocationMarker } from "react-icons/hi";
import { MdAddPhotoAlternate, MdEmail } from "react-icons/md";

const getData = async () => {
  const fetching = await GETWhoAmI();
  return fetching.data as WhoAmIResponseType;
};

const FileViewerPartial = dynamic(
  () =>
    import("@/components/pageComponent/Biodata/FileViewer/FileViewerBioPage"),
  {
    loading: () => <LoadingScreen />,
    ssr: true,
  }
);

const BiodataPage = async () => {
  const data: Data = await getData();
  console.log("ini data user", data);
  const processFile = Object.keys(data)
    .map((i) => {
      if (!!data[i]?.mimetype) {
        return {
          data: {
            ...data[i],
            filename: i,
          },
        };
      }
    })
    .filter((e) => !!e?.data)
    .map((b) => {
      return {
        uri: b?.data.link,
        fileType: getMsOfficeExtension(b?.data.mimetype),
        fileData: b?.data.link,
        fileName: b?.data.filename,
      };
    }) as IDocument[];
  return (
    <>
      <span className="mb-3 text-xl font-semibold">User Detail</span>
      <div className="bg-white rounded-lg p-4 mb-2">
        <div className="grid grid-cols-12 gap-x-3 md:grid-cols-1 sm:grid-cols-1">
          <div className="col-span-2 md:col-span-full md:flex-1">
            <div className="relative min-h-52 md:flex md:justify-center md:max-w-full md:max-h-52">
              {!!data.photograph ? (
                <>
                  <Image
                    src={data.photograph.link}
                    fill
                    alt="photograph"
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute hover:cursor-pointer opacity-0 hover:opacity-100 h-full w-full hover:bg-gray-700/30 hover:backdrop-blur-lg hover:backdrop-filter rounded-lg transition-all ease-in-out flex items-center justify-center flex-col">
                    <MdAddPhotoAlternate className="size-24 text-slate-50" />
                    <span className="text-xs font-semibold text-slate-50">
                      Add or change photo
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-slate-400 rounded-lg">
                  <div className="absolute hover:cursor-pointer h-full w-full bg-gray-700/30 backdrop-blur-lg backdrop-filter rounded-lg transition-all ease-in-out flex items-center justify-center flex-col">
                    <MdAddPhotoAlternate className="size-24 text-slate-50" />
                    <span className="text-xs font-semibold text-slate-50">
                      Add or change photo
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-10 md:justify-center md:flex md:flex-col md:items-center">
            <div className="flex gap-x-3 items-center justify-between">
              <div className="flex gap-x-3 items-center md:justify-center">
                <span className="text-md font-semibold">{`${data.frontTitle} ${data.firstName} ${data.lastName}, ${data.backTitle}`}</span>
                {!!data?.placementLocation ? (
                  <div className="flex gap-x-[0.2rem] items-center text-sm text-slate-500">
                    <HiLocationMarker />
                    <span>{data?.placementLocation}</span>
                  </div>
                ) : null}
              </div>
              <Link href={"/biodata/edit"}>
                <Button size={"sm"} variant={"outline"}>
                  Edit data
                </Button>
              </Link>
            </div>
            <div className="bg-slate-300 p-2 rounded-lg max-w-fit items-center flex md:flex-col mb-1">
              <span className="text-xs text-primary md:hidden">
                <span className="font-bold">{data.workGroup} </span>
                {`- ${data.workUnit} - ${data.workPart}`}
              </span>
              <span className="xl:hidden lg:hidden 2xl:hidden text-xs text-primary">
                {data.workGroup}
              </span>
              <span className="xl:hidden lg:hidden 2xl:hidden text-xs text-primary">
                {data.workUnit}
              </span>
              <span className="xl:hidden lg:hidden 2xl:hidden text-xs text-primary">
                {data.workPart}
              </span>
            </div>
            <div className="mb-4 flex gap-x-3 items-center flex-wrap md:justify-center">
              <div className="flex flex-wrap text-[11px] items-center gap-x-1">
                <MdEmail className="text-primary" />
                <span className="font-semibold">{data.email}</span>
              </div>
              <Separator
                orientation="vertical"
                decorative
                className="text-black w-[2px] min-h-[1rem] bg-slate-400 md:hidden"
              />
              <div className="flex flex-wrap text-[11px] items-center gap-x-1">
                <BsFillPhoneVibrateFill className="text-primary" />
                <span className="font-semibold">{data.phoneNumber}</span>
              </div>
              <Separator
                orientation="vertical"
                decorative
                className="text-black w-[2px] min-h-[1rem] bg-slate-400 md:hidden"
              />
              <div className="flex flex-wrap text-[11px] items-center gap-x-1">
                <FaPhone className="text-primary" />
                <span className="font-semibold">{data.telephone}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 text-xs">
              <div className="">
                <div className="flex flex-wrap">
                  <span className="flex-1">Agama :</span>
                  <span className="flex-1">{data.religion}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Jenis Kelamin :</span>
                  <span className="flex-1">
                    {data.gender === "MALE" ? "Laki-laki" : "Perempuan"}
                  </span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">TTL :</span>
                  <span className="flex-1">{`${data.birthPlace}, ${dayjs(
                    new Date(data.dateOfBirth as string)
                  ).format("DD MMMM YYYY")}`}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Pendidikan Terakhir :</span>
                  <span className="flex-1">{data.latestEducationLevel}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Status Perkawinan :</span>
                  <span className="flex-1">{data.maritalStatus}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Nomor KK :</span>
                  <span className="flex-1">{data.familyCertificateNumber}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">NIK :</span>
                  <span className="flex-1">{data.identityNumber}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">NPWP :</span>
                  <span className="flex-1">{data.npwpNumber}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">BPJS Tenaga Kerja :</span>
                  <span className="flex-1">{data.bpjsOfEmployment}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">BPJS Kesehatan :</span>
                  <span className="flex-1">{data.bpjsOfHealth}</span>
                </div>
              </div>
              <div className="">
                <div className="flex flex-wrap">
                  <span className="flex-1">Alamat Rumah :</span>
                  <span className="flex-1">{data.homeAddress}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">RT/RW :</span>
                  <span className="flex-1">{`${data.neighborhood}/${data.neighborhoodHead}`}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Kelurahan :</span>
                  <span className="flex-1">{data.ward}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Kecamatan :</span>
                  <span className="flex-1">{data.subdistrict}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Kota/Kabupaten :</span>
                  <span className="flex-1">{data.cityDistrict}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Provinsi :</span>
                  <span className="flex-1">{data.Province}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE SECTION */}
      {/* <div className=""></div> */}

      {/* FILE VIEWER SECTION */}
      <div className="bg-white rounded-lg p-4">
        <FileViewerPartial docs={processFile} />
      </div>
    </>
  );
};

export default BiodataPage;
