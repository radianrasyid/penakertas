import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const subdistrict = req.nextUrl.searchParams.get("subdistrict");
    const res = await prisma.ward.findMany({
      where: {
        subdistrictId: {
          contains: subdistrict as string,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "list of wards",
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
