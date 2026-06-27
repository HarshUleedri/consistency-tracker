import DashboardGreetings from "./components/DashboardGreetings";

export default async function Home() {
  return (
    <div className="p-4 sm:p-8">
      <DashboardGreetings />
    </div>
  );
}
