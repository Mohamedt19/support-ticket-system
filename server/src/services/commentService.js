import prisma from "../prisma/client.js";

export async function createComment(ticketId, data, userId) {
  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId, authorId: userId },
  });

  if (!ticket) {
    const err = new Error("Ticket not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.comment.create({
    data: {
      content: data.content,
      ticketId,
      userId,
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });
}

export async function findCommentsByTicket(ticketId, userId) {
  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId, authorId: userId },
  });

  if (!ticket) {
    const err = new Error("Ticket not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.comment.findMany({
    where: { ticketId },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}