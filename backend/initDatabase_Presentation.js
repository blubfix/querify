const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  port: 3306,
  user: "alfred",
  password: "alfred1",
  database: "wishhzDB",
  connectionLimit: 5,
  
});

//**IMPORTANT: changed table user column geburtstag from dates to varchar * 

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
        password VARCHAR(100),
        geburtstag VARCHAR(100),
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
        type ENUM('poll', 'multi', 'free', 'feeling', 'reminder'),
        minimumNumberOfAnswers TINYINT,
        qrCode TEXT,
        questionLink VARCHAR(255),
        identifikation ENUM('undefined','anonyme Abstimmung', 'nach Namen fragen, anderen aber nicht anzeigen', 'nach Namen fragen & für alle anzeigen'),
        ergebniseinsicht ENUM('undefined','vor ihrer Abstimmung sehen', 'nach ihrer Abstimmung sehen', 'nach dem Umfragestichtag'),
        wiederverwendung ENUM('undefined','als Vorlage gespeichert', '60 Tagen nach dem Umfragestichtag gelöscht'),
        bewertung VARCHAR(255),
        date VARCHAR(255),
        description VARCHAR(255),
        multi VARCHAR(255),
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
      ('YKTZcW5556', 'Laurin@test.de', '$2b$05$lG9qdRHQpg.g5rGbiksOBuaMg.e5sZFw9D2L1hQMiz6XrOHB1rKmm', 'Laurin', '16.04.1998'),
      ('oSRELp8896','Jason@test.de','$2b$05$X23/cBKZP5aHOB2RKVGXfemV15A56URzlZYfJtYccexVGWz7JCEty','Jason','01.01.2023'),
      ('ndJjQN6103','Robin@test.de','$2b$05$ZLuiZxMZStieSYTsL6x6z.JXfR0BrMr8N7Zzcr9xK8UdtKztYF3s.','Robin','01.01.2023'),
      ('MQNGjl6152','Lewin@test.de','$2b$05$AEILcm5nopXnOmrvYbjx9OGBYJ2yw9QmBBs0EPjKZA5claoEvXhcG','Lewin','01.01.2023'),
      ('HgYrUJ9906','Maathu@test.de','$2b$05$A2ThnigYTVp1J5RYXTk/gurTXExUdwt7UJhCsJxZ9ocQVkiF/NFHe','Maathu','01.01.2023'),
      ('CBlpyd3143','Jenni@test.de','$2b$05$toPrSSSVzlnYt1RmTAwZ8.PvnHV5HDM339fVaKsYKZWgrnZJil2la','Jenni','01.01.2023'),
      ('aYiezL7854','Celine@test.de','$2b$05$6w7/mfSh52HGdz7LM3dfq.8FF32DHxpKChnNxbrh54IKOXW909VOC','Celine','01.01.2023')
      `
    );
    console.log("DONE!");

    console.log("Creating question data...");
    await connection.query(
      `INSERT INTO question (questionId, title, createdAt, userId, type, minimumNumberOfAnswers, qrCode, questionLink, identifikation, ergebniseinsicht, wiederverwendung, bewertung, date, description, multi) VALUES
       ('LmDhnu0117','App-Feedback','2023-10-04 16:35:30','YKTZcW5556','feeling','1','qrCodeBase64','https://querify.com/question/LmDhnu0117','undefined','undefined','undefined','stars','07.10.2023','Wie findest du die App?\nBewerte in Sternen','null'),
       ('rsrTHz2931','Änderungen am Design?','2023-10-04 17:32:29','YKTZcW5556','free',1,'qrCodeBase64','https://querify.com/question/rsrTHz2931','anonyme Abstimmung','undefined','undefined','undefined','07.10.2023','Habt ihr noch Vorschläge für Design Änderungen ?','null'),
       ('OLQfqx2123','Wochenendplanung','2023-10-04 17:32:55','aYiezL7854','poll',1,'qrCodeBase64','https://querify.com/question/OLQfqx2123','undefined','undefined','undefined','undefined','08.10.2023','Habt ihr etwas vor am Wochenende?','null'),
       ('CnCphw0649','Wahlfach','2023-10-04 17:35:27','YKTZcW5556','multi',1,'qrCodeBase64','https://querify.com/question/CnCphw0649','undefined','undefined','undefined','undefined','15.10.2023','Welches Wahlfach wählst du ?','Software Integration,Internet of Things,Scientific Publishing')
       
       `
    );
    console.log("DONE!");

    console.log("Creating answerOption data...");
    await connection.query(
      `INSERT INTO answerOption (answerOptionId, answerText, questionId) VALUES
      ('VhZDbJ3559','4','LmDhnu0117'),
      ('UlWLWe8172','4','LmDhnu0117'),
      ('HcgYLh7278','Software Integration','CnCphw0649'),
      ('evdwUP1338','Ja','OLQfqx2123'),
      ('bKPirL1499','Finde das Design so gut :D','rsrTHz2931')`
    );
    console.log("DONE!");

    console.log("Creating answerGiven data...");
    await connection.query(
      `INSERT INTO answerGiven (answerGivenId, userId, answerOptionId, questionId) VALUES      
      ('Kfmpne8109','YKTZcW5556','VhZDbJ3559','LmDhnu0117'),
      ('rNivhK6112','YKTZcW5556','evdwUP1338','OLQfqx2123'),
      ('RqixQF2487','YKTZcW5556','HcgYLh7278','CnCphw0649'),
      ('rvlBLz1798','oSRELp8896','UlWLWe8172','LmDhnu0117'),
      ('wqroLn1043','ndJjQN6103','bKPirL1499','rsrTHz2931')
      `
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

async function initDB_Presentation() {
  console.log("Connecting to DB...");
  await connectToDb();
  console.log("Creating tables...");
  await createTables();
  console.log("Creating data...");
  await createData();
  process.exit();
}

initDB_Presentation();
