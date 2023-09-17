const express = require("express");
const qr = require('qrcode');
const database = require("../../database");
const generateIds = require("../functions/generateIds")
const questionRouter = express.Router();

const validIdentifikationValues = [
    "undefined",
    "anonyme Abstimmung",
    "nach Namen fragen, anderen aber nicht anzeigen",
    "nach Namen fragen & für alle anzeigen",
];

const validWiederverwendungValues = [
    "undefined",
    "als Vorlage gespeichert",
    "60 Tagen nach dem Umfragestichtag gelöscht",
];

const validErgebniseinsichtValues = [
    "undefined",
    "vor ihrer Abstimmung sehen",
    "nach ihrer Abstimmung sehen",
    "nach dem Umfragestichtag",
];

questionRouter.post("/", async (req, res) => {
    try {
        const questionId = generateIds.generateId();
        const {
            title,
            type,
            minimumNumberOfAnswers,
            userId,
            qrCode,
            identifikation,
            wiederverwendung,
            ergebniseinsicht,
            bewertung,
            date,
            description,
        } = req.body;
        console.log(req.body)
        console.log("bewertung: ", bewertung)
        if (!title) {
            return res.status(400).send("Title field is required");
        }
        if (!type) {
            return res.status(400).send("Type field is required");
        }
        if (!minimumNumberOfAnswers) {
            try{
                console.log(minimumNumberOfAnswers)
                minimumNumberOfAnswers = 1;
                console.log(minimumNumberOfAnswers)

            }
            catch(e){
                console.log("Error minimumAnswers")
                console.log(e)
            }
            
        }
        if (!userId) {
            return res.status(400).send("userId field is required");
        }
        if (type !== "reminder")
            {
                if (!validIdentifikationValues.includes(identifikation)) {
                    return res.status(400).send({
                        error: `Invalid identifikation value: ${identifikation}`,
                    });
                }
                if (!validWiederverwendungValues.includes(wiederverwendung)) {
                    return res.status(400).send({
                        error: `Invalid wiederverwendung value: ${wiederverwendung}`,
                    });
                }
                if (!validErgebniseinsichtValues.includes(ergebniseinsicht)) {
                    return res.status(400).send({
                        error: `Invalid ergebniseinsicht value: ${ergebniseinsicht}`,
                    });
                }
            }

        const user = await database.getUserById(userId);
        if (!user) {
            return res.status(400).send({ error: `Invalid userId ${userId}` });
        }
        const validTypes = ["poll", "multi", "free", "feeling", "reminder"];
        if (!validTypes.includes(type)) {
            return res.status(400).send({ error: `Invalid question type ${type}` });
        }

        //const questionLink = `https://querify.com/question/${questionId}`;


        const questionLink = `https://querify.com/question/${questionId}`;

        const qrCodeDataUrl = await new Promise((resolve, reject) => {
            qr.toDataURL(questionLink, (err, dataUrl) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dataUrl);
                }
            });
        });

        await database.createQuestion(
            questionId,
            title,
            type,
            minimumNumberOfAnswers,
            userId,
            qrCodeDataUrl,
            questionLink,
            identifikation,
            wiederverwendung,
            ergebniseinsicht,
            bewertung,
            date,
            description,
        );
        res.status(201).send({ questionId, questionLink, qrCodeDataUrl });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

questionRouter.get("/", async (req, res) => {
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

questionRouter.get("/thisweek", async (req, res) => {
    try {
        const result = await database.getQuestionFromThisWeek();
        console.log(result);

        res.status(200).send(result);
        
    } catch (e) {
        console.log(e);
        console.error(e);
        res.sendStatus(500).send(e);
    }
});

questionRouter.get("/thismonth", async (req, res) => {
    try {
        const result = await database.getQuestionFromThisMonth();
        console.log(result);

        res.status(200).send(result);
        
    } catch (e) {
        console.log(e);
        console.error(e);
        res.sendStatus(500).send(e);
    }
});

questionRouter.get("/:questionId", async (req, res) => {
    try {
        const { questionId } = req.params;
        console.log("questionId", questionId)
        const question = await database.getQuestionById(questionId);
        if (!question) {
            res.status(404).send("There are no questions with this ID");
        } else {
            res.status(200).send(question);
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
