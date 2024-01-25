import { JwtDecodedType, MenuItem } from "@/types/general";
import { RouteData } from "@/types/sidebar";
import crypto from "crypto";
import { jwtDecode } from "jwt-decode";
import { GetSessionData } from "./actions";

export const nameInitials = (name: string) => {
  let res = name?.split(" ");

  let initial = res?.map((i) => {
    return i?.charAt(0)?.toUpperCase();
  });

  return initial?.join("");
};

export const createChecksum = (data: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(data);

  return hash.digest("hex");
};

export const getMsOfficeExtension = (mimetype: string): string | undefined => {
  const mimeToExtension: Record<string, string> = {
    // Microsoft Office
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "pptx",
    "application/vnd.ms-outlook": "msg",
    "application/vnd.visio": "vsd",
    "application/vnd.openxmlformats-officedocument.visio.drawing": "vsdx",
    "application/vnd.ms-access": "mdb",
    "application/vnd.openxmlformats-officedocument.accessprg+xml": "accdb",
    "application/vnd.ms-excel.sheet.macroEnabled.12": "xlsm",
    "application/vnd.ms-excel.template.macroEnabled.12": "xltm",
    "application/vnd.ms-excel.addin.macroEnabled.12": "xlam",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12": "xlsb",

    // Images
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/tiff": "tiff",
    "image/bmp": "bmp",

    // PDF
    "application/pdf": "pdf",

    // Text files
    "text/plain": "txt",

    // Compressed files
    "application/zip": "zip",
    "application/x-rar-compressed": "rar",

    // Audio
    "audio/mpeg": "mp3",
    "audio/wav": "wav",

    // Video
    "video/mp4": "mp4",
    "video/mpeg": "mpeg",

    // JavaScript
    "application/javascript": "js",

    // JSON
    "application/json": "json",

    // XML
    "application/xml": "xml",

    // Add more mappings as needed
  };

  return mimeToExtension[mimetype];
};

export async function reprocessSidebar({
  sidebarData,
}: {
  sidebarData: RouteData[];
}) {
  const authData = await GetSessionData();
  const decodedJwt = jwtDecode(authData?.user?.jwt as string) as JwtDecodedType;
  console.log("ini decoded jwt di function baru", decodedJwt);
  const currentAccessData = decodedJwt.access.data.access.menu;

  return filterSidebarData(currentAccessData, sidebarData);
}

export function filterSidebarData(
  accessData: MenuItem[],
  sidebarData: RouteData[]
) {
  return sidebarData
    .map((menuItem) => {
      const filteredItem = { ...menuItem };

      // Check if there is corresponding access data
      const accessInfo = accessData.find(
        (accessItem) =>
          accessItem.name.toLowerCase() === menuItem.name.toLowerCase()
      );

      // If access data exists, check read permission
      if (accessInfo) {
        filteredItem.isHidden = !accessInfo.access.read;
      } else {
        filteredItem.isHidden = true;
      }

      // Recursively filter children
      if (filteredItem.children && filteredItem.children.length > 0) {
        console.log("ini masuk ke child", accessInfo?.children);
        filteredItem.children = filterSidebarData(
          accessInfo?.children as MenuItem[],
          menuItem.children
        );
      }

      return filteredItem;
    })
    .filter((item) => !item.isHidden);
}
