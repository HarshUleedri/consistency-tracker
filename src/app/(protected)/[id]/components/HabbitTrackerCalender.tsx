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
type View = "detailed" | "compact";
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
  startDate,
  endDate,
  view,
}: {
  date: Date;
  completed: boolean;
  habbitId: string;
  startDate: Date;
  endDate: Date | null;
  view: View;
}) {
  const [initialState, setInitialState] = useState<boolean>(completed);

  const beforeStartDate =
    new Date(date).setHours(0, 0, 0, 0) <
    new Date(startDate).setHours(0, 0, 0, 0);

  const afterEndDate = endDate
    ? new Date(date).setHours(0, 0, 0, 0) >
      new Date(endDate).setHours(0, 0, 0, 0)
    : false;

  const handleToggle = async () => {
    const currentDate = new Date().setHours(0, 0, 0, 0);

    if (currentDate !== new Date(date).setHours(0, 0, 0, 0)) return;

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
      disabled={beforeStartDate || afterEndDate}
      className={` @container disabled:opacity-20 disabled:cursor-not-allowed flex items-center border rounded flex-col aspect-square
        ${format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") && " border border-blue-600 text-blue-700 "} 
        ${initialState ? "items-end justify-between  border-red-700 " : "justify-center"}
        ${view === "compact" ? " p-1" : " p-1 sm:p-4"}
         cursor-pointer`}
      key={date.getTime()}
      onClick={handleToggle}
    >
      {/* {date.getDate() === new Date().getDate()} */}
      <span
        className={` leading-5 ${view === "compact" ? (initialState ? "text-xs sm:text-sm" : " text-sm sm:text-lg") : initialState ? " text-xs sm:text-xl" : "text-sm sm:text-3xl"}`}
      >
        {format(date, "d")}
      </span>

      {initialState && (
        <svg
          viewBox="0 0 27 31"
          fill="currentColor"
          className={`text-red-700 self-center  flex-1 h-full w-auto max-h-full  `}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.35 28.0502C22.3833 27.8835 22.4 27.7502 22.4 27.6502V27.2002C22.4 26.4669 22.1667 25.6002 21.7 24.6002C21.2667 23.6002 20.7167 22.6169 20.05 21.6502C19.3833 20.6835 18.6833 19.7835 17.95 18.9502C17.2167 18.0835 16.5833 17.4002 16.05 16.9002L16 17.0002C16.7 17.8335 17.4 18.6835 18.1 19.5502C18.8333 20.3835 19.4833 21.2335 20.05 22.1002C20.65 22.9335 21.1333 23.7835 21.5 24.6502C21.9 25.5169 22.1 26.3669 22.1 27.2002V27.6502C22.1 27.7502 22.0833 27.8835 22.05 28.0502C21.75 27.8502 21.5333 27.6169 21.4 27.3502C21.3 27.0502 21.2167 26.7835 21.15 26.5502C21.1167 26.2835 21.0833 26.0669 21.05 25.9002C21.05 25.7335 20.9833 25.6502 20.85 25.6502C20.65 25.1835 20.4667 24.8169 20.3 24.5502C20.1333 24.2502 19.9167 23.8669 19.65 23.4002L19.95 22.8002C19.1167 22.0002 18.35 21.1669 17.65 20.3002C16.9833 19.4335 16.2667 18.5169 15.5 17.5502L15.3 17.7502C16.0667 18.6835 16.7167 19.5002 17.25 20.2002C17.7833 20.8669 18.1333 21.3335 18.3 21.6002C18.2 21.4335 17.9167 21.1169 17.45 20.6502C16.95 20.1169 16.1833 19.2169 15.15 17.9502C13.8833 19.3502 12.7333 20.7502 11.7 22.1502C10.7 23.5169 9.75 24.8835 8.85 26.2502C8.61667 26.4169 8.43333 26.7169 8.3 27.1502C8.16667 27.5502 8.03333 27.9669 7.9 28.4002C7.76667 28.8335 7.6 29.2169 7.4 29.5502C7.23333 29.8502 6.98333 30.0002 6.65 30.0002C6.51667 30.0002 6.35 29.9002 6.15 29.7002C6.71667 28.8335 7.13333 28.0169 7.4 27.2502C7.7 26.4502 7.88333 25.9669 7.95 25.8002C7.48333 26.2669 7.15 26.8502 6.95 27.5502C6.75 28.2169 6.43333 28.8835 6 29.5502C5.93333 29.4835 5.83333 29.4002 5.7 29.3002C5.56667 29.1669 5.41667 29.1002 5.25 29.1002L4.8 30.0002C4.66667 30.0669 4.5 30.1002 4.3 30.1002C4.06667 30.1002 3.85 30.0169 3.65 29.8502C3.48333 29.6502 3.33333 29.4335 3.2 29.2002C3.06667 28.9669 2.95 28.7502 2.85 28.5502C2.78333 28.3502 2.73333 28.2335 2.7 28.2002L2.85 28.0502C3.01667 27.8835 3.21667 27.5669 3.45 27.1002C3.68333 26.6335 3.96667 26.0669 4.3 25.4002C4.66667 24.7335 5.08333 24.0002 5.55 23.2002C6.01667 22.4002 6.56667 21.5669 7.2 20.7002C7.86667 19.8002 8.53333 18.8669 9.2 17.9002C9.9 16.9002 10.5833 15.9835 11.25 15.1502C9.95 16.6169 8.71667 18.2002 7.55 19.9002C6.38333 21.5669 5.31667 23.2335 4.35 24.9002C4.05 25.5669 3.75 26.1502 3.45 26.6502C3.15 27.1502 2.85 27.5169 2.55 27.7502C2.48333 27.6502 2.45 27.4502 2.45 27.1502C2.45 26.9169 2.51667 26.5835 2.65 26.1502C2.81667 25.7169 3.01667 25.2502 3.25 24.7502C3.51667 24.2502 3.8 23.7502 4.1 23.2502C4.43333 22.7169 4.76667 22.2169 5.1 21.7502L5.55 21.9002C6.31667 20.3669 7.21667 18.9835 8.25 17.7502C9.28333 16.5169 10.2833 15.2669 11.25 14.0002L10.9 13.7502C10.1333 14.7169 9.36667 15.7002 8.6 16.7002C7.86667 17.7002 7.13333 18.7335 6.4 19.8002C7.1 18.7335 7.8 17.7002 8.5 16.7002C9.23333 15.6669 9.98333 14.6502 10.75 13.6502C9.85 12.9835 8.96667 12.3669 8.1 11.8002C7.26667 11.2335 6.41667 10.5835 5.55 9.85019C4.68333 9.11686 3.78333 8.23353 2.85 7.20019C1.95 6.13353 1 4.78353 0 3.1502L1.2 2.35019C1.36667 2.35019 1.53333 2.45019 1.7 2.65019C1.9 2.81686 2.13333 3.13353 2.4 3.6002L2.85 3.1502C2.58333 2.51686 2.45 1.96686 2.45 1.50019C2.45 0.500193 2.81667 0.000193954 3.55 0.000193954C3.88333 0.000193954 4.31667 0.250194 4.85 0.750193C5.41667 1.25019 6.05 1.86686 6.75 2.60019C7.45 3.33353 8.21667 4.10019 9.05 4.90019C9.88333 5.66686 10.7667 6.33353 11.7 6.90019L14.5 9.30019L17.55 4.20019C17.8167 4.06686 18.1167 3.86686 18.45 3.6002C18.8167 3.3002 19.1667 3.0002 19.5 2.70019C19.8667 2.36686 20.2333 2.03353 20.6 1.70019C20.9667 1.33353 21.3 1.01686 21.6 0.750193C21.6667 1.01686 21.8333 1.21686 22.1 1.35019C22.3667 1.48353 22.5 1.68353 22.5 1.95019C22.5 2.25019 22.2 2.65019 21.6 3.1502C21.8 3.35019 21.95 3.45019 22.05 3.45019C22.6833 3.11686 23.2833 2.95019 23.85 2.95019C24.2833 2.95019 24.6333 3.05019 24.9 3.25019C25.1667 3.41686 25.3 3.68353 25.3 4.0502C25.3 4.48353 25.05 5.03353 24.55 5.70019C24.05 6.36686 23.45 7.10019 22.75 7.90019C22.05 8.70019 21.3333 9.55019 20.6 10.4502C19.8667 11.3169 19.2833 12.1835 18.85 13.0502C19.45 13.9169 20.2 14.8669 21.1 15.9002C22.0333 16.9335 22.9167 18.0335 23.75 19.2002C24.6167 20.3335 25.35 21.5169 25.95 22.7502C26.5833 23.9835 26.9 25.2502 26.9 26.5502C26.9 27.0835 26.8 27.4002 26.6 27.5002C26.4333 27.5669 26.2667 27.6002 26.1 27.6002C26.0333 27.0002 25.95 26.4002 25.85 25.8002C25.75 25.2002 25.5833 24.6002 25.35 24.0002L24.9 23.1002C24.8333 23.0669 24.7333 22.9835 24.6 22.8502L25.2 24.0002C25.4333 24.6002 25.5833 25.1835 25.65 25.7502C25.75 26.2835 25.8 26.8502 25.8 27.4502C25.6333 27.4502 25.4833 27.4669 25.35 27.5002C25.2167 27.5002 25.1167 27.5335 25.05 27.6002V28.5002C24.7833 29.1335 24.4333 29.4502 24 29.4502C23.7 29.4502 23.3833 29.3335 23.05 29.1002C22.75 28.8669 22.5167 28.6669 22.35 28.5002V28.0502ZM9 24.1502C9.46667 23.6835 9.9 23.1169 10.3 22.4502C10.6667 21.8169 11.0833 21.2002 11.55 20.6002C11.0833 21.1335 10.6167 21.6669 10.15 22.2002C9.65 22.7335 9.26667 23.3835 9 24.1502ZM18.9 14.4002C19.5 15.4669 20.2167 16.5335 21.05 17.6002C21.8833 18.6335 22.7167 19.7169 23.55 20.8502C22.7833 19.7169 21.9833 18.6002 21.15 17.5002C20.3167 16.4002 19.5667 15.3669 18.9 14.4002ZM8.95 11.8002L8.8 11.9502C8.83333 11.9835 8.95 12.0835 9.15 12.2502C9.35 12.3835 9.56667 12.5335 9.8 12.7002C10.0667 12.8669 10.3 13.0335 10.5 13.2002C10.7 13.3335 10.8333 13.4169 10.9 13.4502L11.05 13.2502L8.95 11.8002ZM11.6 13.6002L11.2 13.3502L11.05 13.5502L11.4 13.8002L11.6 13.6002ZM18.35 21.6502L18.3 21.6002L18.35 21.6502Z" />
        </svg>
      )}
    </button>
  );
}

