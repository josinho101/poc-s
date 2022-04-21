const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Test1",
  email: "test1@gmail.com",
  password: "test123!",
};

beforeEach(async () => {
  // delete all user data in test database
  await User.deleteMany();

  // add a user to be used in test cases
  await new User(userOne).save();
});

test("Should signup a user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Joseph",
      email: "joseph@gmail.com",
      password: "admin123",
    })
    .expect(201);
});

test("Should be able to login to a existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login for non existing user", async () => {
  await request(app)
    .post("/users")
    .send({
      email: userOne.email,
      password: "InValidPassword",
    })
    .expect(400);
});
