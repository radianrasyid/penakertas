import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");

    const res = await prisma.province.findUnique({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "retreive data success",
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "failed",
      message: "something went wrong when retreiving data",
      data: error,
    });
  }
};
