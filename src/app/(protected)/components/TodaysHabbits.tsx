import { getUser } from "@/lib/auth";

import TodaysHabbitsItems from "./TodaysHabbitsItems";

export default async function TodaysHabbits() {
  const userId = await getUser();

  return (
    <div>
      <h2 className="text-xl mb-4">Todays Task </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 border rounded p-2 sm:p-4 ">
        <TodaysHabbitsItems userId={userId || ""} />
      </div>
      {/* <hr className="text-muted border" /> */}
    </div>
  );
}
