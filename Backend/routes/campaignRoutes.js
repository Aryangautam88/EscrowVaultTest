const express = require("express");
const router = express.Router();

const {
  getCampaign,
  changeStatus,
  withdrawFunds,
  depositFunds,
  submitWork,
  approveCampaign,
  resetCampaign
} = require("../controllers/campaignController");

router.get("/campaign", getCampaign);
router.patch("/campaign/status", changeStatus);
router.post("/campaign/withdraw", withdrawFunds);
router.post("/campaign/reset", resetCampaign);
router.post("/campaign/deposit", depositFunds);
router.patch("/campaign/submit", submitWork);
router.patch("/campaign/approve", approveCampaign);




module.exports = router;
