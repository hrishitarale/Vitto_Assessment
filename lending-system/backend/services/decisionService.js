// services/decisionService.js
exports.calculateDecision = (data) => {
  let score = 100;
  let reasons = [];

  const emi = data.loanAmount / data.tenure;

  if (emi > data.monthlyRevenue * 0.5) {
    score -= 40;
    reasons.push("LOW_REVENUE");
  }

  if (data.loanAmount > data.monthlyRevenue * 10) {
    score -= 30;
    reasons.push("HIGH_LOAN_RATIO");
  }

  if (data.tenure < 6 || data.tenure > 60) {
    score -= 10;
    reasons.push("TENURE_RISK");
  }

  if (data.monthlyRevenue <= 0) {
    score = 0;
    reasons.push("INVALID_DATA");
  }

  const decision = score >= 60 ? "APPROVED" : "REJECTED";

  return { decision, score, reasons };
};
