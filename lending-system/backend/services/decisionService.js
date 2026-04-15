//decision logic

exports.calculateDecision = (data) => {
  let score = 100;
  let reasons = [];

  const emi = data.loanAmount / data.tenure;
  //revenue vs emi
  if (emi > data.monthlyRevenue * 0.4) {
    score -= 40;
    reasons.push("LOW_REVENUE");
  }

  //loan multitude
  if (data.loanAmount > data.monthlyRevenue * 12) {
    score -= 30;
    reasons.push("HIGH_LOAN_RATIO");
  }
  //tenure risk
  if (data.tenure < 6 || data.tenure > 48) {
    score -= 10;
    reasons.push("TENURE_RISK");
  }
  if (data.monthlyRevenue < 1000) {
    reasons.push("LOW_BUSINESS_SCALE");
  }

  if (data.loanAmount > data.monthlyRevenue * 100) {
    reasons.push("EXTREME_RISK");
  }
  //fraud check
  if (data.loanAmount > data.monthlyRevenue * 50) {
    score = 0;
    reasons.push("INVALID_DATA");
  }
  //final decision
  const decision = score >= 60 ? "APPROVED" : "REJECTED";

  return { decision, creditScore: score, reasons };
};
