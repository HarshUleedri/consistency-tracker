import { getUser } from "@/lib/auth";
import { getTodaysHabbits } from "@/lib/habbit.service";
import { CheckCheck, Hourglass } from "lucide-react";
import Link from "next/link";

export default async function TodaysHabbits() {
  const userId = await getUser();
  const { habbits = [] } = await getTodaysHabbits(userId || "");
  // console.log(habbits[0].completions)

  const total = habbits.length;
  const overAllCompletion = habbits.filter(
    (h) => h.completions.length > 0,
  ).length;

  const totaltaskCompletionPercentage =
    total === 0 ? 0 : Math.round((overAllCompletion / total) * 100);

  console.log(totaltaskCompletionPercentage);
  return (
    <div>
      <h2 className="text-xl mb-4">Todays Task </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 ">
        {habbits.map((item) => {
          const isCompleted = item.completions.length > 0;
          return (
            <Link
              href={`/${item.id}`}
              className="space-x-2 flex items-center"
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
      </div>
      
        <h2 className="text-base mb-2">Total Progress</h2>
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
