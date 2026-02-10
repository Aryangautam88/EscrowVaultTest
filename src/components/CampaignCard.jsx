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
      <h2>{campaign.name}</h2>

      <h3>Escrow Vault Amount: ₹{campaign.amount}</h3>
      <h3>Status: {campaign.status}</h3>

      <p>{getMessage()}</p>

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
