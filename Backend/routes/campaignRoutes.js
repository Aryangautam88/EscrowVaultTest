const express = require("express");
const router = express.Router();

const {
  getCampaign,
  changeStatus,
  withdrawFunds,
  depositFunds,
  resetCampaign
} = require("../controllers/campaignController");

router.get("/campaign", getCampaign);
router.patch("/campaign/status", changeStatus);
router.post("/campaign/withdraw", withdrawFunds);
router.post("/campaign/reset", resetCampaign);
router.post("/campaign/deposit", depositFunds);


module.exports = router;
