import React from "react";
import "./Wallet.css";


const Wallet = ({balance}) => {
  return (
    <div className="card">
      <h2>Influencer Wallet</h2>
      <h3>Balance: ₹{balance}</h3>
    </div>
  );
};

export default Wallet;
