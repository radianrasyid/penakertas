import { Button } from "@/components/ui/button";
import { GetSessionData } from "@/lib/actions";
import { GETEmployeeStatistic } from "@/services/statistic/api";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";
import { RiGovernmentFill } from "react-icons/ri";

const getStatisticData = async () => {
  const res = await GETEmployeeStatistic();
  return res;
};

const Page = async () => {
  const data = await GetSessionData();
  const statistic = await getStatisticData();

  console.log("ini statistic", statistic);
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span>Beranda</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* TOTAL PEGAWAI */}
        <div className="flex-1 rounded-lg bg-blue-600 px-4 py-4">
          <div className="flex gap-2 items-center text-white text-sm font-semibold">
            <Button size={"icon"}>
              <FaPeopleGroup />
            </Button>
            <span>Total Pegawai</span>
          </div>
          <div className="mt-3 text-lg font-bold text-white">
            <span>{statistic.data.totalEmployee}</span>
          </div>
        </div>

        {/* ASN */}
        <div className="flex-1 rounded-lg bg-blue-600 px-4 py-4">
          <div className="flex gap-2 items-center text-white text-sm font-semibold">
            <Button size={"icon"}>
              <RiGovernmentFill />
            </Button>
            <span>ASN</span>
          </div>

          <div className="mt-3 text-lg font-bold text-white">
            <span>{statistic.data.asn}</span>
          </div>
        </div>

        {/* PTT */}
        <div className="flex-1 rounded-lg bg-blue-600 px-4 py-4">
          <div className="flex gap-2 items-center text-white text-sm font-semibold">
            <Button size={"icon"}>
              <GoPersonFill />
            </Button>
            <span>PTT</span>
          </div>
          <div className="mt-3 text-lg font-bold text-white">
            <span>{statistic.data.ptt}</span>
          </div>
        </div>

        {/* THL */}
        <div className="flex-1 rounded-lg bg-blue-600 px-4 py-4">
          <div className="flex gap-2 items-center text-white text-sm font-semibold">
            <Button size={"icon"}>
              <GoPersonFill />
            </Button>
            <span>THL</span>
          </div>
          <div className="mt-3 text-lg font-bold text-white">
            <span>{statistic.data.thl}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
