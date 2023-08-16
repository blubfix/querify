const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const database = require('./database.js');
server.use(express.urlencoded({ extended: false }));
server.use(bodyParser.json());

//!
//TODO: create a authmiddleware to check if the user is loggedin and then he can post and get data

const questionRouter = require("./src/routes/questionRouter.js");
const answerGivenRouter = require("./src/routes/answerGivenRouter.js");
const userRouter = require("./src/routes/userRouter.js");
const answerOptionRouter = require("./src/routes/answerOptionRouter.js");
//const mixRouter = require("./src/routes/mixRouter.js");

server.use("/question", questionRouter);
server.use("/answerGiven", answerGivenRouter);
server.use("/user", userRouter);
server.use("/answerOption", answerOptionRouter);
//server.use("/custom", mixRouter);

const PORT = 3001;

server.get("/", async(req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
  database.connectToDb();
});
 