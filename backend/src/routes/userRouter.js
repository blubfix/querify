const express = require("express");
const database = require("../../database");
const generateIds = require("../functions/generateIds");
const userRouter = express.Router();

userRouter.post("/signUp", async (req, res) => {
  try {
    const userId = generateIds.generateId();
    const { password, email, name, geburtstag} = req.body;
    if (!password) {
      throw new Error("password field is required");
    }
    if (!email) {
      throw new Error("email field is required");
    }
    if (!name) {
      throw new Error("name field is required");
    }
    if (!geburtstag) {
      throw new Error("birthday field is required");
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error("Password does not meet the minimum requirements. (at least one digit, at least one lowercase letter, at least one uppercase letter and at least 8 characters)");
    }
    const user = await database.getUserByEmail(email);
    if (user !== null) {
      throw new Error("User with this email already exists.");
    }
    await database.signUp(email, password, userId, name, geburtstag);
    const result = await database.login(email, password);
    res.status(201).send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const result = await database.getAllUsers();
    if (result.length === 0) {
      res.status(404).send("there are no users");
    } else {
      res.status(200).send(result);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500).send(e);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await database.login(email, password);
    if (result.length === 0) {
      res.status(404).send({ error: "Email or password incorrect!" });
    } else {
      res.status(200).send(result);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500).send(e);
  }
});

userRouter.get("/userId", async (req, res) => {
  try {
    const { email, password } = req.query;
    const userId = await database.getUserIdByEmailAndPassword(email, password);
    if (userId === null) {
      res
        .status(404)
        .send("No user found with the provided email and password.");
    } else {
      res.status(200).send(userId);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500).send(e);
  }
});

module.exports = userRouter;
