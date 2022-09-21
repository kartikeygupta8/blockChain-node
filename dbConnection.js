const mongoose = require("mongoose");
require("dotenv").config();

// Getting Username and Password from .env
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Set up default mongoose connection
const mongoDBuri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.phcykmb.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoDBuri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.error(error.message));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
