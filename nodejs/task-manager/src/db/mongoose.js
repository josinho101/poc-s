const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
});

const Task = mongoose.model("Task", {
  description: { type: String },
  completed: { type: Boolean },
});

const task = new Task({
  description: "Complete all my work",
  completed: false,
});

task
  .save()
  .then(() => console.log(task))
  .catch((e) => console.log(e));
