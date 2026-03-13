import {
    createComment,
    findCommentsByTicket,
  } from "../services/commentService.js";
  
  export async function postComment(req, res, next) {
    try {
      const ticketId = Number(req.params.id);
      const comment = await createComment(ticketId, req.body, req.user.userId);
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }
  
  export async function getComments(req, res, next) {
    try {
      const ticketId = Number(req.params.id);
      const comments = await findCommentsByTicket(ticketId, req.user.userId);
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  }