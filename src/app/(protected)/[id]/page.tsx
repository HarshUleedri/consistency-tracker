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

  return (
    <div className="p-8 space-y-2 ">
      <h1 className="text-4xl  ">{title}</h1>
      <p className="text-base truncate">{description}</p>
      <div className="grid grid-cols-3 gap-4  ">
        <div className="lg:w-1/3 p-4 border rounded ">
          <span className="font-medium">Completed Days</span>
          <div></div>
        </div>
        <div className="lg:w-1/3 p-4 border rounded">
          <span className="font-medium">Pending Days</span>
          <div></div>
        </div>
        <div className="lg:w-1/3 p-4 border rounded">
          <span className="font-medium">Total Days</span>
          <div></div>
        </div>
      </div>
      <hr />
      <HabbitTrackerCalender
        isCompleted={isCompleted || []}
        startDate={startDate ?? new Date()}
        endDate={endDate || null}
      />
    </div>
  );
}
