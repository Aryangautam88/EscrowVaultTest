import React, { useState } from "react";
import { withdraw } from "../api/campaignApi";
import "./CampaignCard.css";

const CampaignCard = ({ campaign, refresh }) => {


  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {

    // 🔐 FRONTEND SECURITY CHECK
    if (campaign.status !== "FUNDS_RELEASED" || campaign.isWithdrawn) {
      alert("Security Alert: Unauthorized Withdrawal Attempt.");
      return;
    }

    setLoading(true);

    const res = await withdraw();

    setLoading(false);

    if (res.success) {
      alert("Withdrawal Successful! Funds transferred to wallet.");
      refresh();
    } else {
      alert(res.message);
    }
  };

  // User guidance messages
  const getMessage = () => {


    if (campaign.amount === 0)
      return "Brand has not deposited funds yet.";

    if (campaign.isWithdrawn)
      return "Funds have been transferred to your wallet.";

    if (campaign.status === "ESCROW_LOCKED")
      return "Submit your work to unlock payment.";

    if (campaign.status === "UNDER_REVIEW")
      return "Brand is reviewing your submission.";

    return "Funds are ready to withdraw.";
  };

  // Card color
  const getClass = () => {
    if (campaign.isWithdrawn) return "released";
    if (campaign.status === "ESCROW_LOCKED") return "locked";
    if (campaign.status === "UNDER_REVIEW") return "review";
    return "released";
  };

  // Button text
  const getButtonText = () => {

    if (campaign.isWithdrawn)
      return "Funds Already Withdrawn";

    if (loading)
      return "Processing...";

    return `Withdraw ₹${campaign.amount}`;
  };

  return (
    <div className={`card ${getClass()}`}>

      {/* TOP HEADING */}
      <div className="vault-heading">Escrow Vault</div>

      {/* CAMPAIGN NAME */}
      <h2 className="campaign-name">{campaign.name}</h2>

      {/* STATUS */}
      <div className="status-row">
        <span className="status-label">Current Status:</span>
        <span className="status-badge">
          {campaign.status === "ESCROW_LOCKED" && "Locked 🔒"}
          {campaign.status === "UNDER_REVIEW" && "Under Review ⏳"}
          {campaign.status === "FUNDS_RELEASED" && "Funds Released ✅"}
        </span>
      </div>

      {/* AMOUNT */}
      <div className="amount-box">
        <div className="amount-label">Funds Held Securely</div>
        <div className="amount-value">₹{campaign.amount}</div>
      </div>

      {/* INFO TEXT */}
      <p className="message">{getMessage()}</p>


      {/* WITHDRAW */}
      <button
        className="withdraw-btn"
        disabled={
          campaign.status !== "FUNDS_RELEASED" ||
          loading ||
          campaign.isWithdrawn
        }
        onClick={handleWithdraw}
      >
        {getButtonText()}
      </button>

    </div>
  );

};

export default CampaignCard;
