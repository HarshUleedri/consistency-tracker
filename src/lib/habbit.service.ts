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
export async function geteHabbits(userId: string) {
  if (!userId) {
    return {
      success: false,
      message: "userId is required",
    };
  }

  const data = await prisma.habbit.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
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
    habbits: data,
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
export async function getTodaysHabbits(userId: string) {
  if (!userId) {
    return {
      success: false,
      message: "userId is required",
    };
  }

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const data = await prisma.habbit.findMany({
    where: {
      userId,
      startDate: {
        lte: today,
      },
      OR: [
        {
          endDate: null,
        },
        {
          endDate: {
            gte: today,
          },
        },
      ],
    },
    include: {
      completions: {
        where: {
          date: today,
        },
      },
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
    habbits: data,
  };
}

export async function getRecentActivies(userId: string) {
  if (!userId) {
    return {
      success: false,
      message: "userId is required",
    };
  }

  const data = await prisma.habbitCompletion.findMany({
    where: {
      habbit: {
        userId,
      },
    },
    include: {
      habbit: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  if (!data) {
    return {
      success: false,
      message: "failed to get habbit",
    };
  }
  return {
    success: true,
    habbits: data,
  };
}
export async function getHabbitsWithCompletion(userId: string) {
  if (!userId) {
    return {
      success: false,
      message: "userId is required",
    };
  }
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const data = await prisma.habbit.findMany({
    where: {
      userId,
      startDate: {
        lte: today,
      },
      OR: [
        {
          endDate: null,
        },
        {
          endDate: {
            gte: today,
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      completions: true,
      endDate: true,
      startDate: true,
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
    habbits: data,
  };
}
