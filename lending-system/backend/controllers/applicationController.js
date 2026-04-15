const Application = require("../models/applicationModel");
const decisionService = require("../services/decisionService");

//create applicaiton
exports.createApplication = async (req, res) => {
  try {
    const saved = await Application.create(req.body);
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET DECISION
exports.getDecision = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ error: "Application not found" });
    }

    const decision = decisionService.calculateDecision(app);

    res.json(decision);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  console.log(req.body);
};
