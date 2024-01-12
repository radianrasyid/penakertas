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
  headers: HeadersInit;
  cache?: RequestCache;
  method: "POST" | "GET" | "PUT" | "PATCH" | "POST";
}) {
  let data: T | any;
  return await fetch(`${url}`, {
    method,
    headers: {
      ...headers,
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
