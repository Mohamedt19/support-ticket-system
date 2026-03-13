import {
    createTicket,
    findTickets,
    findTicketById,
    updateTicket,
    deleteTicket,
    getDashboardSummary,
  } from "../services/ticketService.js";
  
  export async function postTicket(req, res, next) {
    try {
      const ticket = await createTicket(req.body, req.user.userId);
      res.status(201).json(ticket);
    } catch (err) {
      next(err);
    }
  }
  
  export async function getTickets(req, res, next) {
    try {
      const tickets = await findTickets({
        userId: req.user.userId,
        status: req.query.status,
      });
      res.status(200).json(tickets);
    } catch (err) {
      next(err);
    }
  }
  
  export async function getTicket(req, res, next) {
    try {
      const id = Number(req.params.id);
      const ticket = await findTicketById(id, req.user.userId);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.status(200).json(ticket);
    } catch (err) {
      next(err);
    }
  }
  
  export async function patchTicket(req, res, next) {
    try {
      const id = Number(req.params.id);
      const ticket = await updateTicket(id, req.body, req.user.userId);
      res.status(200).json(ticket);
    } catch (err) {
      next(err);
    }
  }
  
  export async function removeTicket(req, res, next) {
    try {
      const id = Number(req.params.id);
      await deleteTicket(id, req.user.userId);
      res.status(200).json({ message: "Ticket deleted" });
    } catch (err) {
      next(err);
    }
  }
  
  export async function getSummary(req, res, next) {
    try {
      const summary = await getDashboardSummary(req.user.userId);
      res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  }