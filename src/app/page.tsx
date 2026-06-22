import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if(!user) {
    redirect('/signin')
  }

  return (
    <div className="text-5xl">
      Home
      <Button>click</Button>
    </div>
  );
}
