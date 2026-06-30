export default function DashboardGreetings() {
  const currentHour = new Date().getHours();
  return (
    <div className="space-y-2">
      <p className="text-xs font-mono font-extrabold   ">
        {new Date().toDateString()}
      </p>
      <h3>
        {currentHour < 12
          ? "Good Morning"
          : currentHour < 18
            ? "Good Afternoon"
            : "Good Evening"}
        <span className="">👋</span>
      </h3>

      <p className="font-mono text-sm font-extralight">
        Consistancy is the key to master anything.
      </p>
    </div>
  );
}
