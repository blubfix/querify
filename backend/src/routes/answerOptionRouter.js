const express = require("express");
const database = require("../../database");
const generateIds = require("../functions/generateIds");
const answerOptionRouter = express.Router();

answerOptionRouter.post("/", async (req, res) => {
  try {
    const answerOptionId = generateIds.generateId();
    const { answerText, questionId } = req.body;
    if (!questionId) {
      return res.status(400).send("questionId field is required");
    }
    if (!answerText) {
      return res.status(400).send("answerText field is required");
    }
    const question = await database.getQuestionById(questionId);
    if (!question) {
      return res.status(404).send("No question with this ID available");
    }
    await database.addAnswerOption(answerOptionId, answerText, questionId);
    res.status(201).send(answerOptionId); // Antwortnachricht an Postman
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
    res.send(e);
  }
});

answerOptionRouter.get("/question/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    // Check if the answerOption exists
    const answerOptions = await database.getAnswerOptionByQuestionId(
      questionId
    );
    if (!answerOptions) {
      return res
        .status(404)
        .send("No answerOption with this question Id available");
    }
    res.json(answerOptions);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching answerOptions");
  }
});


answerOptionRouter.get("/:answerOptionId", async (req, res) => {
  try {
    const { answerOptionId } = req.params;
    // Check if the answerOption exists
    const answerOptions = await database.getAnswerOptionById(answerOptionId);
    if (!answerOptions) {
      return res.status(404).send("No answerOption with this Id available");
    }
    res.json(answerOptions);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching answerOptions");
  }
});


module.exports = answerOptionRouter;
