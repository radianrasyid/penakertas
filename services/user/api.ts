import { useFetch } from "../apiInstance";
export const POSTBulkInsertUser = async () => {
  try {
    const res = await useFetch({
      url: `/api/user/bulk-insert`,
      headers: {},
      method: "POST",
      cache: "no-cache",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const POSTLoginUser = async ({
  password,
  username,
  additionalUrl = process.env.AUTH_URL,
}: {
  username: string;
  password: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/user/login`,
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

export const POSTCheckUserRole = async ({
  email,
  additionalUrl = process.env.AUTH_URL,
}: {
  email: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/user/check-role`,
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
