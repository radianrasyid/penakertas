import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { subdistrict, district } = await req.json();

    const res = await prisma.subdistrict.create({
      data: {
        name: subdistrict,
        value: subdistrict.toUpperCase(),
        cityDistrictName: district,
        cityDistricts: district,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "create subdistrict successfull",
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
        message: "create subdistrict failed",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
