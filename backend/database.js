const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  port: 3306,
  user: "alfred",
  password: "alfred1",
  database: "wishhzDB",
  connectionLimit: 5,
});

async function connectToDb() {
  try {
    connection = await pool.getConnection();
    const rows = await connection.query("SELECT 1 as val");
    console.log(rows); //[ {val: 1}, meta: ... ]
  } catch (err) {
    throw err;
  } finally {
    if (connection) return connection.end();
  }
}

// ++++++++++++ USER ++++++++++++

async function signUp(email, password, userId, name, geburtstag) {
  try {
    await connection.query(
      `INSERT INTO user (email, password, userId, name, geburtstag) VALUES ('${email}', '${password}', '${userId}', '${name}', '${geburtstag}')`
    );
    console.log("data (user) inserted");
  } catch (e) {
    console.error(e);
  }
}

async function getAllUsers() {
  try {
    const result = await connection.query(
      `SELECT * FROM user`
    );
    console.log("DB Result: getAllUsers", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getUserById(userId) {
  try {
    const result = await connection.query(
      `SELECT * FROM user WHERE userId = '${userId}'`
    );
    console.log("DB Result: getUserById", result);
    if (result.length === 0) {
      console.log("No User with this Id avilable");
      return null;
    }
    return result[0];
  } catch (e) {
    console.error(e);
  }
}

async function getUserByEmail(email) {
  try {
    const result = await connection.query(
      `SELECT * FROM user WHERE email = '${email}'`
    );
    console.log("DB Result: getUserByEmail", result);
    if (result.length === 0) {
      console.log("No User with this email avilable");
      return null;
    }
    return result[0];
  } catch (e) {
    console.error(e);
  }
}

async function login(email, password) {
  try {
    const result = await connection.query(
      `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`
    );
    console.log("DB Result: login", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getUserIdByEmailAndPassword(email, password) {
  try {
    const result = await connection.query(
      `SELECT userId FROM user WHERE email = '${email}' AND password = '${password}'`
    );
    console.log("DB Result: getUserIdByEmailAndPassword", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}


// ++++++++++++ question ++++++++++++

async function createQuestion(questionId, title, type, minimumNumberOfAnswers, userId, qrCode, questionLink, identifikation, wiederverwendung, ergebniseinsicht, bewertung, date, description, answers) {
  try {
    await connection.query(
      `INSERT INTO question (questionId, createdAt, title, type, minimumNumberOfAnswers, userId, qrCode, questionLink, identifikation, wiederverwendung, ergebniseinsicht, bewertung, date, description, multi) VALUES ('${questionId}', LOCALTIME, '${title}', '${type}', '${minimumNumberOfAnswers}', '${userId}', '${qrCode}', '${questionLink}', '${identifikation}', '${wiederverwendung}', '${ergebniseinsicht}', '${bewertung}', '${date}', '${description}', '${answers}')`
    );
    console.log("data (question) inserted");
  } catch (e) {
    console.error(e);
  }
}

async function getQuestionById(questionId) {
  try {
    const result = await connection.query(
      `SELECT * FROM question WHERE questionId = '${questionId}'`
    );
    console.log("DB Result: getAnswerOptionByID", result);
    if (result.length === 0) {
      console.log("No question with this Id available");
      return null;
    }
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getQuestionActiveByUserId(userID) {
  try {
    const result = await connection.query(
      `SELECT q.*, u.name AS name, u.email AS email FROM question q JOIN user u ON q.userId = u.userId WHERE STR_TO_DATE(q.date, '%d.%m.%Y') > CURDATE() AND q.userId = '${userID}'`
    );
    console.log("DB Result: getQuestionActiveByUserId", result);
    return result;
    
  } catch (e) {
    console.error(e);
  }
}

async function getQuestionExpiredByUserId(userID) {
  try {
    const result = await connection.query(
      `SELECT q.*, u.name AS name, u.email AS email FROM question q JOIN user u ON q.userId = u.userId WHERE STR_TO_DATE(q.date, '%d.%m.%Y') < CURDATE() AND q.userId = '${userID}'`
    );
    console.log("DB Result: getQuestionExpiredByUserId", result);
    return result;

    } catch (e) {
    console.error(e);
  }
}


async function getQuestionsByUser(userId) {
  try {
    const result = await connection.query(
      `SELECT q.*, u.name AS name FROM question q JOIN user u ON q.userId = u.userId WHERE q.userId = '${userId}'`
    );
    console.log("DB Result: getQuestionsByUser", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getAllQuestions() {
  try {
    const result = await connection.query(
      `SELECT * FROM question`
    );
    console.log("DB Result: getAllQuestions", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getQuestionFromThisWeek() {
  try {
    const result = await connection.query(
      `SELECT q.*, u.name AS userName FROM question q JOIN user u ON q.userId = u.userId WHERE YEAR(q.createdAt) = YEAR(CURDATE()) AND WEEK(q.createdAt) = WEEK(CURDATE());`
    );
    console.log("DB Result: getQuestionFromThisWeek", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getQuestionFromThisMonth() {
  try {
    const result = await connection.query(
      `SELECT q.*, u.name AS userName FROM question q JOIN user u ON q.userId = u.userId WHERE YEAR(q.createdAt) = YEAR(CURDATE()) AND MONTH(q.createdAt) = MONTH(CURDATE());`
    );
    console.log("DB Result: getQuestionFromThisMonth", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}


// ++++++++++++ answerOption ++++++++++++

async function addAnswerOption(answerOptionId, answerText, questionId) {
  try {
    const result = await connection.query(
      `INSERT INTO answerOption (answerOptionId, answerText, questionId) VALUES ('${answerOptionId}', '${answerText}', '${questionId}')`
    );
    console.log("answerOption erstellt", result);
    if (result.length === 0) {
      console.log("No question with this Id available");
      return null;
    }
    return "answerOption erstellt"; 
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getAnswerOptionById(answerOptionId) {
  try {
    const result = await connection.query(
      `SELECT answerOptionId, answerText, questionId FROM answerOption WHERE answerOptionId = '${answerOptionId}'`
    );
    console.log("DB Result: getAnswerOptionByID", result);
    if (result.length === 0) {
      console.log("No answerOption with this Id avilable");
      return null;
    }
    return result[0];
  } catch (e) {
    console.error(e);
  }
}

async function getAnswerOptionByQuestionId(questionId) {
  try {
    console.log("Question ID:", questionId); // Konsolenausgabe der Frage-ID
    const result = await connection.query(
      `SELECT ao.answerOptionId, ao.answerText, ao.questionId, CAST(COUNT(ao2.answerOptionId) AS SIGNED) AS optionCount, u.userId, u.name FROM answerOption ao JOIN (SELECT DISTINCT ag.answerOptionId, u.userId, u.name FROM answerGiven ag JOIN user u ON ag.userId = u.userId) u ON ao.answerOptionId = u.answerOptionId LEFT JOIN answerOption ao2 ON ao2.questionId = ao.questionId WHERE ao.questionId = '${questionId}' GROUP BY ao.answerOptionId, ao.answerText, ao.questionId, u.userId, u.name;`);
    console.log("DB Result: getAnswerOptionByQuestionID", result);
    if (result.length === 0) {
      console.log("No answerOption with this question Id available");
      return null;
    }
    const newData = result.map((item) => ({
      answerOptionId: item.answerOptionId,
      answerText: item.answerText,
      questionId: item.questionId,
      userId: item.userId,
      name: item.name,
      optionCount: Number(item.optionCount)

    }));
    console.log("newData: ", newData);
    return newData;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getAnswerOptionYesByQuestionId(questionId) {
  try {
    const result = await connection.query(
      `SELECT ao.answerOptionId, ao.answerText, CAST((SELECT COUNT(*) FROM answerOption AS a2 WHERE a2.questionId = '${questionId}') AS SIGNED) AS optionCount, u.name AS userName FROM answerOption AS ao JOIN answerGiven AS ag ON ao.answerOptionId = ag.answerOptionId JOIN user AS u ON ag.userId = u.userId WHERE ao.questionId = '${questionId}' AND ao.answerText = 'Ja';`
    );
    console.log("DB Result: getAnswerOptionYesByQuestionId", result);
    const newData = result.map(item => ({
      ...item,
      optionCount: Number(item.optionCount)

    }));
    return newData;

  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getAnswerOptionNoByQuestionId(questionId) {
  try {
    const result = await connection.query(
      `SELECT ao.answerOptionId, ao.answerText, CAST((SELECT COUNT(*) FROM answerOption AS a2 WHERE a2.questionId = '${questionId}') AS SIGNED) AS optionCount, u.name AS userName FROM answerOption AS ao JOIN answerGiven AS ag ON ao.answerOptionId = ag.answerOptionId JOIN user AS u ON ag.userId = u.userId WHERE ao.questionId = '${questionId}' AND ao.answerText = 'Nein';`
    );
    console.log("DB Result: getAnswerOptionNoByQuestionId", result);
    const newData = result.map(item => ({
      ...item,
      optionCount: Number(item.optionCount)

    }));
    return newData;

  } catch (e) {
    console.error(e);
    throw e;
  }
}

// ++++++++++++ answerGiven ++++++++++++

async function addAnswerGiven(answerOptionId, userId, answerGivenId, questionId) {
  try {
    await connection.query(
      `INSERT INTO answerGiven (answerOptionId, userId, answerGivenId, questionId) VALUES ('${answerOptionId}', '${userId}', '${answerGivenId}', '${questionId}')`
    );
    console.log("AnswerGiven inserted:", answerGivenId);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getAnswerGivenByQuestion(questionId) {
  try {
    const result = await connection.query(
      `SELECT * FROM answerGiven WHERE questionId = ?`,
      [questionId]
    );
    if (result.length === 0) {
      return null;
    }
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function getAnswerGivenByUser(userId) {
  try {
    const result = await connection.query(
      `SELECT * FROM answerGiven WHERE userId = '${userId}'`,
    );
    console.log("DB Result: getAnswerGivenByUser", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getAnswerGivenByUser(userId) {
  try {
    const result = await connection.query(
      `SELECT * FROM answerGiven WHERE userId = '${userId}'`,
    );
    console.log("DB Result: getAnswerGivenByUser", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function deleteQuestionById(questionId) {
  try {
    const result = await connection.query(
      `DELETE FROM question WHERE questionId = '${questionId}'`
    );
    // const result2 = await connection.query(
    //   `DELETE FROM answerOption WHERE questionId = '${questionId}'`
    // );
    // const result3 = await connection.query(
    //   `DELETE FROM answerGiven WHERE questionId = '${questionId}'`
    // );

    console.log("DB Result: deleteQuestionById", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}
async function getUserAnswersWithQuestionInfo(userId) {
  try {
    const result = await connection.query(
      `SELECT ag.*, q.title AS question_title, u_answer.name AS user_name, u_question.name AS question_creator, u_question.userId AS question_creator_id FROM answerGiven ag JOIN user u_answer ON ag.userId = u_answer.userId JOIN question q ON ag.questionId = q.questionId JOIN user u_question ON q.userId = u_question.userId WHERE ag.userId = '${userId}'`,
    );
    console.log("DB Result: getUserAnswersWithQuestionInfo", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getAnswersByUserAndQuestion(userId, questionId) {
  try {
    const result = await connection.query(
      `SELECT * FROM answerGiven WHERE userId = '${userId}' AND questionId = '${questionId}'`
    );
    console.log("DB Result: getAnswersByUserAndQuestion", result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserIdByEmailAndPassword,
  getUserById,
  connectToDb,
  getAnswerGivenByQuestion,
  getAnswerGivenByUser,
  getAnswerOptionById,
  getAnswerOptionByQuestionId,
  getAnswersByUserAndQuestion,
  getUserAnswersWithQuestionInfo,
  addAnswerGiven,
  addAnswerOption,
  createQuestion,
  getQuestionById,
  getQuestionsByUser,
  getAllQuestions,
  getQuestionFromThisWeek,
  getQuestionFromThisMonth,
  getQuestionActiveByUserId,
  getQuestionExpiredByUserId,
  deleteQuestionById,
  getAnswerOptionYesByQuestionId,
  getAnswerOptionNoByQuestionId,
  signUp,
  login,
};
