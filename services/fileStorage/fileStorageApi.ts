import { useFetch } from "../apiInstance";

export const GETFileById = async (id: string) => {
  const res = await useFetch({
    url: `/api/file/${id}`,
    method: "GET",
    cache: "no-cache",
  });

  return res;
};

export const POSTUploadPerFile = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const res = await useFetch({
    url: `/api/upload/user/document/${id}`,
    method: "POST",
    body: data,
    cache: "no-cache",
  });

  return res;
};