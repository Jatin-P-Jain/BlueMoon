const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const Task = require("../models/taskModel")
router.post('/', async (req, res) => {
  const task = new Task({
    taskName: req.body.taskName,
    taskDate: req.body.taskDate,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    remind: req.body.remind,
    taskStatus: req.body.taskStatus,
    createdBy: req.body.createdBy
  });
  try {
    const taskCreated = await task.save();
    res.json("Task '" + taskCreated.taskName + "' created!");
  } catch (err) {
    console.log(err);
    res.json(err)
  }
});
router.get('/:userName', async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.userName });
    res.json(tasks)
  } catch (err) {
    res.json(err)
  }
});
router.patch('/:taskId', async (req, res) => {
  try {
    const taskCompleted = await Task.updateOne({ _id: req.params.taskId }, {$set : {taskStatus: req.body.taskStatus}});
    res.json("Task Completed!");
  }catch (err) {
    res.json(err)
  }
});
module.exports = router;