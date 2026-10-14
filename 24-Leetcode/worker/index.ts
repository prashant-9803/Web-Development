import { createClient } from "redis";
import fs from "fs";
import { spawn } from "child_process";

const client = createClient();
client.connect().then(async () => {
  while (1) {
    const response = await client.rPop("problems");

    if (!response) {
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }

    const parsedResponse = JSON.parse(response);
    const { code, language, userId } = parsedResponse;

    // console.log("Processing question for user" + userId)

    if (language === "C++") {
      console.log("Running users c++ code");
      // fake run
      // await new Promise((r) => setTimeout(r, 10000));

      const filePath = __dirname + "/code/a.cpp";
      fs.writeFileSync(filePath, code);

      // compile
      let process = spawn("g++", [filePath, "-o", "./code/out"]);

      // fake wait to compile
      await new Promise((r) => setTimeout(r, 2000));

      //run
      process = spawn("./code/out");

      //print
      process.stdout.on("data", (chunk) => {
        console.log(chunk.toString());
      });
    }

    if (language === "JS") {
      console.log("Running users JS code");

      const filePath = __dirname + "/code/a.js";
      fs.writeFileSync(filePath, code);

      //start a new process
      const process = spawn("node", [filePath]);
      process.stdout.on("data", (chunk) => {
        console.log(chunk.toString());
      });
    }

    if (language == "Python") {
      console.log("RUnning PY Code");

      const filePath = __dirname + "/code/a.py";
      fs.writeFileSync(filePath, code);

      const process = spawn("python", [filePath]);
      process.stdout.on("data", (chunk) => {
        console.log(chunk.toString());
      });
    }

    // update the status in DB
  }
});
