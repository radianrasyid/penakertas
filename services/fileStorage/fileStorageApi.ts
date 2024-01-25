import { useFetch } from "../apiInstance";

export const GETFileById = async (id: string) => {
  const res = await useFetch({
    url: `/api/file/${id}`,
    method: "GET",
    cache: "no-cache",
  });

  return res;
};
