/*first*/

const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "cricketMatchDetails.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
let word = null;
const checking_1 = (requestquery) => {
  return (
    requestquery.priority !== undefined && requestquery.status !== undefined
  );
};
const checking_2 = (requestquery) => {
  return requestquery.priority !== undefined;
};
const checking_3 = (requestquery) => {
  return requestquery.status !== undefined;
};
app.get(`/todos/`, async (request, response) => {
  const { term = "", priority, status } = request.query;
  switch (true) {
    case checking_1(requestquery):
      dbterms = `select * from todo where todo like '%${term}%' and status='${status}' and priority='${priority}';`;
      break;

    case checking_2(requestquery):
      dbterms = `select * from todo where todo like'%${term}%' and priority='${priority}';`;
      break;
    case checking_3(requestquery):
      dbterms = `select * from todo where todo like'%${term}%' and priority='${priority}';`;
      break;
    default:
      dbterms = `select * from todo where todo like '%${term}%';`;
  }

  word = await db.get(dbterms);
  response.send(word);
});
