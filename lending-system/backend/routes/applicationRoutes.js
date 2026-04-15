const express = require("express");
const router = express.Router();

const { validateApplication } = require("../middlewares/validate");
const controller = require("../controllers/applicationController");

router.post("/application", validateApplication, controller.createApplication);

router.get("/decision/:id", controller.getDecision);

module.exports = router;

console.log(controller);
