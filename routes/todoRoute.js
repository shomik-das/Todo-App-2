const express = require("express");
const router = express.Router();

const { getAllTasks } = require("../controller/getAllTasks");
const { addTask } = require("../controller/addTask");
const { updateStatus } = require("../controller/updateStatus");
const {deleteTask} = require("../controller/deleteTask");
const {updateTask} = require("../controller/updateTask");

router.get("/tasks/todo", getAllTasks);
router.post("/addtask", addTask);
router.put("/updatestatus", updateStatus);
router.delete("/deletetask", deleteTask);
router.put("/updatetask", updateTask);

module.exports = router;
