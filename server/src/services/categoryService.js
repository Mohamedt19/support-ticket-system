import prisma from "../prisma/client.js";

export async function createCategory(data) {
  return prisma.category.create({ data });
}

export async function findCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}