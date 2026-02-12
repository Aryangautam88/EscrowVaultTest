import React, { useState } from "react";
import { changeStatus } from "../api/campaignApi";
import "./DebugControls.css";

const DebugControls = ({ refresh }) => {
  const handleApprove = async () => {
    await fetch("http://localhost:5000/api/campaign/approve", {
      method: "PATCH"
    });
    refresh();
  };


  const [amount, setAmount] = useState("");

  const handleChange = async (e) => {
    await changeStatus(e.target.value);
    refresh();
  };

  // deposit amount
  const handleDeposit = async () => {
    if (!amount) return alert("Enter amount");

    await fetch("http://localhost:5000/api/campaign/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) })
    });

    setAmount("");
    refresh();
  };

  // reset
  const handleReset = async () => {
    await fetch("http://localhost:5000/api/campaign/reset", {
      method: "POST"
    });

    refresh();
  };

  return (
    <div className="debug-card">

    <h3 className="debug-title">Brand Control Panel</h3>

    {/* STEP 1 - DEPOSIT */}
    <div className="step-box">

      <div className="step-header">
        <span className="step-number">1</span>
        <span className="step-text">Fund the Campaign</span>
      </div>

      <p className="step-desc">
        Deposit money into the escrow vault before the influencer starts work.
      </p>

      <div className="deposit-row">
        <input
          type="number"
          placeholder="Enter amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />

        <button className="deposit-btn" onClick={handleDeposit}>
          Deposit Funds
        </button>
      </div>

    </div>

    {/* STEP 2 - APPROVE */}
    <div className="step-box">

      <div className="step-header">
        <span className="step-number">2</span>
        <span className="step-text">Approve Work</span>
      </div>

      <p className="step-desc">
        After the influencer submits the reel, mark it as satisfied to release payment.
      </p>

      <button className="approve-btn" onClick={handleApprove}>
        Mark as Satisfied
      </button>

    </div>

    {/* RESET */}
    {/* <button className="reset-btn" onClick={handleReset}>
      Reset Campaign
    </button> */}

  </div>
  );
};

export default DebugControls;
