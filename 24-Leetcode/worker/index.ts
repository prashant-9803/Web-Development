import { createClient } from "redis";
import fs from "fs";
import { spawn } from "child_process";
import { prisma } from "./db";

const client = createClient();
client.connect().then(async () => {
  while (1) {
    const response = await client.rPop("problems");

    if (!response) {
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }

    const parsedResponse = JSON.parse(response);
    const { code, language, submissionId } = parsedResponse;

    console.log("Processing submission: ", submissionId);
    let finalOutput = "";

    // TODO: add a timeout so that if the user code takes more thatn 5 seconds to execute -> change status to DB as "TLE"

    if (language === "C++") {
      console.log("Running users c++ code");

      const filePath = __dirname + "/code/a.cpp";
      fs.writeFileSync(filePath, code);

      // compile
      let processCompiler = spawn("g++", [filePath, "-o", "./code/out"]);

      let exitCodeCompiler = null;

      // check if compilation failed
      await new Promise<void>((resolve) => {
        processCompiler.on("exit", async (exitCode) => {
          exitCodeCompiler = exitCode;
          if (exitCode != 0) {
            await prisma.submission.update({
              where: {
                id: submissionId,
              },
              data: {
                status: "Failure",
              },
            });
          }
          resolve();
        });
      });

      if (exitCodeCompiler != 0) {
        continue;
      }

      //run
      let process = spawn("./code/out");

      //print
      process.stdout.on("data", (chunk) => {
        finalOutput += chunk.toString();
      });

      await new Promise<void>((resolve) => {
        process.on("exit", async () => {
          await prisma.submission.update({
            where: {
              id: submissionId,
            },
            data: {
              status: "Success",
              output: finalOutput,
            },
          });
        });
        resolve();
      });
    }

    if (language === "JS") {
      console.log("Running users JS code");

      const filePath = __dirname + "/code/a.js";
      fs.writeFileSync(filePath, code);

      //start a new process
      const process = spawn("node", [filePath]);
      process.stdout.on("data", (chunk) => {
        finalOutput += chunk.toString();
      });

      await new Promise<void>((resolve) => {
        process.on("exit", async (exitCode) => {
          if (exitCode == 0) {
            await prisma.submission.update({
              where: {
                id: submissionId,
              },
              data: {
                status: "Success",
                output: finalOutput,
              },
            });
          } else {
            await prisma.submission.update({
              where: {
                id: submissionId,
              },
              data: {
                status: "Failure",
              },
            });
          }
          resolve();
        });
      });
    }

    if (language == "Python") {
      console.log("RUnning PY Code");

      const filePath = __dirname + "/code/a.py";
      fs.writeFileSync(filePath, code);

      const process = spawn("python", [filePath]);
      process.stdout.on("data", (chunk) => {
        finalOutput += chunk.toString();
      });

      await new Promise<void>((resolve) => {
        process.on("exit", async (exitCode) => {
          if (exitCode == 0) {
            await prisma.submission.update({
              where: {
                id: submissionId,
              },
              data: {
                status: "Success",
                output: finalOutput,
              },
            });
          } else {
            await prisma.submission.update({
              where: {
                id: submissionId,
              },
              data: {
                status: "Failure",
              },
            });
          }
          resolve();
        });
      });
    }
  }
});
