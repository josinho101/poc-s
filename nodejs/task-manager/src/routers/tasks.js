const express = require("express");
const Task = require("../models/task");

const router = new express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    return res.status(201).send(task);
  } catch (e) {
    return res.status(400).send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.send(tasks);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("Task not found!");
    }

    return res.send(task);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValid = updates.every((item) => allowedUpdates.includes(item));
    if (!isValid) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const _id = req.params.id;
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send("Task not found!");
    }

    res.send(task);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send("Task not found!");
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
