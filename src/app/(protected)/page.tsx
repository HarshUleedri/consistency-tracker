import CurrentStreak from "./components/CurrentStreak";
import DashboardGreetings from "./components/DashboardGreetings";
import RecentActivity from "./components/RecentActivity";
import TasksProgressForToday from "./components/TasksProgressForToday";
import TodaysHabbits from "./components/TodaysHabbits";

export default async function Home() {
  return (
    <div className="p-4 sm:p-8 space-y-12">
      <DashboardGreetings />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-6 gap-4">
            <TasksProgressForToday />
            <CurrentStreak />
          </div>
           <TodaysHabbits />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
