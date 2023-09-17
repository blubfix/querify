const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const database = require("../../database");
const generateIds = require("../functions/generateIds");
const e = require("express");
const userRouter = express.Router();

userRouter.post("/signUp", async (req, res) => {
  try {
    const userId = generateIds.generateId();
    const { password, email, name, geburtstag} = req.body;
    const hashedPassword = await bcrypt.hash(password, 5); // Hash the password with 10 rounds of salt
    if (!hashedPassword) {
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
    if (!passwordRegex.test(hashedPassword)) {
      throw new Error("Password does not meet the minimum requirements. (at least one digit, at least one lowercase letter, at least one uppercase letter and at least 8 characters)");
    }
    const user = await database.getUserByEmail(email);
    if (user !== null) {
      res.status(404).send({ error: "User with this email already exists." });
      throw new Error("User with this email already exists.");
    }
    await database.signUp(email, hashedPassword, userId, name, geburtstag);
    
    const result = await database.getUserByEmail(email);

    if (!result) {
      res.status(404).send({ error: "No user found with the provided email after Registration" }); // No user found with the provided email
    }

    const isPasswordValid = await bcrypt.compare(password, result.password)

    if (isPasswordValid) {
      // Create a JWT token with user information and expiration (30 days)
      const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days from now
      const token = jwt.sign({ userId: result.userId, email: result.email, exp: expiration }, 'secret-key');
      console.log(token)
      // Send the token back to the client
      console.log(result.userId, result.email, result.name)
      res.status(200).send({ token, user: { id: result.userId, email: result.email, name: result.name } });
    } 
    else {
      res.status(404).send({ error: "Something went wrong with the password encryption" }); // Password is incorrect
    }
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
    const user = await database.getUserByEmail(email);

    if (!user) {
      res.status(404).send({ error: "No user found with the provided email" }); // No user found with the provided email
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid) {
      // Create a JWT token with user information and expiration (30 days)
      const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days from now
      const token = jwt.sign({ userId: user.userId, email: user.email, exp: expiration }, 'secret-key');
      console.log(token)
      // Send the token back to the client
      console.log(user.userId, user.email, user.name)
      res.status(200).send({ token, user: { id: user.userId, email: user.email, name: user.name } });
    } 
    else {
      res.status(404).send({ error: "Password is incorrect" }); // Password is incorrect
    }
    
    // console.log(req.body);
    // const hashedPassword = await bcrypt.hash(password, 5); // Hash the password with 5 rounds of salt
    // console.log("hashedPassword", hashedPassword)
    // const result = await database.login(email, hashedPassword);
    // if (result.length === 0) {
    //   res.status(404).send({ error: "Email or password incorrect!" });
    // } else {
    //     const user = result[0]; // Assuming the first user in the result array is the authenticated user
  
    //     // Create a JWT token with user information and expiration (30 days)
    //     const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days from now
    //     const token = jwt.sign({ userId: user.id, email: user.email, exp: expiration }, 'secret-key');
    //     console.log(token)
    //     // Send the token back to the client
    //     res.status(200).send({ token });
    //   }
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
userRouter.get("/userbyid/:userId", async (req, res) => {
  try {
      const userId = req.params.userId; // Use req.params.userId to get the userId from the URL
      console.log("userId", userId);

      const result = await database.getUserById(userId);
      if (result.length === 0) {
          res.status(404).send('There are no questions by this user.');
      } else {
          res.status(200).send(result);
      }
  } catch (e) {
      console.error(e);
      res.status(500).send(e);
  }
});
module.exports = userRouter;
