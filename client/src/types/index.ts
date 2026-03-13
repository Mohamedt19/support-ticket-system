export type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
  };
  
  export type Category = {
    id: number;
    name: string;
    createdAt: string;
  };
  
  export type CommentUser = {
    id: number;
    name: string;
    email: string;
  };
  
  export type Comment = {
    id: number;
    content: string;
    createdAt: string;
    user: CommentUser;
  };
  
  export type TicketStatus = "open" | "in_progress" | "closed";
  export type TicketPriority = "low" | "medium" | "high";
  
  export type Ticket = {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt: string;
    updatedAt: string;
    category: Category | null;
    comments?: Comment[];
  };
  
  export type DashboardSummary = {
    totalTickets: number;
    openTickets: number;
    inProgressTickets: number;
    closedTickets: number;
    highPriorityTickets: number;
  };
  
  export type LoginResponse = {
    token: string;
  };