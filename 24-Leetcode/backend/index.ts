import express from "express";
import redis, { createClient } from "redis";

const app = express();

// redis connection
const client = createClient();
client.connect();

app.use(express.json());

app.post("/submission", (req, res) => {
  const { userId, code, language } = req.body;

  // put this entry in DB

  client.lPush(
    "problems",
    JSON.stringify({ userId, code, language }),
  );

  res.json({
    message: "Processing",
  });
});

app.get("/submission", (req, res) => {});





app.listen(3000, () => {
  console.log("Server listnening on port 3000");
});
