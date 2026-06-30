"use client";
import { useSession } from "@/lib/auth-client";
import { normalizeDate } from "@/lib/day";
import { useEffect, useState } from "react";

export default function TasksProgressForToday() {
  const todayDate = normalizeDate(new Date());

  const { data } = useSession();

  const userId = data?.user.id;
  const [habbits, setHabbits] = useState<
    Array<{
      id: string;
      title: string;
      description: string;
      startDate: Date;
      endDate: Date | null;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
      completions: Array<{
        id: string;
        createdAt: Date;
        date: Date;
        habbitId: string;
      }>;
    }>
  >([]);
  useEffect(() => {
    (async function () {
      const res = await fetch(
        `/api/habbits/today?date=${encodeURIComponent(todayDate.toDateString())}`,
      );
      const data = await res.json();
      setHabbits(data.habbits);
    })();
  }, [userId]);

  const total = habbits.length;
  const overAllCompletion = habbits.filter(
    (h) => h.completions.length > 0,
  ).length;

  const totaltaskCompletionPercentage =
    total === 0 ? 0 : Math.round((overAllCompletion / total) * 100);
  return (
    <div className="border rounded p-2 sm:p-4">
      <h3 className="text-base mb-2">Total Progress</h3>
      <div className="bg-muted border rounded-full h-2 ">
        <div
          style={{
            transform: `scaleX(${totaltaskCompletionPercentage / 100})`,
          }}
          className="h-full block transform origin-left relative rounded-full bg-blue-500 "
        ></div>
      </div>
    </div>
  );
}
