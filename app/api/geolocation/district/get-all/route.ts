import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const provinceName = req.nextUrl.searchParams.get("province") as string;
  try {
    const res = await prisma.cityDistrict.findMany({
      where: {
        provinceId: {
          contains: provinceName,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "list of districts",
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
