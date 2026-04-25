import validator from "validator";

export function validateContact({ name, email, message, company }) {
  // honeypot (bots will fill this)
  if (company) {
    return "Spam detected";
  }

  if (!name || !email || !message) {
    return "All fields are required";
  }

  if (name.length < 2 || name.length > 50) {
    return "Invalid name";
  }

  // Use validator library for robust email validation
  if (!validator.isEmail(email)) {
    return "Invalid email";
  }

  // Block common XSS patterns
  if (validator.contains(message, "<script") || validator.contains(message, "javascript:")) {
    return "Invalid content detected";
  }

  if (message.length < 10 || message.length > 1000) {
    return "Message length invalid";
  }

  return null;
}