"use client";
import { COUNTRIES } from "@/lib/countries";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Loader2Icon, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function SearchDropdown() {
  const [input, setInput] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeElRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedValue, setSelectedValue] = useState({
    name: "Select Your Country",
    code: "",
  });

  const searchedItem = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(input.toLowerCase()),
  );

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user/complete-profile", {
        method: "POST",
        body: JSON.stringify({
          countryCode: selectedValue.code,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
        headers: {
          "content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return setError("Something went wrong try again");
      }

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setCurrentIndex((prev) =>
          prev === 0 ? searchedItem.length - 1 : prev - 1,
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setCurrentIndex((prev) =>
          prev === searchedItem.length - 1 ? 0 : prev + 1,
        );
        break;
      case "Enter":
        e.preventDefault();
        setSelectedValue(searchedItem[currentIndex]);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (!activeElRef.current) return;
    activeElRef.current?.scrollIntoView({
      block: "center",
    });
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <label className="text-base font-medium">Search Country</label>
      <Popover >
        <PopoverTrigger className="w-full mb-2">
          <button className="border rounded px-4 py-0.5 text-sm w-full text-start ">
            {selectedValue.name}
          </button>
        </PopoverTrigger>
        <PopoverContent className="max-h-72 overflow-y-scroll p-0 ">
          <div className="w-full rounded border">
            <div
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="flex gap-2 items-center border-b py-2 px-2 sticky top-0 bg-background"
            >
              <Search className="text-primary size-6.5 p-1  rounded" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="India"
                className=" outline-none border rounded font-medium px-4 py-0.5 text-sm w-full "
              />
            </div>
            <div>
              {searchedItem.map((country, idx) => (
                <div
                  className={`px-4 py-2 hover:bg-secondary text-base ${currentIndex === idx && "bg-secondary"}`}
                  key={idx}
                  onClick={() => setSelectedValue(country)}
                  ref={currentIndex === idx ? activeElRef : null}
                  onMouseEnter={() => setCurrentIndex(idx)}
                  onMouseLeave={() => setCurrentIndex(0)}
                >
                  {country.name}
                </div>
              ))}
              {searchedItem.length === 0 && (
                <div className="text-sm text-center p-4">No Found</div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-600 text-start py-1">{error}</p>}
      <Button
        onClick={handleContinue}
        disabled={!selectedValue.code || isLoading}
        className="w-full rounded disabled:cursor-not-allowed cursor-pointer disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2Icon className="size-5 animate-spin" />
        ) : (
          "Continue"
        )}
      </Button>
    </div>
  );
}
