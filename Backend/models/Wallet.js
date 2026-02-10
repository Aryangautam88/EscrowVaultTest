const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  influencer:{
    type:String,
    default:"Influencer"
  },
  balance:{
    type:Number,
    default:0
  }
});

module.exports = mongoose.model("Wallet",walletSchema);
