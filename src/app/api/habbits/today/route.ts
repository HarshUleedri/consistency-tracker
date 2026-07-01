import { getUserId } from "@/lib/auth";
import { getTodaysHabbits } from "@/lib/habbit.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = await getUserId();

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
  const today = new Date(todaysParam);
  const utcDate = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
  );

  if (!todaysParam) {
    return NextResponse.json(
      {
        success: false,
        message: "date is required",
      },
      { status: 400 },
    );
  }
  const result = await getTodaysHabbits(userId, utcDate);

  return NextResponse.json(result);
}
