import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const result = await prisma.user.createMany({
      data: [
        {
          firstName: "Radian",
          lastName: "Rasyid",
          password: await bcrypt.hash("12345678", 10),
          email: "radian.rasyid@gmail.com",
          username: "radianrasyid",
        },
      ],
    });

    return NextResponse.json(
      {
        status: "success",
        message: "bulk insert success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "bulk insert failed",
      },
      {
        status: 400,
      }
    );
  }
}
