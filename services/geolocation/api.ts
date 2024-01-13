import { useFetch } from "../apiInstance";

export const POSTCreateProvince = async ({
  provinceName,
}: {
  provinceName: string;
}) => {
  const res = await useFetch({
    url: `/api/geolocation/province/create`,
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
}: {
  cityDistrictName: string;
  province: {
    name: string;
    id: string;
  };
}) => {
  const res = await useFetch({
    url: `/api/geolocation/district/create`,
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
}: {
  subdistrict: string;
  district: {
    id: string;
    name: string;
  };
}) => {
  const res = await useFetch({
    url: `/api/geolocation/subdistrict/create`,
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
}: {
  wardName: string;
  subdistrict: {
    name: string;
    id: string;
  };
}) => {
  const res = await useFetch({
    url: `/api/geolocation/ward/create`,
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

export const GETProvinceList = async ({}: {}) => {
  const res = await useFetch({
    url: `/api/geolocation/province/get-all`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETProvinceById = async ({ id }: { id: string }) => {
  const res = await useFetch({
    url: `/api/geolocation/province/get-by-id?id=${id}`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const PUTEDitProvince = async ({
  id,
  data,
}: {
  id: string;
  data: {
    name: string;
  };
}) => {
  const res = await useFetch({
    url: `/api/geolocation/province/edit?id=${id}`,
    method: "PUT",
    headers: {},
    cache: "no-cache",
    body: JSON.stringify({
      name: data.name,
    }),
  });

  return res;
};

export const DELETEProvince = async ({ id }: { id: string }) => {
  const res = await useFetch({
    url: `/api/geolocation/province/delete?id=${id}`,
    headers: {},
    method: "DELETE",
  });

  return res;
};

export const GETDistrictList = async ({
  province = "",
}: {
  province: string;
}) => {
  const res = await useFetch({
    url: `/api/geolocation/district/get-all?province=${province}`,
    headers: {},
    method: "GET",

    cache: "no-cache",
  });

  return res;
};

export const GETSubdistrictList = async ({
  district = "",
}: {
  district: string;
}) => {
  const res = await useFetch({
    url: `/api/geolocation/subdistrict/get-all?district=${district}`,
    headers: {},
    method: "GET",
    cache: "no-cache",
  });

  return res;
};

export const GETWardList = async ({
  subdistrict = "",
}: {
  subdistrict: string;
}) => {
  const res = await useFetch({
    url: `/api/geolocation/ward/get-all?subdistrict=${subdistrict}`,
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
}: {
  pageNumber: number;
  pageSize: number;
  searchQuery: string;
}) => {
  const res = await useFetch({
    url: `/api/geolocation/province/get-paginate?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
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
}: {
  pageNumber: number;
  pageSize: number;
  searchQuery: string;
}) => {
  const res = await useFetch({
    url: `/api/geolocation/district/get-paginate?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
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
}: {
  pageNumber: number;
  pageSize: number;
  searchQuery: string;
}) => {
  const res = await useFetch({
    url: `/api/geolocation/subdistrict/get-paginate?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
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
}: {
  pageNumber: number;
  pageSize: number;
  searchQuery: string;
}) => {
  const res = await useFetch({
    url: `/api/geolocation/ward/get-paginate?pageSize=${pageSize}&pageNumber=${pageNumber}&searchQuery=${searchQuery}`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};
