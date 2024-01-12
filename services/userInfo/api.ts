"use server";
import { useFetch } from "../apiInstance";

export const POSTCreateReligion = async (name: string) => {
  const res = await useFetch({
    url: `${process.env.AUTH_URL}/api/religion/create`,
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
