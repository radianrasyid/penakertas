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
  return await fetch(`https://relaxed-caiman-strongly.ngrok-free.app${url}`, {
    method,
    headers: {
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
