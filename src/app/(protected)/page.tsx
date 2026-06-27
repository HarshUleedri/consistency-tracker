import DashboardGreetings from "./components/DashboardGreetings";
import TodaysHabbits from "./components/TodaysHabbits";

export default async function Home() {
  return (
    <div className="p-4 sm:p-8">
      <DashboardGreetings />
      <TodaysHabbits />
    </div>
  );
}
