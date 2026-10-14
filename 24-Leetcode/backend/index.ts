import express from "express";
import redis, { createClient } from "redis";
import { prisma } from "./db";

const app = express();

// redis connection
const client = createClient();
client.connect();

app.use(express.json());

app.post("/submission", async (req, res) => {
  const { code, language } = req.body;

  // put this entry in DB
  const response = await prisma.submission.create({
    data: {
      code,
      language,
      status: "Processing",
    },
  });

  client.lPush(
    "problems",
    JSON.stringify({ submissionId: response.id, code, language }),
  );

  res.json({
    message: "Processing",
    submissionId: response.id,
  });
});

// polling api
app.get("/submission/:submissionId", async (req, res) => {
  const submissionId = req.params.submissionId;

  const response = await prisma.submission.findFirst({
    where: {
      id: submissionId,
    },
  });

  res.json({
    status: response?.status,
    response
  })
});

app.listen(3000, () => {
  console.log("Server listnening on port 3000");
});
