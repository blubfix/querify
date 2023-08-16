const express = require("express");
const database = require("../../database");
const generateIds = require("../functions/generateIds")
const questionRouter = express.Router();
const answerGivenRouter = express.Router();
const answerOptionRouter = express.Router();
const userRouter = express.Router();
const mixRouter = express.Router();




module.exports = mixRouter;