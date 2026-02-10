const Campaign = require("../models/Campaign");
const Wallet = require("../models/Wallet");
const delay = require("../utils/delay");

/* GET CAMPAIGN */
exports.getCampaign = async (req,res)=>{
  try{

    let campaign = await Campaign.findOne();
    let wallet = await Wallet.findOne();

    // first time auto create
    if(!campaign){
      campaign = await Campaign.create({});
    }

    if(!wallet){
      wallet = await Wallet.create({});
    }

    res.json({
    name: campaign.name,
    amount: campaign.amount,
    status: campaign.status,
    isWithdrawn: campaign.isWithdrawn,
    walletBalance: wallet.balance
    });

  }catch(err){
    res.status(500).json({message:"Server Error"});
  }
};


/* CHANGE STATUS (Debug Mode) */
exports.changeStatus = async (req,res)=>{
  try{
    const {status} = req.body;

    const campaign = await Campaign.findOne();

    campaign.status = status;
    await campaign.save();

    res.json({message:"Status Updated"});

  }catch(err){
    res.status(500).json({message:"Error changing status"});
  }
};



/* WITHDRAW FUNDS (SECURE ESCROW) */
exports.withdrawFunds = async (req,res)=>{
  try{

    const campaign = await Campaign.findOne();
    const wallet = await Wallet.findOne();

    // 🔐 SECURITY CHECK 1
    if(campaign.status !== "FUNDS_RELEASED"){
      return res.status(403).json({
        success:false,
        message:"Security Alert: Unauthorized Withdrawal Attempt."
      });
    }

    // 🔐 SECURITY CHECK 2 (double withdraw prevention)
    if(campaign.isWithdrawn){
      return res.status(400).json({
        success:false,
        message:"Funds already withdrawn."
      });
    }

    // simulate payment processing
    await delay(2000);

    // transfer money to wallet
        wallet.balance += campaign.amount;

        // EMPTY THE ESCROW VAULT
        campaign.amount = 0;
        campaign.isWithdrawn = true;

        await wallet.save();
        await campaign.save();

    res.json({
      success:true,
      message:"Withdrawal Successful",
      balance:wallet.balance
    });

  }catch(err){
    res.status(500).json({message:"Server Error"});
  }
};

/* RESET CAMPAIGN (for demo/testing) */
exports.resetCampaign = async (req,res)=>{
  try{

    let campaign = await Campaign.findOne();
    let wallet = await Wallet.findOne();

    // reset escrow vault
    campaign.amount = 0,
    campaign.status = "ESCROW_LOCKED";
    campaign.isWithdrawn = false;

    // reset wallet
    wallet.balance = 0;

    await campaign.save();
    await wallet.save();

    res.json({message:"Campaign Reset Successful"});

  }catch(err){
    res.status(500).json({message:"Reset Failed"});
  }
};

/* BRAND DEPOSIT (Set Escrow Amount) */
exports.depositFunds = async (req,res)=>{
  try{

    const { amount } = req.body;

    if(!amount || amount <= 0){
      return res.status(400).json({message:"Invalid amount"});
    }

    let campaign = await Campaign.findOne();

    // reset state automatically
    campaign.amount = amount;
    campaign.status = "ESCROW_LOCKED";
    campaign.isWithdrawn = false;

    await campaign.save();

    res.json({
      success:true,
      message:`₹${amount} deposited into escrow vault`
    });

  }catch(err){
    res.status(500).json({message:"Deposit Failed"});
  }
};
