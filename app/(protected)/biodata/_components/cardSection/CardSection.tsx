"use client";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { WhoAmIResponseType } from "@/types/general";
import dayjs from "dayjs";
import { ChevronRight } from "lucide-react";
import { GoDotFill } from "react-icons/go";

const CardSection = ({ userData }: { userData: WhoAmIResponseType }) => {
  return (
    <div>
      <div className="grid grid-cols-3 grid-flow-row gap-x-2 mb-2">
        <Container>
          <h2
            className="text-sm font-semibold mb-3"
            onClick={() => console.log(userData)}
          >
            Data Pasangan
          </h2>
          <div className="text-xs pl-2">
            <ul className=" overflow-y-scroll">
              {userData.relationships.map((i, index) => (
                <li>
                  <span className="flex items-center">
                    {index + 1}. {i.fullname}{" "}
                    <ChevronRight className="scale-50" />{" "}
                    <span className="font-semibold">{i.status}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <Container>
          <h2 className="text-sm font-semibold mb-3">Data Orang Tua</h2>
          <div className="text-xs pl-2">
            <ul className=" overflow-y-scroll">
              {userData.parents.map((i, index) => (
                <li className="">
                  <div className="flex flex-col items-start">
                    {index > 0 ? (
                      <Separator
                        orientation="vertical"
                        className="min-h-5 ml-[0.35rem]"
                      />
                    ) : (
                      <div>
                        <span></span>
                      </div>
                    )}
                    <div className="flex gap-x-2 items-center">
                      <GoDotFill />
                      <span>{i.fullname}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <Container>
          <h2 className="text-sm font-semibold mb-3">Data Anak</h2>
          <div className="text-xs pl-2">
            <ul className=" overflow-y-scroll list-decimal">
              {userData.childs.map((i, index) => (
                <li>
                  {index + 1}. {i.name}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
      <div className="grid grid-cols-2 grid-flow-row gap-x-2">
        <Container>
          <h2 className="text-sm font-semibold mb-3">Data Pendidikan</h2>
          <div className="text-xs pl-2">
            {userData.educations.map((i, index) => (
              <div
                className={`${
                  index !== userData.educations.length - 1 ? "mb-2" : ""
                } grid grid-cols-12`}
              >
                <div className="col-span-1 mt-[0.2rem] relative">
                  <GoDotFill />
                  {index !== userData.educations.length - 1 ? (
                    <Separator
                      orientation="vertical"
                      className="absolute top-[0.77rem] left-[0.33rem]"
                    />
                  ) : null}
                </div>
                <div className="col-span-10">
                  <span>
                    {i.educationPlace} -{" "}
                    <span className="font-semibold">{i.educationLevel}</span>
                  </span>
                  <div>
                    <span className="text-[10px]">
                      {dayjs(new Date(i.graduationYear)).format("YYYY")} -{" "}
                      {i.major}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
        <Container>
          <h2 className="text-sm font-semibold mb-3">Data Cuti</h2>
          <div className="text-xs">
            {userData.leaves.map((i, index) => (
              <div
                className={`${
                  index !== userData.leaves.length - 1 ? "mb-2" : ""
                } grid grid-cols-12`}
              >
                <div className="col-span-1 mt-[0.2rem] relative">
                  <GoDotFill />
                  {index !== userData.leaves.length - 1 ? (
                    <Separator
                      orientation="vertical"
                      className="absolute top-[0.77rem] left-[0.33rem]"
                    />
                  ) : null}
                </div>
                <div className="col-span-10">
                  <span>
                    {i.leaveType} -{" "}
                    <span className="font-semibold">{i.skNumber}</span>
                  </span>
                  <div>
                    <span className="text-[10px]">
                      {dayjs(new Date(i.startDate)).format("DD MMMM YYYY")} -{" "}
                      {dayjs(new Date(i.endDate)).format("DD MMMM YYYY")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px]">
                      <span className="font-semibold">Nomor SK</span>:{" "}
                      {i.skNumber}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CardSection;
