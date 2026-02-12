import React, { useState } from "react";
import "./Wallet.css";

const Wallet = ({ balance, campaign, refresh }) => {

  const today = new Date().toLocaleDateString();
  const [loading, setLoading] = useState(false);

  // Submit work function
  const handleSubmitWork = async () => {

    // security checks
    if (!campaign) return;

    if (campaign.amount === 0) {
      alert("Brand has not funded the campaign yet.");
      return;
    }

    if (campaign.status !== "ESCROW_LOCKED") {
      alert("Work already submitted or under review.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/campaign/submit", {
        method: "PATCH"
      });

      const data = await res.json();

      setLoading(false);

      if (data.success) {
        alert("Work submitted successfully! Waiting for brand approval.");
        refresh();
      } else {
        alert(data.message);
      }

    } catch (err) {
      setLoading(false);
      alert("Server not responding. Start backend.");
    }
  };

  return (
    <div className="wallet-card">

      <div className="wallet-header">
        <h2 className="wallet-title">Influencer Wallet</h2>
        <span className="wallet-date">Last Updated: {today}</span>
      </div>

      {/* BALANCE */}
      <div className="balance-box">
        <div className="balance-label">Available Balance</div>
        <div className="wallet-balance">₹{balance}</div>
      </div>

      {/* INFO */}
      <div className="wallet-info">
        <p>Funds released from escrow appear here after brand approval.</p>
      </div>

      {/* SUBMIT WORK BUTTON */}
      {campaign && campaign.status === "ESCROW_LOCKED" && campaign.amount > 0 && (
        <button
          className="wallet-btn submit"
          onClick={handleSubmitWork}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Reel / Work"}
        </button>
      )}

      {/* OTHER ACTION */}
      <div className="wallet-actions">
        <button className="wallet-btn primary">Transfer to Bank</button>
      </div>

    </div>
  );
};

export default Wallet;
