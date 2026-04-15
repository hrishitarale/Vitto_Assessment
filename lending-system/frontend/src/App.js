import "./App.css";
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
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/apply", form);
    setResult(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lending Decision System</h2>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          onChange={handleChange}
          style={{ display: "block", margin: 10 }}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>

      {result && (
        <div>
          <h3>Decision: {result.decision.decision}</h3>
          <p>Score: {result.decision.score}</p>
          <p>Reasons: {result.decision.reasons.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
