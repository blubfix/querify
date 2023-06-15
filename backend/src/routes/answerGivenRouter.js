const express = require("express");
const database = require("../../database");
const generateIds = require("../functions/generateIds");
const answerGivenRouter = express.Router();

answerGivenRouter.post("/", async (req, res) => {
  try {
    const answerGivenId = generateIds.generateId();
    const { answerOptionId, userId, questionId } = req.body;
    if (!answerOptionId) {
      return res
        .status(400)
        .send("answerOptionId field is required");
    }
    if (!userId) {
      return res
        .status(400)
        .send("userId field is required");
    }
    if (!questionId) {
      return res
        .status(400)
        .send(" questionId field is required");
    }
    const answerOption = await database.getAnswerOptionById(answerOptionId);
    if (!answerOption) {
      return res.status(404).send("No answerOption with this Id available");
    }
    const user = await database.getUserById(userId);
    if (!user) {
      return res.status(404).send("No user with this Id available");
    }
    const question = await database.getQuestionById(questionId);
    if (!question) {
      return res.status(404).send("No question with this Id available");
    }
    // Add answerGiven to the database
    await database.addAnswerGiven(
      answerOptionId,
      userId,
      answerGivenId,
      questionId
    );
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

answerGivenRouter.get("/question/:questionId/answergiven", async (req, res) => {
  try {
    const { questionId } = req.params;
    // Check if questionId is valid
    const question = await database.getQuestionById(questionId);
    if (!question) {
      return res.status(404).send("No question with this Id available");
    }
    // Get answerGiven by questionId from the database
    const answerGiven = await database.getAnswerGivenByQuestion(questionId);
    res.status(200).send(answerGiven);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching answerGiven");
  }
});

answerGivenRouter.get("/question/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    // Check if questionId is valid
    const question = await database.getQuestionById(questionId);
    if (!question) {
      return res.status(404).send("No question with this Id available");
    }
    // Get answerGiven from the database
    const answerGiven = await database.getAnswerGivenByQuestion(questionId);
    res.status(200).send(answerGiven);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching answerGiven");
  }
});

answerGivenRouter.get(
  "/user/:userId/question/:questionId",
  async (req, res) => {
    try {
      const { userId, questionId } = req.params;
      // Check if userId and questionId are valid
      const user = await database.getUserById(userId);
      if (!user) {
        return res.status(404).send("No user with this Id available");
      }
      const question = await database.getQuestionById(questionId);
      if (!question) {
        return res.status(404).send("No question with this Id available");
      }
      // Get answers from the database
      const answers = await database.getAnswersByUserAndQuestion(
        userId,
        questionId
      );
      res.status(200).send(answers);
    } catch (e) {
      console.error(e);
      res.status(500).send("Error fetching answers");
    }
  }
);

module.exports = answerGivenRouter;
