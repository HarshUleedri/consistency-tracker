"use client";
import { useSession } from "@/lib/auth-client";
import { geteHabbits } from "@/lib/habbit.service";
import { Menu, PanelLeft, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Sidebar() {
  const { data } = useSession();
  const { id: paramId } = useParams();

  const { image, name, id } = data?.user || {};

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (window.innerWidth < 640) {
      return false;
    } else {
      return true;
    }
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [habbitList, setHabbitList] = useState<
    { id: string; title: string; description: string; createdAt: Date }[]
  >([]);

  useEffect(() => {
    (async function () {
      const result = await geteHabbits(id || "");
      setHabbitList(result?.habbits || []);
    })();
  }, [id]);

  return (
    <>
      <aside
        className={`${isOpen ? "sm:w-52 fixed z-40 w-3/4 sm:relative " : "w-12 hidden sm:flex "} bg-background`}
      >
        <div
          className={`max-h-screen  h-screen  flex flex-col group/toggle  border-r border-muted-foreground/30 w-full transition-[width] pt-12 sm:pt-0 sm:sticky sm:top-0  duration-200 ease-in-out group `}
        >
          {/* headers */}
          <div
            className={`sm:flex items-center border-b  hidden  border-muted-foreground/20 p-2`}
          >
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className=" w-8 h-8  flex items-center justify-center  shrink-0 "
            >
              {isHovered && !isOpen ? (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`hover:bg-accent p-1 rounded `}
                >
                  <PanelLeft className={`size-4 text-primary  `} />
                </button>
              ) : (
                <Link href={"/"} className={`text-sm font-medium shrink-0 `}>
                  HU
                </Link>
              )}
            </div>
            {isOpen && (
              <button
                className="shrink-0 ml-auto flex items-center justify-center cursor-pointer hover:bg-accent p-1 rounded"
                onClick={() => setIsOpen(!isOpen)}
              >
                <PanelLeft className={`size-4  `} />
              </button>
            )}
          </div>
          {/* links */}
          <Link
            className="flex items-center  h-9 w-auto hover:bg-accent gap-2  p-1.5 text-sm hover:text-foreground  overflow-hidden"
            href={"/create"}
            onClick={() => {
              if (window.innerWidth < 640) setIsOpen(false);
            }}
          >
            <span className="h-8 w-8 flex  shrink-0 p-1  items-center justify-center rounded ">
              <Plus className="size-4 " />
            </span>
            <span
              className={`text-sm tracking-tight whitespace-nowrap shrink-0 overflow-hidden ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}
            >
              Create
            </span>
          </Link>

          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="sm:flex-1 h-full"
          >
            {isOpen && (
              <div className="mt-4">
                <h2 className="text-xs  px-4 ">Recent</h2>
                <hr className="mt-2" />
                <div className="flex flex-col overflow-y-auto overflow-x-hidden ">
                  {habbitList.map(({ title, id }) => (
                    <Link
                      className={`hover:bg-accent  ${paramId === id && "bg-accent"} px-4 shrink-0`}
                      href={`/${id}`}
                      key={id}
                      onClick={() => {
                        if (window.innerWidth < 640) setIsOpen(false);
                      }}
                    >
                      <span className="overflow-hidden whitespace-nowrap text-xs">
                        {title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* footer */}
          <div className=" border-t shrink-0">
            <ThemeToggle isOpen={isOpen} />
            <div className="h-11 border-t   mt-auto flex items-center hover:bg-accent cursor-pointer gap-1 p-2 overflow-hidden ">
              <span className="w-8 h-8  flex items-center shrink-0 justify-center">
                <Image
                  width={100}
                  height={100}
                  src={
                    image ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name || "default")}`
                  }
                  alt={`avatar`}
                  className="size-7  rounded-full"
                  unoptimized
                />
              </span>
              <div
                className={` ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"} shrink-0`}
              >
                <p className="text-sm font-medium truncate leading-tight whitespace-nowrap">
                  {name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="sm:hidden w-screen overflow-hidden z-50 border-b fixed top-0 left-0">
        <button
          className="  bg-background  px-4 py-2 w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="size-6 p-0" />
        </button>
      </div>
    </>
  );
}
