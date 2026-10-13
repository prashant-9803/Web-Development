import { createClient } from "redis";

const client = createClient();
client.connect().then(async () => {
  while (1) {
    const response = await client.rPop("problems");

    if (!response) {
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }

    const parsedResponse = JSON.parse(response)
    const {code, language, userId, questionId} = parsedResponse

    // console.log("Processing question for user" + userId)

    if(language === "C++" ) {
        console.log("Running users c++ code")
        await new Promise((r) => setTimeout(r,10000))
    }

    if(language === "JS" ) {
        console.log("Running users JS code")
        await new Promise((r) => setTimeout(r,4000))
    }


    // update the status in DB
  }
});
