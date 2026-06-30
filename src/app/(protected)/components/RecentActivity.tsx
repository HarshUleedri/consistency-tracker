import { getUser } from "@/lib/auth";
import { getRecentActivies } from "@/lib/habbit.service";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { CheckCheck } from "lucide-react";
import RecentActivityItem from "./RecentActivityItem";
export default async function RecentActivity() {
  const userId = await getUser();

  const { habbits = [] } = await getRecentActivies(userId || "");

  return (
    <div className="p-2 sm:p-4 border rounded">
      <h3 className=" text-lg">Recent Activity</h3>
      <div className=" gap-4 flex flex-col divide-y divide-dashed">
        {habbits.map((h) => (
          <div key={h.id} className="flex flex-col py-2">
            <p className="text-base flex items-center gap-1.5 ">
              <span>
                <CheckCheck className="size-3.5" />
              </span>
              {h.habbit.title}
            </p>
            <RecentActivityItem createdAt={h.createdAt} />
          </div>
        ))}
        {habbits.length === 0 && (
          <p className="text-base p-4 text-center font-mono  ">
            No Recent Task Yet
          </p>
        )}
      </div>
    </div>
  );
}
