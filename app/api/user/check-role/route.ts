import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { email } = body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!!user?.role) {
    return NextResponse.json(
      {
        status: "success",
        message: "check role success",
        data: user.role,
      },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json(
    {
      status: "failed",
      message: "user doesn't exist",
    },
    {
      status: 400,
    }
  );
};
