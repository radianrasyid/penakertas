import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const pageSize = req.nextUrl.searchParams.get("pageSize");
    const pageNumber = req.nextUrl.searchParams.get("pageNumber");
    const searchQuery = req.nextUrl.searchParams.get("searchQuery");

    const datas = await prisma.ward.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                name: {
                  contains: searchQuery as string,
                  mode: "insensitive",
                },
              },
              {
                value: {
                  contains: searchQuery as string,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      skip: (Number(pageNumber) - 1) * Number(pageSize),
      take: Number(pageSize),
      orderBy: {
        name: "desc",
      },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "retreive data successful",
        data: datas,
        totalPages: Math.ceil(datas.length / Number(pageSize)),
        currentPage: Number(pageNumber),
        pageSize: Number(pageSize),
        totalData: datas.length,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      status: "failed",
      message: "retreive data failed",
      data: error,
    });
  }
};
