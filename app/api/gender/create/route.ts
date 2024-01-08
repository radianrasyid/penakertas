import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POSTCreateGender = async (req: NextRequest) => {
  try {
    const { genderName } = await req.json();

    const res = await prisma.gender.create({
      data: {
        name: genderName,
        value: genderName.toUpperCase(),
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "create gender successfull",
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      message: "create gender failed",
      data: error,
    });
  }
};
