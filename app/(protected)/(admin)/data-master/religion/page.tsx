import dynamic from "next/dynamic";
import { VscLoading } from "react-icons/vsc";

const ReligionListPartial = dynamic(
  () => import("@/components/pageComponent/DataMaster/religion/ReligionList"),
  {
    loading: () => (
      <div className="w-full h-24 rounded-lg bg-slate-300 animate-pulse flex gap-2 flex-wrap items-center justify-center">
        <VscLoading className={"animate-spin"} />
        <span className="text-sm font-semibold text-slate-900 bg-clip-text animate-pulse">
          Loading Page...
        </span>
      </div>
    ),
  }
);

const Page = () => {
  return <ReligionListPartial />;
};

export default Page;
