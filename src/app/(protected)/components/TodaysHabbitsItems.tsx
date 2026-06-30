"use client";
import { normalizeDate } from "@/lib/day";
import { CheckCheck, Hourglass } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TodaysHabbitsItems({ userId }: { userId: string }) {
  const todayDate = normalizeDate(new Date());

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
      console.log(todayDate.toDateString());
      const data = await res.json();
      setHabbits(data.habbits);
    })();
  }, [userId]);
  return (
    <>
      {habbits.map((item) => {
        const isCompleted = item.completions.length > 0;
        console.log(item.completions);
        return (
          <Link
            href={`/${item.id}`}
            className="space-x-2 hover:bg-muted flex items-center p-2 rounded"
            key={item.id}
          >
            {isCompleted ? (
              <span>
                <CheckCheck className="size-5" />
              </span>
            ) : (
              <span>
                <Hourglass className="size-4.5" />
              </span>
            )}
            <span className="text-sm"> {item.title}</span>
          </Link>
        );
      })}
      {habbits.length === 0 && (
        <p className="text-base sm:col-span-3 align-middle p-4 text-center font-mono ">
          No Task Yet
        </p>
      )}
    </>
  );
}
