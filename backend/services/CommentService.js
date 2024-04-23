const Comment = require("../models/CommentModel");
const Ticket = require("../models/TicketModel");

const getTicketComments = async (req, res) => {
    try {
        const { ticketId } = req.params
        const comments = await Comment.find({ ticket: ticketId }).populate('user').sort({ createdAt: 1 });
        res.status(200).json({ success: true, comments });
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
}

const createComment = async (req, res) => {
  try {
    const { ticketId } = req.params
    const { content, status } = req.body;
    await Comment.create({
      ticket: ticketId,
      content,
      user: req.user._id,
    });

    if(status == 'Pending') {
        await Ticket.findByIdAndUpdate({ _id: ticketId }, { status: 'In progress' }, { new: true })
    }

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedComment = await Comment.findByIdAndDelete(id);
  
      if (!deletedComment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
module.exports = {
  createComment,
  getTicketComments,
  deleteComment
};
