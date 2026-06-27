import { getUser } from "@/lib/auth";
import { getTodaysHabbits } from "@/lib/habbit.service";
import React from "react";

export default async function TasksProgressForToday() {
  const userId = await getUser();
  const { habbits = [] } = await getTodaysHabbits(userId || "");
  // console.log(habbits[0].completions)

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
