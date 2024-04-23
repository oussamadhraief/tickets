const Ticket = require("../models/TicketModel");

async function getAllTickets(req, res) {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({ success: true, tickets });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function getTotalTickets(req, res) {
  try {
    const numberOfTickets = await Ticket.countDocuments();
    res.status(200).json({ success: true, numberOfTickets });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function getTotalPendingTickets(req, res) {
  try {
    const numberOfTickets = await Ticket.countDocuments({ status: 'Pending' });
    res.status(200).json({ success: true, numberOfTickets });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function getTotalInProgressTickets(req, res) {
  try {
    const numberOfTickets = await Ticket.countDocuments({ status: 'In progress' });
    res.status(200).json({ success: true, numberOfTickets });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function getTotalResolvedTickets(req, res) {
  try {
    const numberOfTickets = await Ticket.countDocuments({ status: 'Resolved' });
    res.status(200).json({ success: true, numberOfTickets });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function getUserTickets(req, res) {
  try {
    const id = req.params.id;
    const tickets = await Ticket.find({ 
      $and: [
        { _id: { $ne: id } },
        { user: req.user._id }
      ]
    });
    res.status(200).json({ success: true, tickets });
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ success: false, message: "Failed to fetch tickets" });
  }
}


async function createTicket(req, res) {
  try {
    const { name, email, type, subject, message, status } = req.body;
    const ticket = await Ticket.create({ name, email, type, subject, message, status, user: req.user._id });
    res.status(201).json({ success: true, ticket });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getSingleTicket(req, res) {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate('user');
    res.status(200).json({ success: true, ticket });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function updateTicket(req, res) {

  try {
    const { name, email, type, subject, message } = req.body;
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate({ id }, { name, email, type, subject, message, status, user: req.user._id }, { new: true })
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
}

async function updateTicketStatus(req, res) {

  try {
    const { status } = req.body
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate({ id }, { status }, { new: true })
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
}

async function searchTickets(req, res) {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query parameter is required' });
    }

    const regex = new RegExp(query, 'i');
    
    const tickets = await Ticket.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user' 
      },
      {
        $match: {
          $or: [
            { type: { $regex: regex } },
            { subject: { $regex: regex } },
            { message: { $regex: regex } },
            { status: { $regex: regex } },
            { 'user.name': { $regex: regex } },
            { 'user.username': { $regex: regex } },
            { 'user.email': { $regex: regex } },
            { 'user.country': { $regex: regex } },
            { 'user.address': { $regex: regex } },
            { 'user.phone': { $regex: regex } },
            { 'user.language': { $regex: regex } },
          ]
        }
      }
    ]);
    
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

async function getTicketStats(req,res) {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    startDate.setHours(0, 0, 0, 0); 

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); 

    
    const result = await Ticket.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day"
                }
              }
            }
          },
          count: 1
        }
      },
      {
        $sort: { date: -1 }
      }
    ]);
    
    
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }

}

module.exports = {
  getAllTickets,
  getUserTickets,
  createTicket,
  getSingleTicket,
  updateTicket,
  updateTicketStatus,
  searchTickets,
  getTicketStats,
  getTotalResolvedTickets,
  getTotalInProgressTickets,
  getTotalPendingTickets,
  getTotalTickets,
};
