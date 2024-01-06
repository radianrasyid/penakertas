import { useFetch } from "../apiInstance";

export const POSTBulkInsertUser = async () => {
  const res = await useFetch({
    url: "/api/user/bulk-insert",
    headers: {},
    method: "POST",
    cache: "no-cache",
  });

  return res;
};

export const POSTLoginUser = async (username: string, password: string) => {
  const res = await useFetch({
    url: `${process.env.AUTH_URL}/api/user/login`,
    headers: {},
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return res;
};
