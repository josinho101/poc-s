const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    await req.user.populate(["tasks"]);
    console.log("asdasd");
    return res.send(req.user.tasks);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Task not found!");
    }

    return res.send(task);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValid = updates.every((item) => allowedUpdates.includes(item));
    if (!isValid) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    if (!task) {
      return res.status(404).send("Task not found!");
    }

    res.send(task);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Task not found!");
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
