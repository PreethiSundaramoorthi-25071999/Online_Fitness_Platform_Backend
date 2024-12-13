const express = require("express");
const router = express.Router();
const {createschedule, getScheduleClass, deleteScheduleClass, updateSchedule} = require("../controllers/scheduledClass-controllers")

// schedule
router.post("/create", createschedule);
router.get("/", getScheduleClass);
router.delete("/:id", deleteScheduleClass);
router.put("/:id", updateSchedule);

module.exports = router;


