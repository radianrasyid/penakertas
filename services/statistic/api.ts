"use server";
import { useFetch } from "../apiInstance";

export const GETEmployeeStatistic = async () => {
  const res = await useFetch({
    url: `${process.env.AUTH_URL}/api/statistic/admin/dashboard`,
    method: "GET",
    cache: "no-cache",
    headers: {},
  });

  return res;
};
