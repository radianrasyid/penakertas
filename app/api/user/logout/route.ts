import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const cookieList = cookies().getAll();
  cookieList.map((i) => {
    cookies().delete(i.name);
  });
  const url = req.nextUrl.clone();
  url.pathname = "/sign-in";
  return NextResponse.redirect(url);
};
