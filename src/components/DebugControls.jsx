import React, { useState } from "react";
import { changeStatus } from "../api/campaignApi";
import "./DebugControls.css";

const DebugControls = ({ refresh }) => {

  const [amount,setAmount] = useState("");

  const handleChange = async (e)=>{
    await changeStatus(e.target.value);
    refresh();
  };

  // deposit amount
  const handleDeposit = async ()=>{
    if(!amount) return alert("Enter amount");

    await fetch("http://localhost:5000/api/campaign/deposit",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({amount:Number(amount)})
    });

    setAmount("");
    refresh();
  };

  // reset
  const handleReset = async ()=>{
    await fetch("http://localhost:5000/api/campaign/reset",{
      method:"POST"
    });

    refresh();
  };

  return(
    <div className="debug-card">

      <h3 className="debug-title">Brand Funding Panel</h3>

      {/* STATUS SECTION */}
      <div className="section">
        <label className="label">Campaign Status</label>
        <select className="status-select" onChange={handleChange}>
          <option value="ESCROW_LOCKED">Locked</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="FUNDS_RELEASED">Funds Released</option>
        </select>
      </div>

      {/* DEPOSIT SECTION */}
      <div className="section">
        <label className="label">Deposit to Escrow</label>

        <div className="deposit-row">
          <input
            type="number"
            placeholder="Enter amount ₹"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            className="amount-input"
          />

          <button className="deposit-btn" onClick={handleDeposit}>
            Deposit
          </button>
        </div>
      </div>

      {/* RESET */}
      <button className="reset-btn" onClick={handleReset}>
        Reset Campaign
      </button>

    </div>
  );
};

export default DebugControls;
