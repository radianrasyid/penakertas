import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json();

    const res = await prisma.religion.create({
      data: {
        name: name,
        value: name,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "create religion successful",
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
        message: "create religion failed",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
