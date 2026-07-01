import { getUserId } from "./auth";
import prisma from "./prisma";

export async function getUserIdDetails() {
  const id = await getUserId();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}
