const express = require('express');
const router = express.Router();
const commentService = require('../services/CommentService');
const verifyToken = require('../middleware/verifyToken');

router.get('/:ticketId', verifyToken, commentService.getTicketComments);
router.post('/:ticketId', verifyToken, commentService.createComment);
router.delete('/:id', commentService.deleteComment)

module.exports = router;
