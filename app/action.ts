"use server";

import { revalidateTag } from "next/cache";

export async function revalidateEmployee() {
  revalidateTag("employee");
}
