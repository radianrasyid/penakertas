"use client";
import DocViewer, {
  DocViewerRenderers,
  IDocument,
} from "@cyntler/react-doc-viewer";

const FileViewerBioPage = ({ docs }: { docs: IDocument[] }) => {
  return (
    <div>
      <DocViewer
        prefetchMethod="GET"
        requestHeaders={{
          "ngrok-skip-browser-warning": "9901",
        }}
        documents={docs}
        pluginRenderers={DocViewerRenderers}
      />
    </div>
  );
};

export default FileViewerBioPage;
