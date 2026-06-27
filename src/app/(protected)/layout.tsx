import Sidebar from "@/components/common/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  } 
  console.log("working")
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-10 sm:pt-0">{children}</main>
      </div>
    </>
  );
}
