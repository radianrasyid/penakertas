import dynamic from "next/dynamic";
import { VscLoading } from "react-icons/vsc";

const SubdistrictCreatePartial = dynamic(
  () =>
    import(
      "@/components/pageComponent/DataMaster/subdistrict/CreateSubdistrict"
    ),
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
  return <SubdistrictCreatePartial />;
};

export default Page;
