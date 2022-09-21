const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const events = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
    betAmount: {
      type: String,
      required: true,
    },
    userChoice: {
      type: Number,
      requires: true,
    },
    finalNumber: {
      type: String,
      requires: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Events", events);

module.exports = Event;
