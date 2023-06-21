require("dotenv").config();
module.exports = {
  MONGO_URI: process.env.MONGOLAB_URI || "mongodb://localhost:27017/DB",
  PORT: process.env.PORT || 4000,
  METERED_DOMAIN: process.env.METERED_DOMAIN || "",
  METERED_SECRET_KEY: process.env.METERED_SECRET_KEY || "",
  SESSION_SECRET : process.env.SESSION_SECRET,
  JWT_SECRET : process.env.JWT_SECRET,
  EMAIL : process.env.EMAIL,
  EMAIL_PASS : process.env.EMAIL_PASS,
  CLIENT_ID : process.env.CLIENT_ID,
  CLIENT_SECRET : process.env.CLIENT_SECRET,
  REDIRECT_URIS : process.env.REDIRECT_URIS,
};