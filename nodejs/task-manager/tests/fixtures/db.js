const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Test1",
  email: "test1@gmail.com",
  password: "test123!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_PRIVATE_KEY),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Test2",
  email: "test2@gmail.com",
  password: "test123!",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_PRIVATE_KEY),
    },
  ],
};

const setupDatabase = async () => {
  // delete all user data in test database
  await User.deleteMany();
  await Task.deleteMany();

  // add users to be used in test cases
  await new User(userOne).save();
  await new User(userTwo).save();

  // add tasks to be used in test cases
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task 1",
  completed: false,
  owner: userOneId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task 2",
  completed: true,
  owner: userOneId,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task 3",
  completed: true,
  owner: userTwoId,
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
};
