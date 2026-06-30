import { getUser } from "@/lib/auth";
import { normalizeDate } from "@/lib/day";
import { getTodaysHabbits } from "@/lib/habbit.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = await getUser();

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const todaysParam = req.nextUrl.searchParams.get("date");
  if (!todaysParam) {
    return NextResponse.json(
      { success: false, message: "today is required" },
      { status: 400 },
    );
  }
  const today = normalizeDate(new Date(todaysParam));
  if (!todaysParam) {
    return NextResponse.json(
      {
        success: false,
        message: "date is required",
      },
      { status: 400 },
    );
  }
  const result = await getTodaysHabbits(userId, today);

  return NextResponse.json(result);
}
