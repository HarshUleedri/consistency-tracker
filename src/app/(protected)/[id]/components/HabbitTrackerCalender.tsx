"use client";
import {
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  format,
  isAfter,
  addMonths,
  endOfDay,
} from "date-fns";
import React, { useState } from "react";

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
  onClick,
}: {
  date: Date;
  completed: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`h-24  flex items-center ${date.getDate() === new Date().getDate() && " border border-blue-600 text-blue-700 text-5xl"} justify-center border rounded text-2xl  `}
      key={date.getTime()}
    >
      {/* {date.getDate() === new Date().getDate()} */}
      {format(date, "d")}
    </div>
  );
}

function MonthCalender({
  month,
  isCompleted,
}: {
  month: Date;
  isCompleted: Date[];
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
      <h2>{format(month, "MMMM yyyy")} </h2>
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
              onClick={() => {
                console.log("clicked");
              }}
              completed={completed}
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
}: {
  startDate: Date;
  endDate: Date | null;
  isCompleted: Date[];
}) {
  const MONTHS = getMonthRange(startDate, endDate);

  return (
    <div>
      {MONTHS.map((month) => (
        <MonthCalender
          key={month.getTime()}
          month={month}
          isCompleted={isCompleted}
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
