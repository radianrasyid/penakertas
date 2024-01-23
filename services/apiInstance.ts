"use server";

import { GetSessionData } from "@/lib/actions";

export async function useFetch<T>({
  url,
  headers,
  body,
  cache,
  method,
}: {
  contentType?: "application/json" | "multipart/form-data" | undefined;
  url: string;
  body?: BodyInit;
  authorization?: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  method: "POST" | "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
}) {
  let data: T | any;
  const authData = await GetSessionData();

  return await fetch(`http://localhost:52000${url}`, {
    method,
    headers: !!authData?.user?.jwt
      ? {
          ...headers,
          "ngrok-skip-browser-warning": "9901",
          Authorization: `Bearer ${authData.user.jwt}`,
        }
      : {
          ...headers,
          "ngrok-skip-browser-warning": "9901",
        },
    cache: cache,
    body: body,
  })
    .then(async (res) => await res.json())
    .then((result) => {
      data = result;
      return data;
    });
}
