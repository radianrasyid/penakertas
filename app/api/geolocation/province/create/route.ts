import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { provinceName } = await req.json();

    const res = await prisma.province.create({
      data: {
        name: provinceName,
        value: provinceName.toUpperCase(),
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "create province successfull",
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
        message: "create province failed",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
