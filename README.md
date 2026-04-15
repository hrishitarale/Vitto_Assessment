# MSME Lending Decision System

## 📌 Overview

This project is a full-stack Lending Decision System designed to simulate how digital lenders evaluate MSME (Micro, Small & Medium Enterprises) loan applications.

The system collects business and loan details, processes them through a custom credit decision engine, and returns an approval/rejection decision along with a credit score and reason codes.

---

## 🚀 Tech Stack

* Frontend: React
* Backend: Node.js, Express
* Database: MongoDB (Mongoose)

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
npm install
node app.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔌 API Endpoints

### 1. Create Application

POST `/api/application`

### 2. Get Decision

GET `/api/decision/:id`

---

## 🧠 Decision Logic

The system uses a rule-based scoring model:

### 1. Revenue-to-EMI Ratio

* EMI = loanAmount / tenure
* If EMI > 40% of revenue → Risky
* Penalty: -40

### 2. Loan-to-Revenue Ratio

* If loanAmount > 12× monthly revenue
* Penalty: -30

### 3. Tenure Risk

* If tenure < 6 or > 48 months
* Penalty: -10

### 4. Fraud / Data Inconsistency

* If loanAmount > 50× revenue
* Immediate rejection

---

### 🎯 Final Decision

* Score ≥ 60 → APPROVED
* Score < 60 → REJECTED

---

## ⚠️ Edge Cases Handled

* Missing fields
* Invalid PAN format
* Negative or zero values
* Extremely high loan requests
* Data inconsistencies

---

## 🛡️ Validation

* Backend validation middleware
* Frontend validation with inline error messages
* PAN normalization (uppercase + trim)

---

## 🎨 Features

* Single-page application
* Real-time decision result
* Clean UI
* Inline error handling

---

## 🚀 Future Improvements

* Async decision processing (queue-based)
* Credit bureau integration
* Machine learning-based scoring
* Role-based authentication
* Audit logs & analytics dashboard

---

## Live Links

* frontend: https://vitto-assessment.vercel.app/
* backend: https://vitto-assessment.onrender.com

---

## 📎 Author

Hrishikesh Tarale
