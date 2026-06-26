import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Logout({ isOpen }: { isOpen?: boolean }) {
  const router = useRouter();

  const handleLogOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/signin"); // redirect to login page
        },
      },
    });
  };

  return (
    <Button
      onClick={handleLogOut}
      variant="ghost"
      className={`flex  w-full rounded-none border-none  justify-normal  `}
    >
      <LogOut className="h-[1.2rem] w-[1.2rem] m-1.5" />
      <span className="sr-only">Log out</span>
      {isOpen && (
        <p className="text-xs tracking-tight whitespace-nowrap shrink-0 pl-1   overflow-hidden">
          Log Out
        </p>
      )}
    </Button>
  );
}
