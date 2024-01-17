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
}: {
  username: string;
  password: string;
}) => {
  const res = await useFetch({
    url: `/api/user/login`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return res;
};

export const POSTCheckUserRole = async ({ email }: { email: string }) => {
  const res = await useFetch({
    url: `/api/user/check-role`,
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const POSTCreateUser = async ({ formData }: { formData: FormData }) => {
  const res = await useFetch({
    url: `/api/user/create`,
    method: "POST",
    headers: {},
    cache: "no-cache",
    body: formData,
  });

  return res;
};
