import { getSingleHabbit } from "@/lib/habbit.service";
import HabbitTrackerCalender from "./components/HabbitTrackerCalender";

export default async function SingleHabbit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { habbit } = await getSingleHabbit(id);
  const { title, completions, description, endDate, startDate } = habbit || {};

  const isCompleted = completions?.map((item) => item.date);

  const completedDays = isCompleted?.length ?? 0;

  const totalDays =
    endDate && startDate
      ? Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1
      : undefined;

  const pendingDays =
    totalDays !== undefined ? totalDays - completedDays : undefined;

  return (
    <div className="p-8 space-y-2 ">
      <h1 className="text-4xl  ">{title}</h1>
      <p className="text-base truncate">{description}</p>
      <div className="grid grid-cols-3 gap-4  ">
        <div className=" p-4 border rounded ">
          <span className="font-medium truncate">Completed Days</span>
          <div>
            <span className="text-4xl">{completedDays}</span>
          </div>
        </div>
        {endDate && (
          <>
            <div className=" p-4 border rounded">
              <span className="font-medium truncate">Pending Days</span>
              <div>
                <span className="text-4xl">{pendingDays}</span>
              </div>
            </div>
            <div className=" p-4 border rounded">
              <span className="font-medium truncate">Total Days</span>
              <div>
                <span className="text-4xl">{totalDays}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <hr />
      <HabbitTrackerCalender
        isCompleted={isCompleted || []}
        startDate={startDate ?? new Date()}
        endDate={endDate || null}
        habbitId={id}
      />
    </div>
  );
}
