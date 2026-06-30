"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { createHabbit } from "@/lib/habbit.service";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { addDays, normalizeDate } from "@/lib/day";

export default function FormHabbit() {
  const { data: userData } = useSession();
  const router = useRouter();

  const userId = userData?.user.id || "";

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    startDate: Date | null;
    endDate: Date | null;
  }>({ title: "", description: "", startDate: null, endDate: null });

  const [error, setError] = useState<string>("");

  const minEndDate = formData.startDate
    ? addDays(formData.startDate, 7)
    : undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.startDate) {
      setError("Start Date is required");
      return;
    }

    if (formData.endDate && minEndDate && formData.endDate < minEndDate) {
      setError("End Date must be at least 7 days after Start Date");
      return;
    }

    const parsedData = z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Title is required"),
      startDate: z.date({
        error: "Start Date is required",
      }),
      endDate: z.date().nullable(),
    });

    const { data, success, error: zodError } = parsedData.safeParse(formData);

    if (!success) {
      setError(zodError.issues[0].message);
      return;
    }

    const res = await createHabbit(data, userId);

    if (res.success) {
      setFormData({
        title: "",
        description: "",
        startDate: null,
        endDate: null,
      });
      router.replace(`/${res.habbitId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-3xl space-y-6 ">
      <div className="space-y-4">
        <label htmlFor="title" className="">
          Title
        </label>

        <input
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="outline-none px-4 py-1 w-full rounded border "
          type="text"
          name="title"
          id="title"
        />
      </div>
      <div className="space-y-4">
        <label htmlFor="title" className="">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          cols={3}
          className="outline-none px-4 py-1 w-full rounded border "
          name="description"
          id="title"
        />
      </div>
      <div className="space-y-4">
        <label htmlFor="title" className=" ">
          Duration
        </label>
        <div className="flex items-center mt-4 gap-12">
          <div className="space-x-4">
            <label htmlFor="startDate" className="text-sm">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-simple"
                  className="justify-start font-normal"
                >
                  {formData.startDate ? (
                    format(formData.startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.startDate || undefined}
                  disabled={{
                    before: normalizeDate(new Date()),
                  }}
                  onSelect={(date) => {
                    if (!date) return;
                    const today = normalizeDate(new Date());
                    if (date < today) {
                      setError(
                        "Start Date can be only Today's or Date after it.",
                      );
                      return;
                    }

                    const newMinEndDate = addDays(normalizeDate(date), 7);
                    setError("");
                    setFormData((prev) => ({
                      ...prev,
                      startDate: new Date(
                        Date.UTC(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                        ),
                      ),
                      endDate:
                        prev.endDate && prev.endDate < newMinEndDate
                          ? null
                          : prev.endDate,
                    }));
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-x-4">
            <label htmlFor="endDate" className="text-sm">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-simple"
                  className="justify-start font-normal"
                >
                  {formData.endDate ? (
                    format(formData.endDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.endDate || undefined}
                  disabled={
                    minEndDate
                      ? {
                          before: minEndDate,
                        }
                      : {
                          before: addDays(normalizeDate(new Date()), 7),
                        }
                  }
                  onSelect={(date) => {
                    if (!date) return;
                    if (!formData.startDate) {
                      setError("Please select Start Date first");
                      return;
                    }
                    setError("");
                    setFormData((prev) => ({
                      ...prev,
                      endDate: new Date(
                        Date.UTC(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                        ),
                      ),
                    }));
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      {error && <p className="my-4 text-sm text-red-600">{error}</p>}
      <button className="px-4 cursor-pointer py-1.5  sm:mt-4 rounded w-full bg-primary text-secondary text-lg">
        Create
      </button>
    </form>
  );
}
