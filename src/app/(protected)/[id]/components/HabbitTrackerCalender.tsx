"use client";
import { toggleMark } from "@/lib/habbit.service";
import {
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  format,
  isAfter,
  addMonths,
} from "date-fns";
import { useState } from "react";

const weekDays = ["Mon", "Tus", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthRange(startDate: Date, endDate: Date | null) {
  const months: Date[] = [];

  let currentMonth = startOfMonth(startDate);
  const lastMonth = startOfMonth(endDate ?? new Date());

  while (!isAfter(currentMonth, lastMonth)) {
    months.push(currentMonth);
    currentMonth = addMonths(currentMonth, 1);
  }

  return months;
}

function DayCell({
  date,
  completed,
  habbitId,
}: {
  date: Date;
  completed: boolean;
  habbitId: string;
}) {
  const [initialState, setInitialState] = useState<boolean>(completed);

  const handleToggle = async () => {
    const previous = initialState;

    setInitialState((prev) => !prev);

    try {
      await toggleMark(habbitId, date);
    } catch (error) {
      setInitialState(previous);
    }
  };

  return (
    <button
      className={`h-24  flex items-center ${format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") && " border border-blue-600 text-blue-700 text-5xl"} justify-center border rounded text-2xl  `}
      key={date.getTime()}
      onClick={handleToggle}
    >
      {/* {date.getDate() === new Date().getDate()} */}

      {format(date, "d")}
      {initialState && <p className="text-3xl text-red-600">X</p>}
    </button>
  );
}

function MonthCalender({
  month,
  isCompleted,
  habbitId,
}: {
  month: Date;
  isCompleted: Date[];
  habbitId: string;
}) {
  const firstDay = startOfMonth(month);
  const lastDay = endOfMonth(month);

  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });
  const offset = (getDay(firstDay) + 6) % 7;

  return (
    <div>
      <h2 className="my-6">{format(month, "MMMM yyyy")} </h2>
      <div className="grid grid-cols-7 gap-4 ">
        {weekDays.map((day) => (
          <div
            className="text-center h-12 bg-accent flex items-center justify-center text-lg font-semibold text-muted-foreground border"
            key={day}
          >
            {day}
          </div>
        ))}

        {Array.from({ length: offset }).map((_, i) => (
          <div key={i} />
        ))}

        {days.map((date) => {
          const dateString = format(date, "yyyy-MM-dd");

          const completed = isCompleted.some(
            (completedDate) =>
              format(completedDate, "yyyy-MM-dd") === dateString,
          );

          return (
            <DayCell
              key={date.getDate()}
              date={date}
              completed={completed}
              habbitId={habbitId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function HabbitTrackerCalender({
  startDate,
  endDate,
  isCompleted,
  habbitId,
}: {
  startDate: Date;
  endDate: Date | null;
  isCompleted: Date[];
  habbitId: string;
}) {
  const MONTHS = getMonthRange(startDate, endDate);

  return (
    <div className="">
      {MONTHS.map((month) => (
        <MonthCalender
          key={month.getTime()}
          month={month}
          isCompleted={isCompleted}
          habbitId={habbitId}
        />
      ))}
    </div>
    // <div className="grid grid-cols-7 gap-2">
    //   {weekDays.map((day) => (
    //     <div
    //       className="text-center h-12 bg-accent flex items-center justify-center text-lg font-semibold text-gray-500"
    //       key={day}
    //     >
    //       {day}
    //     </div>
    //   ))}

    //   {Array.from({ length: offset }).map((_, i) => (
    //     <div key={i}></div>
    //   ))}

    //   {days.map((day) => {
    //     const dateString = format(day, "yyyy-MM-dd");

    //     const completed = isCompleted.some(
    //       (completedDate) => format(completedDate, "yyyy-MM-dd") === dateString,
    //     );
    //     return (
    //       <button
    //         className=" h-24 text-4xl rounded-lg border flex items-center justify-center
    //             transition"
    //         key={day.getTime()}
    //       >
    //         {completed ? "X" : day.getDate()}
    //       </button>
    //     );
    //   })}
    // </div>
  );
}
