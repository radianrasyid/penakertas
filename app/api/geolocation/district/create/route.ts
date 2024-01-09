import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { cityDistrictName, province } = await req.json();

    const res = await prisma.cityDistrict.create({
      data: {
        name: cityDistrictName,
        value: cityDistrictName.toUpperCase(),
        province: {
          connect: { id: province.id },
        },
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "create district successfull",
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("ini error", error);
    return NextResponse.json(
      {
        status: "failed",
        message: "create district failed",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
