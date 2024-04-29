const express = require("express");
const router = express.Router();
const ticketService = require("../services/TicketService");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, ticketService.getAllTickets);
router.get("/stats", verifyToken, ticketService.getTicketStats);
router.get("/total", verifyToken, ticketService.getTotalTickets);
router.get("/pending", verifyToken, ticketService.getTotalPendingTickets);
router.get("/inprogress", verifyToken, ticketService.getTotalInProgressTickets);
router.get("/resolved", verifyToken, ticketService.getTotalResolvedTickets);
router.get("/search", verifyToken, ticketService.searchTickets);
router.get("/user/:id", verifyToken, ticketService.getUserTickets);
router.get("/:id", ticketService.getSingleTicket);
router.post("/", verifyToken, ticketService.createTicket);
router.put("/:id", ticketService.updateTicket);
router.put("/status/:id", ticketService.updateTicketStatus);
router.delete("/:id", ticketService.deleteTicket);

module.exports = router;
