import SearchDropdown from "@/components/common/SearchDropdown";
import { getUserIdDetails } from "@/lib/user";

export default async function page() {
  const user = await getUserIdDetails();

  if (!user) {
    return <>Loading...</>;
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1 className="text-3xl mb-6   ">Complete your Profile</h1>

      <div className="p-4 rounded border w-1/4 bg-background">
        <div className=" text-xl font-medium">
          Welcome, {user.name} <span>👋</span>
        </div>
        <p className="mb-4 text-sm">
          Before you continue, We need one more Information
        </p>
        <SearchDropdown />
      </div>
    </div>
  );
}
