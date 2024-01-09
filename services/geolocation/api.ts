"use server";
import { useFetch } from "../apiInstance";

export const POSTCreateProvince = async (provinceName: string) => {
  const res = await useFetch({
    url: `${process.env.AUTH_URL}/api/geolocation/province/create`,
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
    url: `${process.env.AUTH_URL}/api/geolocation/district/create`,
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
}: {
  wardName: string;
  subdistrict: {
    name: string;
    id: string;
  };
}) => {
  const res = await useFetch({
    url: `${process.env.AUTH_URL}/api/geolocation/ward/create`,
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

export const GETProvinceList = async () => {
  const res = await useFetch({
    url: `${process.env.AUTH_URL}/api/geolocation/province/get-all`,
    method: "GET",
    headers: {},
    cache: "no-cache",
  });

  return res;
};

export const GETDistrictList = async ({
  province = "",
}: {
  province: string;
}) => {
  const res = await useFetch({
    url: `${process.env.AUTH_URL}/api/geolocation/district/get-all?province=${province}`,
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
    url: `${process.env.AUTH_URL}/api/geolocation/subdistrict/get-all?district=${district}`,
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
    url: `${process.env.AUTH_URL}/api/geolocation/ward/get-all?subdistrict=${subdistrict}`,
    headers: {},
    method: "GET",
    cache: "no-cache",
  });

  return res;
};
