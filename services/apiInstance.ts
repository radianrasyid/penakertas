"use server";

import { GetSessionData } from "@/lib/actions";

interface FetchArgs {
  contentType?: "application/json" | "multipart/form-data" | undefined;
  url: string;
  body?: BodyInit;
  authorization?: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  method: "POST" | "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
  requestInit?: RequestInit;
}

export async function useFetch({
  url,
  headers,
  body,
  cache,
  method = "GET",
  requestInit,
}: FetchArgs) {
  const authData = await GetSessionData();
  const result = await fetch(`http://localhost:52000${url}`, {
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
    body: body,
    ...requestInit,
  });
  if (!result.ok) {
    throw new Error((await result.json())?.message || "Something went wrong");
  }
  return await result.json();
}