function MonthCalender({
  month,
  isCompleted,
  habbitId,
  startDate,
  endDate,
  view,
}: {
  month: Date;
  isCompleted: Date[];
  habbitId: string;
  startDate: Date;
  endDate: Date | null;
  view: View;
}) {
  const firstDay = startOfMonth(month);
  const lastDay = endOfMonth(month);

  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });
  const offset = (getDay(firstDay) + 6) % 7;

  return (
    <div className="@container p-2 border rounded">
      <h4
        className={`mb-2 font-medium leading-5 ${view === "compact" ? " text-lg" : " text-lg sm:text-3xl sm:mb-6"} `}
      >
        {format(month, "MMMM yyyy")}{" "}
      </h4>
      <div className="grid grid-cols-7 gap-[clamp(2px,0.5cqw,4px)] ">
        {weekDays.map((day) => (
          <div
            className={`text-center lg:h-12 bg-secondary rounded flex items-center justify-center text-lg  text-foreground border  ${view === "compact" ? "text-xs " : " text-xs sm:text-lg"} `}
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
              startDate={startDate}
              endDate={endDate}
              key={date.getDate()}
              date={date}
              completed={completed}
              habbitId={habbitId}
              view={view}
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

  const [view, setView] = useState<View>("detailed");

  return (
    <>
      <div className="sm:flex overflow-hidden gap-1 hidden border w-fit ml-auto mt-6 rounded p-0.5">
        <button
          onClick={() => setView("compact")}
          className={` p-1 hover:bg-accent hover:text-primary ${view === "compact" ? "text-secondary bg-primary" : ""} rounded`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M22 12.999V20C22 20.5523 21.5523 21 21 21H13V12.999H22ZM11 12.999V21H3C2.44772 21 2 20.5523 2 20V12.999H11ZM11 3V10.999H2V4C2 3.44772 2.44772 3 3 3H11ZM21 3C21.5523 3 22 3.44772 22 4V10.999H13V3H21Z"></path>
          </svg>
        </button>
        <button
          onClick={() => setView("detailed")}
          className={`p-1 hover:bg-accent hover:text-primary ${view === "detailed" ? "text-secondary bg-primary" : ""} rounded`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM4 5V19H20V5H4ZM6 7H8V9H6V7ZM8 11H6V13H8V11ZM6 15H8V17H6V15ZM18 7H10V9H18V7ZM10 15H18V17H10V15ZM18 11H10V13H18V11Z"></path>
          </svg>
        </button>
      </div>
      <div
        className={
          view === "detailed" ? "grid grid-cols-1 gap-4" : "grid sm:grid-cols-3 gap-4 sm:gap-3"
        }
        // style={
        //   view === "compact"
        //     ? { gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }
        //     : {}
        // }
      >
        {MONTHS.map((month) => (
          <MonthCalender
            key={month.getTime()}
            startDate={startDate}
            endDate={endDate}
            month={month}
            isCompleted={isCompleted}
            habbitId={habbitId}
            view={view}
          />
        ))}
      </div>
    </>
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
