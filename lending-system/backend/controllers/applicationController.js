const Application = require("../models/applicationModel");
const decisionService = require("../services/decisionService");

exports.applyLoan = async (req, res) => {
  try {
    const data = req.body;

    const saved = await Application.create(data);

    const decision = decisionService.calculateDecision(saved);

    res.json({
      application: saved,
      decision,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
