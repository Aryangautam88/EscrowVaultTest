const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name:{
    type:String,
    default:"Instagram Reel Promotion"
  },
  amount:{
    type:Number,
    default:0,
  },
  status:{
    type:String,
    enum:["ESCROW_LOCKED","UNDER_REVIEW","FUNDS_RELEASED"],
    default:"ESCROW_LOCKED"
  },
  isWithdrawn:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Campaign",campaignSchema);
