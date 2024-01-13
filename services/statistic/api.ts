import { useFetch } from "../apiInstance";

export const GETEmployeeStatistic = async ({}: {}) => {
  const res = await useFetch({
    url: `/api/statistic/admin/dashboard`,
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};
