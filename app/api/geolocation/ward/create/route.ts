import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { wardName, subdistrict } = await req.json();

    const res = await prisma.ward.create({
      data: {
        name: wardName,
        value: wardName.toUpperCase(),
        subdistrict: subdistrict,
        subdistrictName: subdistrict,
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
