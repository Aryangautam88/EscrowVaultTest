import React, { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import Wallet from "./components/Wallet";
import CampaignCard from "./components/CampaignCard";
import DebugControls from "./components/DebugControls";
import { getCampaign } from "./api/campaignApi";
import "./App.css";

function App() {

  const [campaign, setCampaign] = useState(null);
  const [page, setPage] = useState("profile");

  // When brand books influencer
  const handleBooking = async () => {
    await fetch("http://localhost:5000/api/campaign/reset", {
      method: "POST",
    });

    await fetchData();
    setPage("dashboard");
  };

  // Fetch campaign data
  const fetchData = async () => {
    const data = await getCampaign();
    setCampaign(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* PROFILE PAGE */
  if (page === "profile") {
    return <Profile onBook={handleBooking} />;
  }

  /* DASHBOARD LOADING */
  if (!campaign)
    return <h2 className="loading">Loading Dashboard...</h2>;

  /* DASHBOARD */
  return (
    <div className="app-container">

      {/* HEADER */}
      <div className="header">
        <h1 className="app-title">Smart Escrow Vault</h1>
        <p className="app-subtitle">
          Secure payment workflow between brand and influencer
        </p>
      </div>

      {/* DASHBOARD */}
      <div className="dashboard-grid">

        {/* BRAND PANEL */}
        <div className="dashboard-col">
          <h3 className="section-title">Brand Panel</h3>
          <DebugControls refresh={fetchData} />
        </div>

        {/* ESCROW */}
        <div className="dashboard-col">
          <h3 className="section-title">Escrow Vault</h3>
          <CampaignCard campaign={campaign} refresh={fetchData} />
        </div>

        {/* WALLET */}
        <div className="dashboard-col">
          <h3 className="section-title">Influencer Wallet</h3>
          <Wallet
            balance={campaign.walletBalance}
            campaign={campaign}
            refresh={fetchData}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
