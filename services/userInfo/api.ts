import { useFetch } from "../apiInstance";

export const POSTCreateReligion = async (name: string) => {
  const res = await useFetch({
    url: `/api/religion/create`,
    method: "POST",
    body: JSON.stringify({
      name,
    }),
    cache: "no-cache",
    headers: {},
  });

  return res as {
    status: "success" | "failed";
    message: string;
    data?: string | undefined;
  };
};

export const GETListWorkGroup = async () => {
  const res = await useFetch({
    url: `/api/work/group`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETListWorkUnit = async () => {
  const res = await useFetch({
    url: `/api/work/unit`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETListWorkPart = async () => {
  const res = await useFetch({
    url: `/api/work/part`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETListReligion = async () => {
  const res = await useFetch({
    url: `/api/identity/religion`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETListGender = async () => {
  const res = await useFetch({
    url: `/api/identity/gender`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETListEducationLevel = async () => {
  const res = await useFetch({
    url: `/api/identity/education-level`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETListMaritalStatus = async () => {
  const res = await useFetch({
    url: `/api/identity/marital-status`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};
