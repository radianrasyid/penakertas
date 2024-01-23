"use client";
import { MyHeader } from "@/components/ui/fileviewer";
import DocViewer, {
  DocViewerRenderers,
  IDocument,
} from "@cyntler/react-doc-viewer";
import { useState } from "react";

const FileViewerBioPage = ({ docs }: { docs: IDocument[] }) => {
  const [activeDocument, setActiveDocument] = useState<IDocument>(docs[0]);
  const handleDocumentChange = (document: IDocument) => {
    setActiveDocument(document);
  };
  return (
    <div>
      <DocViewer
        prefetchMethod="GET"
        requestHeaders={{
          "ngrok-skip-browser-warning": "9901",
        }}
        documents={docs}
        onDocumentChange={handleDocumentChange}
        activeDocument={activeDocument}
        pluginRenderers={DocViewerRenderers}
        config={{
          noRenderer: {
            overrideComponent: () => <div>NO RENDERS</div>,
          },
          header: {
            overrideComponent: MyHeader,
          },
        }}
      />
    </div>
  );
};

export default FileViewerBioPage;
