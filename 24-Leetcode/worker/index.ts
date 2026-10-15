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
    let finalStdErr = "";

    // TODO: add a timeout so that if the user code takes more thatn 5 seconds to execute -> change status to DB as "TLE"

    if (language === "C++") {
      console.log("Running users c++ code");

      const filePath = __dirname + "/code/a.cpp";
      const outputPath = __dirname + "/code/out";

      //create file
      fs.writeFileSync(filePath, code);

      // compile
      let processCompiler = spawn("g++", [filePath, "-o", "./code/out"]);

      let exitCodeCompiler = null;

      // if compilation throws error
      processCompiler.stderr.on("data", (chunk) => {
        finalStdErr += chunk.toString();
      });

      // Wait for compilation to finish
      await new Promise<void>((resolve, reject) => {
        processCompiler.on("error", reject);
        processCompiler.on("close", (exitCode) => {
          exitCodeCompiler = exitCode;
          resolve();
        });
      });

      // Compilation failed
      if (exitCodeCompiler !== 0) {
        await prisma.submission.update({
          where: {
            id: submissionId,
          },
          data: {
            status: "Failure",
            stdErr: finalStdErr,
          },
        });
        continue;
      }

      //run
      const process = spawn(outputPath);

      // Stop programs that run longer than 5 seconds
      let timeOut = false
      const timer = setTimeout(() => {
        timeOut = true
        process.kill("SIGKILL")
      }, 5000);

      //print
      process.stdout.on("data", (chunk) => {
        finalOutput += chunk.toString();
      });

      // if error
      process.stderr.on("data", (chunk) => {
        finalStdErr += chunk.toString();
      });


      await new Promise<void>((resolve, reject) => {
        process.on("error", reject)
        process.on("close", (exitCode) => {
          clearTimeout(timer)
          resolve()
        })
      })

      const success = !timeOut && process.exitCode === 0

      await prisma.submission.update({
        where: {
          id: submissionId
        },
        data: {
          status: success ? "Success" : "Failure",
          output: finalOutput,
          stdErr: timeOut ? "Execution timeout after 5 secs" : finalStdErr
        }
      })

      
    }

    if (language === "JS") {
      let filePath = __dirname + "/code/a.js"
      let finalOutput = ""
      let finalStdErr = ""
      
      // write file
      fs.writeFileSync(filePath, code)

      //run file
      const process = spawn("node", [filePath])

      // Start timer of 5 secs
      let timeOut = false
      const timer = setTimeout(() => {
          timeOut = true
          process.kill("SIGKILL")
      }, 5000);

      process.stdout.on("data", (chunk) => {
        finalOutput += chunk.toString()
      })

      process.stderr.on("data" , (chunk) => {
        finalStdErr += chunk.toString()
      })

      await new Promise<void>((resolve, reject) => {
        process.on("error", reject)
        process.on("close", () => {
          clearTimeout(timer)
          resolve()
        })
      })

      const success = !timeOut && process.exitCode === 0

      await prisma.submission.update({
        where: {
          id: submissionId
        },
        data: {
          status: success ? "Success" : "Failure",
          output: finalOutput,
          stdErr: timeOut ? "Execution timed out after 5 secs" : finalStdErr
        }
      })


    }

    if (language == "Python") {
      console.log("Running PY Code");

      const filePath = __dirname + "/code/a.py";
      
      fs.writeFileSync(filePath, code);

      const process = spawn("python", [filePath]);

      let timeOut = false
      const timer = setTimeout(() => {
        timeOut = true
        process.kill("SIGKILL")
      }, 5000);


      process.stdout.on("data", (chunk) => {
        finalOutput += chunk.toString();
      });

      process.stderr.on("data", (chunk) => {
        finalStdErr += chunk.toString()
      })

      

      await new Promise<void>((resolve, reject) => {
        process.on("error", reject)
        process.on("close", () => {
          clearTimeout(timer)
          resolve()
        })
      });

      const success = !timeOut && process.exitCode === 0

      await prisma.submission.update({
        where: {
          id: submissionId
        },
        data: {
          status: success ? "Success" : "Failure",
          output: finalOutput,
          stdErr: timeOut ? "Execution timed out after 5 secs" : finalStdErr
        }
      })
    }
  }
});
