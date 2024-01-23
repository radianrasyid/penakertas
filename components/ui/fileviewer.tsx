import { IHeaderOverride } from "@cyntler/react-doc-viewer";
import { BsChevronLeft, BsChevronRight, BsDownload } from "react-icons/bs";
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
        <Button size={"icon"} variant={"secondary"} className="rounded-full">
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
