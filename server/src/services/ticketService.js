import prisma from "../prisma/client.js";

export async function createTicket(data, userId) {
  return prisma.ticket.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority ?? "medium",
      categoryId: data.categoryId ?? null,
      authorId: userId,
    },
    include: {
      category: true,
    },
  });
}

export async function findTickets({ userId, status }) {
  return prisma.ticket.findMany({
    where: {
      authorId: userId,
      ...(status ? { status } : {}),
    },
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function findTicketById(id, userId) {
  return prisma.ticket.findFirst({
    where: {
      id,
      authorId: userId,
    },
    include: {
      category: true,
      comments: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export async function updateTicket(id, data, userId) {
  const ticket = await prisma.ticket.findFirst({
    where: { id, authorId: userId },
  });

  if (!ticket) {
    const err = new Error("Ticket not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.ticket.update({
    where: { id },
    data,
    include: { category: true },
  });
}

export async function deleteTicket(id, userId) {
  const ticket = await prisma.ticket.findFirst({
    where: { id, authorId: userId },
  });

  if (!ticket) {
    const err = new Error("Ticket not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.ticket.delete({
    where: { id },
  });
}

export async function getDashboardSummary(userId) {
  const [total, open, inProgress, closed, highPriority] = await Promise.all([
    prisma.ticket.count({ where: { authorId: userId } }),
    prisma.ticket.count({ where: { authorId: userId, status: "open" } }),
    prisma.ticket.count({ where: { authorId: userId, status: "in_progress" } }),
    prisma.ticket.count({ where: { authorId: userId, status: "closed" } }),
    prisma.ticket.count({ where: { authorId: userId, priority: "high" } }),
  ]);

  return {
    totalTickets: total,
    openTickets: open,
    inProgressTickets: inProgress,
    closedTickets: closed,
    highPriorityTickets: highPriority,
  };
}