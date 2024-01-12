import { useFetch } from "../apiInstance";
export const POSTBulkInsertUser = async () => {
  try {
    const res = await useFetch({
      url: `${process.env.AUTH_URL}/api/user/bulk-insert`,
      headers: {},
      method: "POST",
      cache: "no-cache",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
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

export const POSTCheckUserRole = async (email: string) => {
  const res = await useFetch({
    url: `${process.env.AUTH_URL}/api/user/check-role`,
    method: "POST",
    body: JSON.stringify({
      email,
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
