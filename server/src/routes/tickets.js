import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import {
  createTicketSchema,
  updateTicketSchema,
} from "../validators/ticketSchemas.js";
import {
  postTicket,
  getTickets,
  getTicket,
  patchTicket,
  removeTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", auth, getTickets);
router.post("/", auth, validate(createTicketSchema), postTicket);
router.get("/:id", auth, getTicket);
router.patch("/:id", auth, validate(updateTicketSchema), patchTicket);
router.delete("/:id", auth, removeTicket);

export default router;