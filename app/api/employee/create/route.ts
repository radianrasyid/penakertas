import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const {} = await req.json();
};
