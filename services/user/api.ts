import { useFetch } from "../apiInstance";
export const POSTBulkInsertUser = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/bulk-insert`,
      {
        method: "POST",
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error((await res.json()).message);
    }

    return await res.json();
  } catch (error) {
    throw new Error();
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

export const GETEmployeePaginated = async ({
  pageNumber = 1,
  pageSize = 5,
  searchQuery = "",
}: {
  pageSize: number;
  pageNumber: number;
  searchQuery: string;
}) => {
  const res = await useFetch({
    url: `/api/user/employee?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETWhoAmI = async () => {
  const res = await useFetch({
    url: `/api/user/whoami`,
    method: "GET",
  });

  return res;
};

export const GETEmployeeDetail = async (id: string) => {
  const res = await useFetch({
    url: `/api/user/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    requestInit: {
      next: {
        tags: ["employee"],
      },
    },
  });

  return res;
};

export const GETRefresh = async () => {
  const res = await useFetch({
    url: `/api/user/refresh`,
    method: "GET",
    cache: "no-cache",
  });
  return res;
};

export const PATCHUpdateUserInfo = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await useFetch({
    url: `/api/user/${id}`,
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return res;
};

export const POSTAddPartner = async ({
  partnertData,
}: {
  partnertData: {
    fullname: string;
    status: string;
    profession: string;
    phoneNumber: string;
  }[];
}) => {
  const res = await useFetch({
    url: `/api/relationship`,
    method: "POST",
    body: JSON.stringify({ partnerData: partnertData }),
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const DELETEPartner = async (id: string) => {
  const res = await useFetch({
    url: `/api/relationship/${id}`,
    method: "DELETE",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};
