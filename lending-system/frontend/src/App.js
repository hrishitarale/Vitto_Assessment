import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    ownerName: "",
    pan: "",
    businessType: "",
    monthlyRevenue: "",
    loanAmount: "",
    tenure: "",
    purpose: "",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error
  };

  // Validate frontend (basic)
  const validate = () => {
    let newErrors = {};

    if (!form.ownerName) newErrors.ownerName = "Name is required";
    if (!form.pan) newErrors.pan = "PAN is required";
    if (!form.businessType) newErrors.businessType = "Select business type";
    if (!form.monthlyRevenue) newErrors.monthlyRevenue = "Enter revenue";
    if (!form.loanAmount) newErrors.loanAmount = "Enter loan amount";
    if (!form.tenure) newErrors.tenure = "Enter tenure";
    if (!form.purpose) newErrors.purpose = "Enter purpose";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 Single button function
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        ...form,
        pan: form.pan.toUpperCase(),
        monthlyRevenue: Number(form.monthlyRevenue),
        loanAmount: Number(form.loanAmount),
        tenure: Number(form.tenure),
      };

      // 1. Create application
      const appRes = await axios.post(
        "http://localhost:5000/api/application",
        payload,
      );

      // 2. Get decision
      const decisionRes = await axios.get(
        `http://localhost:5000/api/decision/${appRes.data._id}`,
      );

      setResult(decisionRes.data);
    } catch (err) {
      const message = err.response?.data?.error || "Something went wrong";
      setErrors({ api: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>MSME Loan Eligibility</h2>

        {/* Owner Name */}
        <input
          name="ownerName"
          placeholder="Business Owner Name"
          onChange={handleChange}
          style={styles.input}
        />
        {errors.ownerName && <p style={styles.error}>{errors.ownerName}</p>}

        {/* PAN */}
        <input
          name="pan"
          placeholder="PAN (ABCDE1234F)"
          onChange={handleChange}
          style={styles.input}
        />
        {errors.pan && <p style={styles.error}>{errors.pan}</p>}

        {/* Business Type */}
        <select
          name="businessType"
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Business Type</option>
          <option value="retail">Retail</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="services">Services</option>
        </select>
        {errors.businessType && (
          <p style={styles.error}>{errors.businessType}</p>
        )}

        {/* Revenue */}
        <input
          type="number"
          name="monthlyRevenue"
          placeholder="Monthly Revenue (₹)"
          onChange={handleChange}
          style={styles.input}
        />
        {errors.monthlyRevenue && (
          <p style={styles.error}>{errors.monthlyRevenue}</p>
        )}

        {/* Loan Amount */}
        <input
          type="number"
          name="loanAmount"
          placeholder="Loan Amount (₹)"
          onChange={handleChange}
          style={styles.input}
        />
        {errors.loanAmount && <p style={styles.error}>{errors.loanAmount}</p>}

        {/* Tenure */}
        <input
          type="number"
          name="tenure"
          placeholder="Tenure (months)"
          onChange={handleChange}
          style={styles.input}
        />
        {errors.tenure && <p style={styles.error}>{errors.tenure}</p>}

        {/* Purpose */}
        <input
          name="purpose"
          placeholder="Loan Purpose"
          onChange={handleChange}
          style={styles.input}
        />
        {errors.purpose && <p style={styles.error}>{errors.purpose}</p>}

        {/* API error */}
        {errors.api && <p style={styles.error}>{errors.api}</p>}

        {/* BUTTON */}
        <button onClick={handleSubmit} style={styles.button}>
          {loading ? "Checking..." : "Check Eligibility"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div
          style={{
            ...styles.resultCard,
            borderLeft:
              result.decision === "APPROVED"
                ? "6px solid green"
                : "6px solid red",
          }}
        >
          <h3>
            {result.decision === "APPROVED" ? "✅ Approved" : "❌ Rejected"}
          </h3>
          <p>
            <strong>Credit Score:</strong> {result.creditScore}
          </p>
          <p>
            <strong>Reasons:</strong> {result.reasons.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

// 🎨 STYLES (Fintech look)
const styles = {
  container: {
    background: "#f4f6fb",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  resultCard: {
    marginTop: "20px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: "12px",
    margin: "5px 0 0 0",
  },
};

export default App;
