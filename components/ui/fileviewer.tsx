import { IHeaderOverride } from "@cyntler/react-doc-viewer";
import { BsChevronLeft, BsChevronRight, BsDownload } from "react-icons/bs";
import { toast } from "sonner";
import { Button } from "./button";

export const MyHeader: IHeaderOverride = (
  state,
  previousDocument,
  nextDocument
) => {
  if (!state.currentDocument || state.config?.header?.disableFileName) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between">
        <span className="text-lg font-semibold uppercase">
          {state.currentDocument.fileName}
        </span>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="rounded-full"
          onClick={async () => {
            const currentId = state.currentDocument?.uri as string;
            const fetching = fetch(currentId, {
              method: "GET",
            });
            const a = document.createElement("a");
            a.href = currentId;
            a.download = currentId;
            a.target = "_blank";
            a.click();
            toast.promise(fetching, {
              loading: "Downloading your file...",
              success: "Your file has been downloaded",
              error: "Something went wrong when downloading your file",
            });
          }}
        >
          <BsDownload />
        </Button>
      </div>
      <div className="flex gap-x-2 flex-row">
        <Button
          size={"icon"}
          variant={"secondary"}
          className="rounded-full"
          onClick={previousDocument}
        >
          <BsChevronLeft />
        </Button>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="rounded-full"
          onClick={nextDocument}
        >
          <BsChevronRight />
        </Button>
      </div>
    </>
  );
};
