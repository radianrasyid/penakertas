import { useFetch } from "@/services/apiInstance";
import { AccessData } from "@/types/general";

export const GETAllAccessList = async () => {
  const res = await useFetch({
    url: `/api/access`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return res;
};

export const GETAccessById = async ({ id }: { id: string }) => {
  const res = await useFetch({
    url: `/api/access/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return res;
};

export const PUTUpdateAccess = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: AccessData;
}) => {
  const res = await useFetch({
    url: `/api/access/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      updatedData,
    }),
    cache: "no-cache",
  });

  return res;
};

export const DELETEAccess = async ({ id }: { id: string }) => {
  const res = await useFetch({
    url: `/api/access/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return res;
};
