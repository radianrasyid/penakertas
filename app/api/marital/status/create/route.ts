import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json();

    const res = await prisma.maritalStatus.create({
      data: {
        name: name,
        value: name.toUpperCase(),
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "create marital status successfull",
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
        message: "create marital status failed",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
