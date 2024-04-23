const express = require('express');
const router = express.Router();
const ticketService = require('../services/TicketService');
const verifyToken = require('../middleware/verifyToken');

router.get('/', ticketService.getAllTickets);
router.get('/stats', ticketService.getTicketStats);
router.get('/total', ticketService.getTotalTickets);
router.get('/pending', ticketService.getTotalPendingTickets);
router.get('/inprogress', ticketService.getTotalInProgressTickets);
router.get('/resolved', ticketService.getTotalResolvedTickets);
router.get('/search', ticketService.searchTickets)
router.get('/user/:id', verifyToken, ticketService.getUserTickets);
router.get('/:id', ticketService.getSingleTicket)
router.post('/', verifyToken, ticketService.createTicket);
router.put('/:id', ticketService.updateTicket)
router.put('/status/:id', ticketService.updateTicketStatus)

module.exports = router;
