import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await prisma.user.createMany({
      data: [
        {
          firstName: "Radian",
          lastName: "Rasyid",
          password: await bcrypt.hash("12345678", 10),
          email: "radian.rasyid@gmail.com",
          username: "radianrasyid",
          role: "SUPER_ADMIN",
        },
        {
          firstName: "Astrid Faradilla",
          lastName: "Pangesti",
          password: await bcrypt.hash("12345678", 10),
          email: "astridfaradilla@gmail.com",
          username: "astridf",
          role: "ADMIN",
        },
        {
          firstName: "Azra",
          lastName: "Ramadhani",
          password: await bcrypt.hash("12345678", 10),
          email: "azraramadhani@gmail.com",
          username: "azraramadhani",
          role: "USER",
        },
      ],
    });

    await prisma.gender.createMany({
      data: [
        {
          name: "MALE",
          value: "MALE",
        },
        {
          name: "FEMALE",
          value: "FEMALE",
        },
      ],
    });

    await prisma.religion.createMany({
      data: [
        {
          name: "ISLAM",
          value: "ISLAM",
        },
      ],
    });

    await prisma.educationLevel.createMany({
      data: [
        {
          name: "S1",
          value: "S1",
        },
        {
          name: "SMA",
          value: "SMA",
        },
        {
          name: "SMP",
          value: "SM",
        },
      ],
    });

    await prisma.maritalStatus.createMany({
      data: [
        {
          name: "Belum Kawin",
          value: "BELUM KAWIN",
        },
        {
          name: "Kawin",
          value: "KAWIN",
        },
        {
          name: "Cerai Hidup",
          value: "CERAI HIDUP",
        },
        {
          name: "Cerai Mati",
          value: "CERAII MATI",
        },
        {
          name: "Nikah Tercatat/Siri",
          value: "NIKAH SIRI",
        },
      ],
    });

    await prisma.workGroup.createMany({
      data: [
        {
          name: "ASN",
          value: "ASN",
        },
        {
          name: "PTT",
          value: "PTT",
        },
        {
          name: "THL",
          value: "THL",
        },
      ],
    });

    await prisma.province.createMany({
      data: [
        "Nanggroe Aceh Darussalam",
        "Sumatera Utara",
        "Sumatera Selatan",
        "Sumatera Barat",
        "Bengkulu",
        "Riau",
        "Kepulauan Riau",
        "Jambi",
        "Lampung",
        "Bangka Belitung",
        "Kalimantan Barat",
        "Kalimantan Timur",
        "Kalimantan Selatan",
        "Kalimantan Tengah",
        "Kalimantan Utara",
        "Banten",
        "DKI Jakarta",
        "Jawa Barat",
        "Jawa Tengah",
        "Daerah Istimewa Yogyakarta",
        "Jawa Timur",
        "Bali",
        "Nusa Tenggara Timur",
        "Nusa Tenggara Barat",
        "Gorontalo",
        "Sulawesi Barat",
        "Sulawesi Tengah",
        "Sulawesi Utara",
        "Sulawesi Tenggara",
        "Sulawesi Selatan",
        "Maluku Utara",
        "Maluku",
        "Papua Barat",
        "Papua",
        "Papua Tengah",
        "Papua Pegunungan",
        "Papua Selatan",
        "Papua Barat Daya",
      ].map((i) => {
        return {
          name: i,
          value: i,
        };
      }),
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
