exports.validateApplication = (req, res, next) => {
  let {
    ownerName,
    pan,
    businessType,
    monthlyRevenue,
    loanAmount,
    tenure,
    purpose,
  } = req.body;

  pan = pan?.toUpperCase().trim();
  req.body.pan = pan;

  if (
    !ownerName ||
    !pan ||
    !businessType ||
    !monthlyRevenue ||
    !loanAmount ||
    !tenure ||
    !purpose
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (monthlyRevenue <= 0 || loanAmount <= 0 || tenure <= 0) {
    return res.status(400).json({ error: "Values must be positive" });
  }

  // PAN format check (simple)
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(pan)) {
    return res.status(400).json({ error: "Invalid PAN format" });
  }

  next();
};
