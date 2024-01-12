import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const districtName = req.nextUrl.searchParams.get("district");
    const res = await prisma.subdistrict.findMany({
      where: {
        cityDistrictId: {
          contains: districtName as string,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "list of subdistricts",
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
