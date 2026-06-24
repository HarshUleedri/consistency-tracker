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

export async function getSingleHabbit(id: string) {
  if (!id) {
    return {
      success: false,
      message: "id is required",
    };
  }

  const data = await prisma.habbit.findUnique({
    where: {
      id,
    },
    include: {
      completions: true,
    },
  });

  if (!data) {
    return {
      success: false,
      message: "failed to get habbit",
    };
  }
  return {
    success: true,
    habbit: data,
  };
}

export async function toggleMark(habbitId: string, date: Date) {
  if (!habbitId) {
    return {
      success: false,
      message: "Habbit id is requeired",
    };
  }

  if (!date) {
    return {
      success: false,
      message: "Date is requeired",
    };
  }

  try {
    const exist = await prisma.habbitCompletion.findUnique({
      where: {
        habbitId_date: {
          habbitId,
          date: new Date(date),
        },
      },
    });

    if (exist) {
      await prisma.habbitCompletion.delete({
        where: { id: exist.id },
      });

      return {
        success: true,
        completed: false,
      };
    }

    await prisma.habbitCompletion.create({
      data: {
        habbitId,
        date: new Date(date),
      },
    });

    return {
      success: true,
      completed: true,
    };
  } catch (error) {
    throw new Error("Failed to Mark completion");
  }
}
