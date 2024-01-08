import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { educationLevel, additionalName } = await req.json();

    const res = await prisma.educationLevel.create({
      data: {
        name: educationLevel,
        value: educationLevel.toUpperCase(),
        additionalName: additionalName,
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
