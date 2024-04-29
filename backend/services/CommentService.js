const Comment = require("../models/CommentModel");
const Ticket = require("../models/TicketModel");
const User = require("../models/UserModel");
const { transportmail } = require("../utils/email");

const getTicketComments = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const comments = await Comment.find({ ticket: ticketId })
      .populate("user")
      .sort({ createdAt: 1 });
    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { content, status, submitter } = req.body;
    await Comment.create({
      ticket: ticketId,
      content,
      user: req.user._id,
    });

    if (status == "Pending") {
      await Ticket.findByIdAndUpdate(
        { _id: ticketId },
        { status: "In progress" },
        { new: true }
      );
    }

    if (req.user._id != submitter) {
  
      const user = await User.findById(submitter);
  
      const mailContent = {
        from: "oussema.dhraief@gmail.com",
        to: user.email,
        subject: "You have received a response",
        text: `Dear ${user.name},

You have received a response to your ticket ref#${ticketId}, visit http://localhost:3000/dashboard/ticket/${ticketId} to view the discussion.

Best regards,
HelpDesk Team`,
      };

      transportmail.sendMail(mailContent, (error, info) => {
        if (error) {
          res.status(500).json({ message: "Error sending email" });
        } else {
          res.status(201).json({ success: true });
        }
      });
    } else {
      res.status(201).json({ success: true });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  createComment,
  getTicketComments,
  deleteComment,
};
