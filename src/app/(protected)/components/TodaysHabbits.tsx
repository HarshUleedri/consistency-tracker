import { getUser } from "@/lib/auth";
import { normalizeDate } from "@/lib/day";
import { getTodaysHabbits } from "@/lib/habbit.service";
import { CheckCheck, Hourglass } from "lucide-react";
import Link from "next/link";

export default async function TodaysHabbits() {
  const userId = await getUser();

  const todayDate = normalizeDate(new Date());
  const { habbits = [] } = await getTodaysHabbits(userId || "", todayDate);
  return (
    <div>
      <h2 className="text-xl mb-4">Todays Task </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 border rounded p-2 sm:p-4 ">
        {habbits.map((item) => {
          const isCompleted = item.completions.length > 0;
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
      </div>
      {/* <hr className="text-muted border" /> */}
    </div>
  );
}
