import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clean old data in correct order
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Passwords
  const passwordHash1 = await bcrypt.hash("123456", 10);
  const passwordHash2 = await bcrypt.hash("123456", 10);

  // Users
  const [mohamed, sara] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Mohamed",
        email: "mohamed@example.com",
        password: passwordHash1,
      },
    }),
    prisma.user.create({
      data: {
        name: "Sara",
        email: "sara@example.com",
        password: passwordHash2,
      },
    }),
  ]);

  // Categories
  const [bug, feature, billing, uiux] = await Promise.all([
    prisma.category.create({ data: { name: "Bug" } }),
    prisma.category.create({ data: { name: "Feature Request" } }),
    prisma.category.create({ data: { name: "Billing" } }),
    prisma.category.create({ data: { name: "UI/UX" } }),
  ]);

  // Tickets for Mohamed
  const mohamedTickets = await Promise.all([
    prisma.ticket.create({
      data: {
        title: "Login fails on Safari",
        description: "Users report that login does not complete on Safari 17 after submitting the form.",
        status: "open",
        priority: "high",
        authorId: mohamed.id,
        categoryId: bug.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: "Add export to CSV",
        description: "Support team wants to export filtered tickets to CSV for weekly reporting.",
        status: "in_progress",
        priority: "medium",
        authorId: mohamed.id,
        categoryId: feature.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: "Billing page shows wrong amount",
        description: "Invoice summary sometimes displays a duplicated charge for annual plans.",
        status: "open",
        priority: "high",
        authorId: mohamed.id,
        categoryId: billing.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: "Dashboard cards not responsive",
        description: "Metric cards overflow and stack poorly on small laptop screens.",
        status: "in_progress",
        priority: "low",
        authorId: mohamed.id,
        categoryId: uiux.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: "Dark mode support request",
        description: "Users requested dark mode for dashboard, tickets list, and ticket details.",
        status: "closed",
        priority: "low",
        authorId: mohamed.id,
        categoryId: feature.id,
      },
    }),
  ]);

  // Tickets for Sara
  const saraTickets = await Promise.all([
    prisma.ticket.create({
      data: {
        title: "Password reset email delayed",
        description: "Reset emails arrive 10 to 15 minutes late for some users during peak traffic.",
        status: "closed",
        priority: "medium",
        authorId: sara.id,
        categoryId: bug.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: "Refund status unclear in billing history",
        description: "Refunded invoices should have a clearer visual status label in billing history.",
        status: "open",
        priority: "medium",
        authorId: sara.id,
        categoryId: billing.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: "Improve ticket search relevance",
        description: "Search results should rank title matches above description matches.",
        status: "in_progress",
        priority: "medium",
        authorId: sara.id,
        categoryId: feature.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: "Comment input loses focus",
        description: "Typing in the comment field occasionally loses focus after state updates.",
        status: "open",
        priority: "high",
        authorId: sara.id,
        categoryId: bug.id,
      },
    }),
    prisma.ticket.create({
      data: {
        title: "Category page needs spacing improvements",
        description: "The category form and list need better spacing and visual grouping.",
        status: "closed",
        priority: "low",
        authorId: sara.id,
        categoryId: uiux.id,
      },
    }),
  ]);

  // Comments
  await prisma.comment.createMany({
    data: [
      {
        content: "Confirmed on Safari. Reproduced on macOS 14.",
        ticketId: mohamedTickets[0].id,
        userId: mohamed.id,
      },
      {
        content: "Might be related to cookie handling after redirect.",
        ticketId: mohamedTickets[0].id,
        userId: sara.id,
      },
      {
        content: "CSV export should include title, status, priority, and category.",
        ticketId: mohamedTickets[1].id,
        userId: mohamed.id,
      },
      {
        content: "Finance team confirmed the duplicated charge issue.",
        ticketId: mohamedTickets[2].id,
        userId: sara.id,
      },
      {
        content: "A responsive card grid should fix most layout issues.",
        ticketId: mohamedTickets[3].id,
        userId: mohamed.id,
      },
      {
        content: "Dark mode draft is ready for internal review.",
        ticketId: mohamedTickets[4].id,
        userId: sara.id,
      },
      {
        content: "Delivery service logs show noticeable delays during peak traffic.",
        ticketId: saraTickets[0].id,
        userId: sara.id,
      },
      {
        content: "Billing history should show refunded, pending, and failed states more clearly.",
        ticketId: saraTickets[1].id,
        userId: mohamed.id,
      },
      {
        content: "Search ranking can be improved with weighted title matching.",
        ticketId: saraTickets[2].id,
        userId: sara.id,
      },
      {
        content: "I noticed the focus issue after adding a comment and reloading the ticket.",
        ticketId: saraTickets[3].id,
        userId: mohamed.id,
      },
    ],
  });

  console.log("Seed completed.");
  console.log("");
  console.log("Demo users:");
  console.log("1) mohamed@example.com / 123456");
  console.log("2) sara@example.com / 123456");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });