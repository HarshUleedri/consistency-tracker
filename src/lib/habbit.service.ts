"use server";

import prisma from "./prisma";

export async function createHabbit(
  data: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date | null;
  },
  userId: string,
) {
  const { description, startDate, title, endDate } = data;

  if (!userId) {
    return {
      success: false,
      message: "user id requeired",
    };
  }

  try {
    const data = await prisma.habbit.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        userId,
      },
    });

    if (!data) {
      return {
        success: false,
        message: "field to create data",
      };
    }
    return {
      success: true,
      habbitId: data.id,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
