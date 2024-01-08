import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { cityDistrictName, province } = await req.json();

    const res = await prisma.cityDistrict.create({
      data: {
        name: cityDistrictName,
        value: cityDistrictName.toUpperCase(),
        provinceName: province,
        province: province,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "create education level successfull",
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
        message: "create education level failed",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
