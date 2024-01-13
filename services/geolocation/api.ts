import { useFetch } from "../apiInstance";

export const POSTCreateProvince = async ({
  provinceName,
  additionalUrl = process.env.AUTH_URL,
}: {
  provinceName: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/province/create`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      provinceName: provinceName,
    }),
  });

  return res;
};

export const POSTCreateDistrict = async ({
  cityDistrictName,
  province,
  additionalUrl = process.env.AUTH_URL,
}: {
  cityDistrictName: string;
  province: {
    name: string;
    id: string;
  };
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/district/create`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      cityDistrictName,
      province,
    }),
  });

  return res;
};

export const POSTCreateSubdistrict = async ({
  subdistrict,
  district,
  additionalUrl = process.env.AUTH_URL,
}: {
  subdistrict: string;
  district: {
    id: string;
    name: string;
  };
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${process.env.AUTH_URL}/api/geolocation/subdistrict/create`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      subdistrict,
      district,
    }),
  });

  return res;
};

export const POSTCreateWard = async ({
  subdistrict,
  wardName,
  additionalUrl = process.env.AUTH_URL,
}: {
  wardName: string;
  subdistrict: {
    name: string;
    id: string;
  };
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/ward/create`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      subdistrict,
      wardName,
    }),
  });

  return res;
};

export const GETProvinceList = async ({
  additionalUrl = process.env.AUTH_URL,
}: {
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/province/get-all`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETProvinceById = async ({
  id,
  additionalUrl = process.env.AUTH_URL,
}: {
  id: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/province/get-by-id?id=${id}`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const PUTEDitProvince = async ({
  id,
  additionalUrl = process.env.AUTH_URL,
  data,
}: {
  id: string;
  additionalUrl?: string;
  data: {
    name: string;
  };
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/province/edit?id=${id}`,
    method: "PUT",
    headers: {},
    cache: "no-cache",
    body: JSON.stringify({
      name: data.name,
    }),
  });

  return res;
};

export const DELETEProvince = async ({
  id,
  additionalUrl = process.env.AUTH_URL,
}: {
  id: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/province/delete?id=${id}`,
    headers: {},
    method: "DELETE",
  });

  return res;
};

export const GETDistrictList = async ({
  province = "",
  additionalUrl = process.env.AUTH_URL,
}: {
  province: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/district/get-all?province=${province}`,
    headers: {},
    method: "GET",

    cache: "no-cache",
  });

  return res;
};

export const GETSubdistrictList = async ({
  district = "",
  additionalUrl = process.env.AUTH_URL,
}: {
  district: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/subdistrict/get-all?district=${district}`,
    headers: {},
    method: "GET",
    cache: "no-cache",
  });

  return res;
};

export const GETWardList = async ({
  subdistrict = "",
  additionalUrl = process.env.AUTH_URL,
}: {
  subdistrict: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/ward/get-all?subdistrict=${subdistrict}`,
    headers: {},
    method: "GET",
    cache: "no-cache",
  });

  return res;
};

export const GETListProvincePaginate = async ({
  pageNumber = 1,
  pageSize = 5,
  searchQuery = "",
  additionalUrl = process.env.AUTH_URL,
}: {
  pageNumber: number;
  pageSize: number;
  searchQuery: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/province/get-paginate?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETListDistrictPaginate = async ({
  pageNumber = 1,
  pageSize = 5,
  searchQuery = "",
  additionalUrl = process.env.AUTH_URL,
}: {
  pageNumber: number;
  pageSize: number;
  searchQuery: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/district/get-paginate?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETListSubdistrictPaginate = async ({
  pageNumber = 1,
  pageSize = 5,
  searchQuery = "",
  additionalUrl = process.env.AUTH_URL,
}: {
  pageNumber: number;
  pageSize: number;
  searchQuery: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/subdistrict/get-paginate?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETListWardPaginate = async ({
  pageNumber = 1,
  pageSize = 5,
  searchQuery = "",
  additionalUrl = process.env.AUTH_URL,
}: {
  pageNumber: number;
  pageSize: number;
  searchQuery: string;
  additionalUrl?: string;
}) => {
  const res = await useFetch({
    url: `${additionalUrl}/api/geolocation/ward/get-paginate?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};
