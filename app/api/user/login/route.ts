import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { username, password } = body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    const isPasswordMatch = await bcrypt.compareSync(
      password,
      user?.password as string
    );
    if (!isPasswordMatch)
      return NextResponse.json(
        {
          status: "failed",
          message: "your email or password might be wrong",
        },
        {
          status: 400,
        }
      );

    const jwt = jsonwebtoken.sign(
      {
        username: user?.username,
        fullname: `${user?.firstName} ${user?.lastName}`,
        id: user?.id,
        email: user?.email,
        image: user?.photograph,
        role: user?.role,
      },
      "radianrasyid"
    );

    return NextResponse.json(
      {
        status: "success",
        message: "successfully logged in",
        data: jwt,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "credentials must be wrong",
      },
      {
        status: 400,
      }
    );
  }
};
