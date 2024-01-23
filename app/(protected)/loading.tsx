import { VscLoading } from "react-icons/vsc";

const LoadingProtected = () => {
  return (
    <div className="w-full min-h-screen rounded-lg bg-slate-300 animate-pulse flex gap-2 flex-wrap items-center justify-center">
      <VscLoading className={"animate-spin"} />
      <span className="text-sm font-semibold text-slate-900 bg-clip-text animate-pulse">
        Loading Page...
      </span>
    </div>
  );
};

export default LoadingProtected;
