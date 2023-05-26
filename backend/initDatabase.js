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
  } catch (err) {
    throw err;
  } finally {
    if (connection) return connection.end();
  }
}

async function createTables() {
  try {
    console.log("Creating user table...");
    await connection.query(
      `CREATE TABLE IF NOT EXISTS user (
        userId VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(50),
        geburtstag DATE,
        name VARCHAR(50),
        PRIMARY KEY (userId)
      );`
    );
    console.log("DONE!");
    console.log("Creating question table...");
    await connection.query(
      `CREATE TABLE IF NOT EXISTS question (
        questionId CHAR(10),
        title VARCHAR(255),
        createdAt TIMESTAMP,
        userId VARCHAR(100),
        type ENUM('poll', 'multi', 'free'),
        qrCode TEXT,
        questionLink VARCHAR(255),
        identifikation ENUM('anonyme Abstimmung', 'nach Namen fragen, anderen aber nicht anzeigen', 'nach Namen fragen & für alle anzeigen'),
        ergebniseinsicht ENUM('vor ihrer Abstimmung sehen', 'nach ihrer Abstimmung sehen', 'nach dem Umfragestichtag'),
        wiederverwendung ENUM('als Vorlage gespeichert', '60 Tagen nach dem Umfragestichtag gelöscht'),
        PRIMARY KEY (questionId),
        FOREIGN KEY (userId) REFERENCES user(userId)
      );`
    );
    console.log("DONE!");
    console.log("Creating answerOption table...");
    await connection.query(
      `CREATE TABLE IF NOT EXISTS answerOption (
        answerOptionId CHAR(10),
        answerText VARCHAR(255),
        questionId CHAR(10),
        PRIMARY KEY (answerOptionId),
        FOREIGN KEY (questionId) REFERENCES question(questionId)
      );`
    );
    console.log("DONE!");
    console.log("Creating answerGiven table...");
    await connection.query(
      `CREATE TABLE IF NOT EXISTS answerGiven (
        answerGivenId CHAR(10),
        userId CHAR(10),
        answerOptionId CHAR(10),
        questionId CHAR(10),
        PRIMARY KEY (answerGivenId),
        FOREIGN KEY (questionId) REFERENCES question(questionId),
        FOREIGN KEY (answerOptionId) REFERENCES answerOption(answerOptionId),
        FOREIGN KEY (userId) REFERENCES user(userId)
      );`
    );
    console.log("DONE!");
    console.log("+++++++++++++++++++++++++++++++");
    console.log("All tables successfully created!");
    console.log("+++++++++++++++++++++++++++++++");
  } catch (e) {
    console.log("Error while creating tables:");
    console.error(e);
  }
}

async function createData() {
  try {
    console.log("Creating user data...");
    await connection.query(
      `INSERT INTO user (userId, email, password, name, geburtstag) VALUES
      ('AAAAAA1111', 'Tobi@mail.de', 'pw123', 'Uwe', '1987-02-24'),
      ('BBBBBB2222', 'Clara@mail.de', 'password', 'Franzi', '2001-04-13'),
      ('CCCCCC3333', 'Tim@mail.de', '123456', 'Renate', '1998-07-19'),
      ('DDDDDD4444', 'Anna@mail.de', 'secret', 'Lena', '1995-10-05'),
      ('EEEEEE5555', 'Max@mail.de', 'pass123', 'Paul', '1990-12-31')`
    );
    console.log("DONE!");

    console.log("Creating question data...");
    await connection.query(
      `INSERT INTO question (questionId, title, createdAt, userId, type, qrCode, questionLink, identifikation, ergebniseinsicht, wiederverwendung) VALUES
      ('ABCDEF1234', 'Wie oft treibst du Sport pro Woche?', CURRENT_TIMESTAMP, 'AAAAAA1111', 'free', 'qrCodeBase64', 'https://querify.com/question/ABCDEF1234', 'anonyme Abstimmung', 'vor ihrer Abstimmung sehen', 'als Vorlage gespeichert'),
      ('YYYYYY8888', 'Was ist deine Lieblingsfarbe?', CURRENT_TIMESTAMP, 'BBBBBB2222', 'multi', 'qrCodeBase64', 'https://querify.com/question/YYYYYY8888', 'nach Namen fragen, anderen aber nicht anzeigen', 'nach ihrer Abstimmung sehen', 'als Vorlage gespeichert'),
      ('EFGHIJ5678', 'Welches Buch hast du zuletzt gelesen?', CURRENT_TIMESTAMP, 'AAAAAA1111', 'poll', 'qrCodeBase64', 'https://querify.com/question/EFGHIJ5678', 'nach Namen fragen & für alle anzeigen', 'nach dem Umfragestichtag', '60 Tagen nach dem Umfragestichtag gelöscht'),
      ('KLMNOP9999', 'Wie viel Zeit verbringst du täglich mit dem Lesen von Nachrichten?', CURRENT_TIMESTAMP, 'CCCCCC3333', 'free', 'qrCodeBase64', 'https://querify.com/question/KLMNOP9999', 'anonyme Abstimmung', 'nach ihrer Abstimmung sehen', 'als Vorlage gespeichert'),
      ('UVWXYZ7777', 'Welches Land möchtest du gerne bereisen?', CURRENT_TIMESTAMP, 'DDDDDD4444', 'poll', 'qrCodeBase64', 'https://querify.com/question/UVWXYZ7777', 'anonyme Abstimmung', 'vor ihrer Abstimmung sehen', 'als Vorlage gespeichert')`
    );
    console.log("DONE!");

    console.log("Creating answerOption data...");
    await connection.query(
      `INSERT INTO answerOption (answerOptionId, answerText, questionId) VALUES
      ('ABABAB1212', 'Zwei Mal pro Woche', 'ABCDEF1234'),
      ('BCBCBC3131', 'Blau', 'YYYYYY8888'),
      ('DEDEDE4545', 'Paraquay', 'UVWXYZ7777'),
      ('FGFGFG6767', 'Rot', 'YYYYYY8888'),
      ('HIHIHI8989', '>2 Stunden', 'KLMNOP9999')`
    );
    console.log("DONE!");

    console.log("Creating answerGiven data...");
    await connection.query(
      `INSERT INTO answerGiven (answerGivenId, userId, answerOptionId, questionId) VALUES
      ('ZYZYZY9898', 'BBBBBB2222', 'ABABAB1212', 'ABCDEF1234'),
      ('XWXWXW7676', 'CCCCCC3333', 'BCBCBC3131', 'YYYYYY8888'),
      ('AQWSED1234', 'AAAAAA1111', 'DEDEDE4545', 'ABCDEF1234'),
      ('YHBGVF5678', 'DDDDDD4444', 'FGFGFG6767', 'YYYYYY8888'),
      ('UIOKLJ9090', 'EEEEEE5555', 'HIHIHI8989', 'EFGHIJ5678')`
    );
    console.log("DONE!");

    console.log("+++++++++++++++++++++++++++++++");
    console.log("All data successfully created!");
    console.log("+++++++++++++++++++++++++++++++");
  } catch (e) {
    console.log("Error while creating data:");
    console.error(e);
  }
}

async function initDB() {
  console.log("Connecting to DB...");
  await connectToDb();
  console.log("Creating tables...");
  await createTables();
  console.log("Creating data...");
  await createData();
  process.exit();
}

initDB();
