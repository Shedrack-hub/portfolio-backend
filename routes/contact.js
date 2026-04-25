import express from "express";
import { contactLimiter } from "../middleware/rateLimiter.js";
import { validateContact } from "../utils/validate.js";
import { transporter } from "../config/mailer.js";

const router = express.Router();

router.post("/", contactLimiter, async (req, res) => {
  try {
    const { name, email, message, company } = req.body;

    const error = validateContact({ name, email, message, company });

    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.json({ success: true });

  } catch (err) {
    console.log("EMAIL ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

export default router;