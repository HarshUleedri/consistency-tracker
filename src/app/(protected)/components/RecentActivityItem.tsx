"use Client";

import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export default function RecentActivityItem({ createdAt }: { createdAt: Date }) {
  function formatRecentActivity(date: Date) {
    const relative = formatDistanceToNow(date, {
      addSuffix: true,
    });

    if (isToday(date)) {
      return ` Completed Today •  ${format(date, "h:mm a")} (${relative})`;
    }

    if (isYesterday(date)) {
      return `Completed Yesterday • ${format(date, "h:mm a")}`;
    }

    return `Completed ${format(date, "dd MMM")} • ${relative}`;
  }
  return (
    <span className="text-[10px]  font-mono">
      {formatRecentActivity(createdAt)}
    </span>
  );
}
