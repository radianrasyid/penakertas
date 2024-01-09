import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await prisma.province.findMany();

    return NextResponse.json(
      {
        status: "success",
        message: "list of province",
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "something went wrong",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
