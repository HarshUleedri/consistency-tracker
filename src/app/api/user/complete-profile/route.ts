import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const { countryCode, timezone } = await req.json();

  if (!countryCode && !timezone) {
    return NextResponse.json(
      {
        success: false,
        message: "country code and timezone is required",
      },
      { status: 400 },
    );
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      countryCode,
      timezone,
      isOnboarded: true,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "profile is completed successfully",
    },
    {
      status: 200,
    },
  );
}
