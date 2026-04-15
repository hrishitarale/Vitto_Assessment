// models/Application.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    ownerName: String,
    pan: String,
    businessType: String,
    monthlyRevenue: Number,
    loanAmount: Number,
    tenure: Number,
    purpose: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("applicationModel", applicationSchema);
