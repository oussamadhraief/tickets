const nodemailer = require('nodemailer');

let transportmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'oussema.dhraief@gmail.com',
      pass: 'aycjkupnudvwlceu'
  }})

  module.exports = { transportmail }