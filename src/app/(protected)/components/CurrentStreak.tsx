// import { getUser } from "@/lib/auth";
// import { getHabbitsWithCompletion,  } from "@/lib/habbit.service";

// export default async function CurrentStreak() {
//   const userId = await getUser();
//   const { habbits } = await getHabbitsWithCompletion(userId || "");

//   const completions =
//     habbits?.map((h) =>
//       h.completions.map((c) => c.date.setHours(0, 0, 0, 0)),
//     ) || [];
//   console.log(habbits?.map((h) => h.completions.map((c) => c.date.getDate())));

//   const dateConter = new Date(new Date().setHours(0, 0, 0, 0));

//   let streak = 0;
//   let conti = true;
//   while (true) {
//     if (conti) {
//       for (let i = 0; i < completions.length; i++) {
//         const uniquecomle = new Set(completions[i]);
//         if (uniquecomle.has(dateConter.getTime())) {
//           conti = true;
//         } else {
//           conti = false;
//           break;
//         }
//       }
//       if (conti) {
//         streak++;
//         dateConter.setDate(dateConter.getDate() - 1);
//       }
//     } else {
//       break;
//     }
//   }

//   return (
//     <div>
//       <h3>Current Streak</h3>
//       <span>{streak}</span>
//     </div>
//   );
// }

import { getUser } from "@/lib/auth";
import { getHabbitsWithCompletion } from "@/lib/habbit.service";

export default async function CurrentStreak() {
  const userId = await getUser();
  const { habbits = [] } = await getHabbitsWithCompletion(userId || "");

  // Prepare completion sets once
  const preparedHabits = habbits.map((habit) => ({
    ...habit,
    completionSet: new Set(
      habit.completions.map((completion) => {
        const date = new Date(completion.date);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      }),
    ),
  }));

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  let streak = 0;

  while (true) {
    // Habits that were active on this day
    const activeHabits = preparedHabits.filter((habit) => {
      const start = new Date(habit.startDate);
      start.setHours(0, 0, 0, 0);

      const end = habit.endDate ? new Date(habit.endDate) : null;

      if (end) {
        end.setHours(0, 0, 0, 0);
      }

      return (
        start.getTime() <= currentDate.getTime() &&
        (!end || end.getTime() >= currentDate.getTime())
      );
    });

    // Optional:
    // If there were no active habits on this day,
    // skip the day instead of breaking.
    if (activeHabits.length === 0) {
      currentDate.setDate(currentDate.getDate() - 1);
      continue;
    }

    const perfectDay = activeHabits.every((habit) =>
      habit.completionSet.has(currentDate.getTime()),
    );

    if (!perfectDay) {
      break;
    }

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return (
    <div className="border rounded p-2 sm:p-4">
      <h3 className="text-lg">Current Streak</h3>
      <span className="text-2xl sm:text-xl">🔥{streak}</span>
    </div>
  );
}
