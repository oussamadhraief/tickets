const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const ticketRoutes = require('./routes/TicketRoutes');
const commentRoutes = require('./routes/CommentRoutes');
const authRoutes = require('./routes/AuthRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://oussamadhraief:b7jpHdoak7GIejm6@helpdesk.xjkm5ij.mongodb.net/")
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/auth', authRoutes);

app.use('/api/tickets', ticketRoutes);

app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});