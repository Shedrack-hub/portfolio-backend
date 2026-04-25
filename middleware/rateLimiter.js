import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 30, // 30 requests per minute (relaxed for development)
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});