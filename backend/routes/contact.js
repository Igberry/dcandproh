// Nodemailer config
const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer config
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'false',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_USER,
      subject: `New Contact Message from ${name}`,
      text: `You received a new message from your portfolio site:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      replyTo: email
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong. Try again later.' });
  }
});

module.exports = router;
