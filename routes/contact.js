import express from "express";
import { transporter } from "../config/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Check env
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email configuration missing"
      });
    }

    // Send email
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `
    });

    return res.json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
});

export default router;