"use client";
import { useSession } from "@/lib/auth-client";
import { PanelLeft, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const { data } = useSession();

  const { image, name } = data?.user || {};

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <aside
      className={`min-h-screen flex flex-col group/toggle relative  border-r border-muted-foreground/30 ${isOpen ? "w-52" : "w-12"} transition-[width]  duration-200 ease-in-out group `}
    >
      {/* headers */}
      <div
        className={`flex items-center border-b  border-muted-foreground/20 p-2`}
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
        className="flex items-center h-9 w-auto hover:bg-accent gap-2  p-1.5 text-sm hover:text-foreground  overflow-hidden"
        href={"/create"}
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
        className="flex-1  "
      ></div>

      {/* footer */}
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
    </aside>
  );
}
