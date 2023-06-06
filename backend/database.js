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
    console.log("DB Result: getanswerOptionByID", result);
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

async function createQuestion(questionId, title, type, userId, qrCode, questionLink, identifikation, wiederverwendung, ergebniseinsicht) {
  try {
    await connection.query(
      `INSERT INTO question (questionId, createdAt, title, type, userId, qrCode, questionLink, identifikation, wiederverwendung, ergebniseinsicht) VALUES ('${questionId}', LOCALTIME, '${title}', '${type}', '${userId}', '${qrCode}', '${questionLink}', '${identifikation}', '${wiederverwendung}', '${ergebniseinsicht}')`
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

async function getQuestionsByUser(userId) {
  try {
    const result = await connection.query(
      `SELECT questionId, title, createdAt, userId FROM question WHERE userId = '${userId}'`
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
      `SELECT * FROM answerOption WHERE questionId = '${questionId}'`
    );
    console.log("DB Result: getAnswerOptionByQuestionID", result);
    if (result.length === 0) {
      console.log("No answerOption with this question Id available");
      return null;
    }
    return result;
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


async function getAnswerGivenByAnswerOption(answerOptionId) {
  try {
    const result = await connection.query(
      `SELECT answerGivenId, userId FROM answerGiven WHERE answerOptionId = ?`,
      [answerOptionId]
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

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserIdByEmailAndPassword,
  getUserById,
  connectToDb,
  getAnswerGivenByAnswerOption,
  getAnswerGivenByQuestion,
  getAnswerOptionById,
  getAnswerOptionByQuestionId,
  addAnswerGiven,
  addAnswerOption,
  createQuestion,
  getQuestionById,
  getQuestionsByUser,
  getAllQuestions,
  signUp,
  login,
};
