import FileViewerBioPage from "@/components/pageComponent/Biodata/FileViewer/FileViewerBioPage";
import { Separator } from "@/components/ui/separator";
import { GETWhoAmI } from "@/services/user/api";
import { Data, WhoAmIResponseType } from "@/types/general";
import { IDocument } from "@cyntler/react-doc-viewer";
import dayjs from "dayjs";
import Image from "next/image";
import { BsFillPhoneVibrateFill } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";

import { HiLocationMarker } from "react-icons/hi";
import { MdAddPhotoAlternate, MdEmail } from "react-icons/md";

const getData = async () => {
  const fetching = await GETWhoAmI();
  console.log("ini hasil whoami", fetching.data);
  return fetching.data as WhoAmIResponseType;
};

const BiodataPage = async () => {
  const data: Data = await getData();
  const processFile = Object.keys(data)
    .map((i) => {
      if (!!data[i].mimetype) {
        return {
          data: data[i],
        };
      }
    })
    .filter((e) => !!e?.data)
    .map((b) =>
      b?.data.mimetype.includes("officedocument")
        ? {
            uri: `${b.data.link}`,
            fileType:
              b.data.mimetype.includes("openxml") &&
              b.data.mimetype.includes("sheet")
                ? "xlsx"
                : "docx",
          }
        : {
            uri: b?.data.link,
            // fileType: b?.data.mimetype,
          }
    ) as IDocument[];
  console.log("testing", processFile);
  return (
    <>
      <div className="bg-white rounded-lg p-4">
        <div className="flex flex-wrap gap-x-3">
          <div className="basis-2/12">
            <div className="relative min-h-52">
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
                <div></div>
              )}
            </div>
          </div>
          <div className="grow">
            <div className="flex gap-x-3 items-center">
              <span className="text-md font-semibold">{`${data.frontTitle} ${data.firstName} ${data.lastName}, ${data.backTitle}`}</span>
              {!!data?.placementLocation ? (
                <div className="flex gap-x-[0.2rem] items-center text-sm text-slate-500">
                  <HiLocationMarker />
                  <span>{data?.placementLocation}</span>
                </div>
              ) : null}
            </div>
            <div className="bg-slate-300 p-2 rounded-lg max-w-fit items-center flex">
              <span className="text-xs text-primary">
                <span className="font-bold">{data.workGroup} </span>
                {`- ${data.workUnit} - ${data.workPart}`}
              </span>
            </div>
            <div className="mb-4 flex gap-x-3 items-center">
              <div className="flex flex-wrap text-[11px] items-center gap-x-1">
                <MdEmail className="text-primary" />
                <span className="font-semibold">{data.email}</span>
              </div>
              <Separator
                orientation="vertical"
                decorative
                className="text-black w-[2px] min-h-[1rem] bg-slate-400"
              />
              <div className="flex flex-wrap text-[11px] items-center gap-x-1">
                <BsFillPhoneVibrateFill className="text-primary" />
                <span className="font-semibold">{data.phoneNumber}</span>
              </div>
              <Separator
                orientation="vertical"
                decorative
                className="text-black w-[2px] min-h-[1rem] bg-slate-400"
              />
              <div className="flex flex-wrap text-[11px] items-center gap-x-1">
                <FaPhone className="text-primary" />
                <span className="font-semibold">{data.telephone}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 text-xs">
              <div className="flex flex-col gap-y-1">
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
              <div className="flex flex-col gap-y-1">
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
      <div className="bg-white rounded-lg p-4">
        <FileViewerBioPage docs={processFile} />
      </div>
    </>
  );
};

export default BiodataPage;
