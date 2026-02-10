import React,{useEffect,useState} from "react";
import Wallet from "./components/Wallet";
import CampaignCard from "./components/CampaignCard";
import DebugControls from "./components/DebugControls";
import { getCampaign } from "./api/campaignApi";
import "./App.css";


function App(){

  const [campaign,setCampaign] = useState(null);

  const fetchData = async ()=>{
    const data = await getCampaign();
    setCampaign(data);
  };

  useEffect(()=>{
    fetchData();
  },[]);

  if(!campaign) return <h2>Loading...</h2>;

  return(
    <div className="app-container">

      <h1 className="app-title">Escrow Vault Dashboard</h1>

      <Wallet balance={campaign.walletBalance} />

      <CampaignCard campaign={campaign} refresh={fetchData} />

      <DebugControls refresh={fetchData} />

    </div>
  );
}

export default App;
