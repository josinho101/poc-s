const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    res.send(user);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValid = updates.every((item) => allowedUpdates.includes(item));

    if (!isValid) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const _id = req.params.id;
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
