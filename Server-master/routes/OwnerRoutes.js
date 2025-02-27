const express = require("express");
const {
  PGinfo,
  PG_Addinfo,
  PG_Rooms,
  getPGDetails,
  getOwnerDetails,
  fetchOwnerPgs,
  createNewPg,
  getPGDetailsByUser,
  getPGRoomChart,
  updateRoomChart
} = require("../controller/Owner");
const router = express.Router();
const { auth, isOwner } = require("../middlewares/auth");

router.post("/createNewPg", auth, isOwner, createNewPg);
router.get("/pg-details", auth, isOwner, getPGDetails);
router.get("/pg-owner-details/:ownerId", auth, isOwner, getOwnerDetails);
router.get("/fetchOwnerPgs", auth, isOwner, fetchOwnerPgs);
router.get("/pg-details-by-user", auth, isOwner, getPGDetailsByUser);
router.get("/pg-overview/:pgBuildingId", auth, isOwner, getPGRoomChart);
router.put("/update-room-chart", auth, isOwner, updateRoomChart);



module.exports = router;
