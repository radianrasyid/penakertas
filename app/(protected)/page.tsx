import { Button } from "@/components/ui/button";
import { GetSessionData } from "@/lib/actions";
import { GETEmployeeStatistic } from "@/services/statistic/api";
import { POSTCheckUserRole } from "@/services/user/api";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";
import { RiGovernmentFill } from "react-icons/ri";

const getStatisticData = async () => {
  const res = await GETEmployeeStatistic({});
  return res;
};

const getRoleData = async () => {
  const data = await GetSessionData();
  const res = await POSTCheckUserRole({
    email: data?.user?.email as string,
  });

  return res;
};

const Page = async () => {
  const statistic = await getStatisticData();
  const role = await getRoleData();
  const data = await GetSessionData();

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-xl font-semibold">Beranda</span>
      </div>

      {role.data === "ADMIN" || role.data === "SUPER_ADMIN" ? (
        <>
          <div className="w-full rounded-lg px-4 py-4 drop-shadow-xl mb-2 text-slate-200 flex bg-blue-800">
            <span>
              Hello,{" "}
              <span className="font-bold text-white">
                {data?.user?.name} 🚀
              </span>
            </span>
            {/* <div>
              <Image
                src={adminDashboardImage.src}
                width={adminDashboardImage.width}
                height={adminDashboardImage.height}
                alt="Admin Dashboard Welcome Image"
                className="w-72 object-cover"
              />
            </div> */}
          </div>
          <div className="flex flex-wrap gap-2">
            {/* TOTAL PEGAWAI */}
            <div className="flex-1 rounded-lg bg-slate-50 px-4 py-4 drop-shadow-xl">
              <div className="flex gap-2 items-center text-slate-800 text-sm font-semibold">
                <Button size={"icon"}>
                  <FaPeopleGroup />
                </Button>
                <span>Total Pegawai</span>
              </div>
              <div className="mt-3 text-lg font-bold text-slate-900">
                <span>{statistic.data.totalEmployee}</span>
              </div>
            </div>

            {/* ASN */}
            <div className="flex-1 rounded-lg bg-slate-50 px-4 py-4 drop-shadow-xl">
              <div className="flex gap-2 items-center text-slate-800 text-sm font-semibold">
                <Button size={"icon"}>
                  <RiGovernmentFill />
                </Button>
                <span>ASN</span>
              </div>

              <div className="mt-3 text-lg font-bold text-slate-900">
                <span>{statistic.data.asn}</span>
              </div>
            </div>

            {/* PTT */}
            <div className="flex-1 rounded-lg bg-slate-50 px-4 py-4 drop-shadow-xl">
              <div className="flex gap-2 items-center text-slate-800 text-sm font-semibold">
                <Button size={"icon"}>
                  <GoPersonFill />
                </Button>
                <span>PTT</span>
              </div>
              <div className="mt-3 text-lg font-bold text-slate-900">
                <span>{statistic.data.ptt}</span>
              </div>
            </div>

            {/* THL */}
            <div className="flex-1 rounded-lg bg-slate-50 px-4 py-4 drop-shadow-xl">
              <div className="flex gap-2 items-center text-slate-800 text-sm font-semibold">
                <Button size={"icon"}>
                  <GoPersonFill />
                </Button>
                <span>THL</span>
              </div>
              <div className="mt-3 text-lg font-bold text-slate-900">
                <span>{statistic.data.thl}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <span>{data?.user?.name}</span>
        </div>
      )}
    </div>
  );
};

export default Page;
