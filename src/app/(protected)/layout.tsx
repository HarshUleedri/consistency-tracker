import Sidebar from "@/components/common/Sidebar";
import { auth, getUserId } from "@/lib/auth";
import { getUserIdDetails } from "@/lib/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserIdDetails();

  if (!user) {
    redirect("/signin");
  }

  if (!user.isOnboarded || !user.countryCode) {
    redirect("/complete-profile");
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-10 sm:pt-0">{children}</main>
      </div>
    </>
  );
}
