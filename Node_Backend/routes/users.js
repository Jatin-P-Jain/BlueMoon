const express = require('express');
const { async } = require('rxjs');
const router = express.Router();
const User = require("../models/userModel")

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)
  } catch (err) {
    res.json(err)
  }
});

router.get('/:email', async (req, res) => {
  try {
    const users = await User.find({ email: req.params.email });
    res.json(users)
  } catch (err) {
    res.json(err)
  }
});

router.get('/:userId', (req, res) => {
  res.send(req.params.userId);
});
router.post('/', async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const userRegistered = await user.save();
    res.json("You are registered with Username: " + userRegistered.userName);
  } catch (err) {
    console.log(err);
    res.json(err)
  }
});
module.exports = router;