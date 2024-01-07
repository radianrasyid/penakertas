import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const AsnAmount = await prisma.user.count({
      where: {
        workGroup: "ASN",
      },
    });
    const PttAmount = await prisma.user.count({
      where: {
        workGroup: "PTT",
      },
    });
    const ThlAmount = await prisma.user.count({
      where: {
        workGroup: "THL",
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "user statistics",
        data: {
          asn: AsnAmount,
          ptt: PttAmount,
          thl: ThlAmount,
          totalEmployee: AsnAmount + PttAmount + ThlAmount,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: error,
      },
      {
        status: 400,
      }
    );
  }
};
