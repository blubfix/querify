const express = require("express");
const jwt = require('jsonwebtoken');
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

//TODO: check if its working for that => token will already generated
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const result = await database.login(email, password);
    if (result.length === 0) {
      res.status(404).send({ error: "Email or password incorrect!" });
    } else {
        const user = result[0]; // Assuming the first user in the result array is the authenticated user
  
        // Create a JWT token with user information and expiration (30 days)
        const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days from now
        const token = jwt.sign({ userId: user.id, email: user.email, exp: expiration }, 'secret-key');
        console.log(token)
        // Send the token back to the client
        res.status(200).send({ token });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
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
