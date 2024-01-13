import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { wardName, subdistrict } = await req.json();

    const res = await prisma.ward.create({
      data: {
        name: wardName,
        value: wardName.toUpperCase(),
        subdistrict: {
          connect: {
            id: subdistrict.id,
          },
        },
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "create ward successfull",
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
        message: "create ward failed",
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
