# Support Ticket System

![Dashboard Preview](./screenshots/dashboard.png)

🌐 **Live Demo:** https://support-ticket-system-client.onrender.com  
📦 **Repository:** https://github.com/Mohamedt19/support-ticket-system

---

## Demo Accounts

**Account 1**  
Email: mohamed@example.com  
Password: 123456

**Account 2**  
Email: sara@example.com  
Password: 123456

---

Support Ticket System is a full‑stack helpdesk application built with **React, TypeScript, Vite, Tailwind CSS, Node.js, Express, Prisma ORM, PostgreSQL, JWT authentication, and Zod validation**.

It is designed as a modern support platform where teams can create, track, and manage support tickets through a clean operational dashboard.

---

# Overview

Support Ticket System is a helpdesk-style application where users can create, manage, and track support tickets through a structured workflow interface.

The project demonstrates practical full‑stack engineering patterns including:

- authenticated user flows
- protected frontend routes
- relational database modeling
- CRUD ticket workflows
- dashboard metrics
- comments and collaboration
- search and filtering
- kanban-style ticket tracking
- modern React + TypeScript frontend architecture

---

# Features

## Authentication
- User registration
- User login
- JWT-based authentication
- Protected frontend routes

## Ticket Management
- Create tickets
- Edit tickets
- Delete tickets
- Ticket status updates
- Ticket priority management
- Category assignment

## Comments
- Add comments to tickets
- View comment history
- Track conversation context

## Ticket Workflow
- Open
- In Progress
- Closed

## Dashboard
Displays system metrics including:

- total tickets
- open tickets
- in progress tickets
- closed tickets
- high priority tickets

## Search and Filtering
- Search tickets by title
- Filter tickets by status

## Kanban Board
- Visual workflow board
- Tickets grouped by status
- Quick workflow overview

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

## Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Zod

---

# Project Structure

```text
support-ticket-system/
├── client/
│   ├── src/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── types/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   ├── routes/
│   │   ├── services/
│   │   └── validators/
│
├── screenshots/
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   ├── tickets.png
│   ├── board.png
│   ├── create-ticket.png
│   ├── ticket-details.png
│   ├── edit-ticket.png
│   └── categories.png
│
└── README.md
```

---

# Pages

- Login
- Register
- Dashboard
- Tickets
- Board (Kanban workflow)
- Create Ticket
- Ticket Details
- Edit Ticket
- Categories

---

# Example Workflows

## Dashboard

Displays support system metrics:

- total tickets
- open tickets
- in progress tickets
- closed tickets
- high priority tickets

This provides quick visibility into ticket workload and system status.

## Tickets

Users can:

- create tickets
- search by title
- filter by status
- open ticket details
- edit tickets
- delete tickets

## Board

Users can:

- view tickets grouped by workflow stage
- quickly understand ticket progress
- navigate to ticket details from board cards

## Ticket Details

Detailed ticket view allows:

- viewing full ticket information
- updating ticket status
- adding comments
- reviewing comment history

## Categories

Users can:

- create ticket categories
- assign categories when creating tickets
- reuse categories across tickets

---

# Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/Mohamedt19/support-ticket-system.git
cd support-ticket-system
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server`:

```env
PORT=3000
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/support_ticket_db"
JWT_SECRET="super_secret_change_me"
CLIENT_URL="http://localhost:5173"
```

Run migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Optional: seed demo data

```bash
npx prisma db seed
```

Start backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:3000
```

---

# Frontend Environment (Production)

Create `.env` inside `client` when deploying:

```env
VITE_API_URL=https://your-backend-url.com
```

---

# Backend Architecture

```text
routes
↓
middleware
↓
controllers
↓
services
↓
Prisma ORM
↓
PostgreSQL
```

This layered architecture separates:

- HTTP routing
- authentication and validation
- business logic
- database access

making the system maintainable and scalable.

---

# Key Learning Areas

This project demonstrates:

- full‑stack CRUD architecture
- authentication and protected routes
- schema validation
- relational data modeling
- service/controller separation
- dashboard-style UI patterns
- kanban-style workflow visualization
- modern React + TypeScript architecture

---

# Screenshots

### Login
![Login](./screenshots/login.png)

### Register
![Register](./screenshots/register.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Tickets
![Tickets](./screenshots/tickets.png)

### Board
![Board](./screenshots/board.png)

### Create Ticket
![Create Ticket](./screenshots/create-ticket.png)

### Ticket Details
![Ticket Details](./screenshots/ticket-details.png)

### Edit Ticket
![Edit Ticket](./screenshots/edit-ticket.png)

### Categories
![Categories](./screenshots/categories.png)

---

# Future Improvements

- ticket assignment
- role-based access control
- attachments
- notifications
- analytics dashboard
- pagination
- improved mobile responsiveness

---

# Author

**Mohamed Tfagha**

GitHub: https://github.com/Mohamedt19  
LinkedIn: https://www.linkedin.com/in/mohamed-tfagha-b4a460147/
