const express = require("express");
const database = require("../../database");
const generateIds = require("../functions/generateIds")
const questionRouter = express.Router();

questionRouter.post("/", async (req, res) => {
  try {
    const questionId = generateIds.generateId();
    const { title, type, userId } = req.body;
    if (!title) {
      return res
        .status(400)
        .send("Title field is required");
    }
    if (!type) {
      return res
        .status(400)
        .send("type field is required");
    }
    if (!userId) {
      return res
        .status(400)
        .send("userId field is required");
    }    
    const user = await database.getUserById(userId);
    if (!user) {
      return res.status(400).send({ error: `Invalid userId ${userId}` });
    }
    const validTypes = ["poll", "multi", "free"];
    if (!validTypes.includes(type)) {
      return res.status(400).send({ error: `Invalid question type ${type}` });
    }
    await database.createQuestion(questionId, title, type, userId);
    res.status(201).send(questionId);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

questionRouter.get("/", async(req, res) => {
  try {
    const result = await database.getAllQuestions();
    console.log(result);
    if (result.length === 0) {
      res.status(404).send('there are no questions');
    } else {
      res.status(200).send(result);
    }
  } catch (e) {
    console.log(e);
    console.error(e);
    res.sendStatus(500).send(e);
  }
});

questionRouter.get("/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const questions = await database.getQuestionById(questionId);
    if (!questions) {
      res.status(404).send('there are no questions with this ID');
    } else {
      res.status(200).send(questions);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching questions");
  }
});

questionRouter.param("questionId", (req, res, next, questionId) => {
  req.body.questionId = questionId;
  next();
});

// questionRouter.route("/:questionId")
//   .get(async (req, res) => {
//     try {
//       const { questionId } = req.body;
//       const result = await database.getQuestionById(questionId);
//       if (!result) {
//         res.status(404).send('there is no question with this ID');
//       } else {
//         res.status(200).send(result);
//       }
//     } catch (e) {
//       console.error(e);
//       res.sendStatus(500).send(e);
//     }
//   });

questionRouter.param("userId", (req, res, next, userId) => {
  req.body.userId = userId;
  next();
});

questionRouter.route("/user/:userId")
  .get(async (req, res) => {
    try {
      const { userId } = req.body;
      const result = await database.getQuestionsByUser(userId);
      if (result.length === 0) {
        res.status(404).send('there are no questions by this user');
      } else {
        res.status(200).send(result);
      }
    } catch (e) {
      console.error(e);
      res.sendStatus(500).send(e);
    }
  });



module.exports = questionRouter;
