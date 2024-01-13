import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");

    const result = await prisma.province.delete({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "delete province data success",
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: "failed",
        message: "delete province data failed",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
