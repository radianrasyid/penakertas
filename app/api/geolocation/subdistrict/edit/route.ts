import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const { name } = await req.json();
    const id = req.nextUrl.searchParams.get("id");

    const result = await prisma.subdistrict.update({
      where: {
        id: id as string,
      },
      data: {
        name: name,
        value: name.toUpperCase(),
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "edit subdistrict data success",
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
        message: "something went wrong when updating subdistrict data",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
