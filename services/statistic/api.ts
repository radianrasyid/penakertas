import { useFetch } from "../apiInstance";

export const GETEmployeeStatistic = async ({
  additionalUrl = "",
}: {
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/statistic/admin/dashboard`,
    method: "GET",
    cache: "no-cache",
    headers: {},
  });

  return res;
};
