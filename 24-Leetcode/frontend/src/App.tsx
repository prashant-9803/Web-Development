import { useRef, useState } from "react";
import "./index.css";
import axios from "axios";

const BACKEND_URL = "http://localhost:4000";

export function App() {
  const [language, setLanguage] = useState("C++");
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  async function pollBackend(submissionId: string, counter = 3) {
    if (counter === 0) {
      return;
    }

    const response = await axios.get(
      `${BACKEND_URL}/submission/${submissionId}`,
    );

    if (response.data.status != "Processing") {
      setStatus(response.data.status);
      setOutput(response.data.response.output);
    } else {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });

      pollBackend(submissionId, --counter);
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-between ">
      <div className="flex-1 h-screen px-10 py-2 bg-zinc-900 text-zinc-300 p-2">
        <div className=" flex justify-between items-center bg-zinc-950 p-2 rounded-lg mb-4">
          <select
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option
              className="text-zinc-300 bg-zinc-800 text-md p-2 "
              value="C++"
            >
              C++
            </option>
            <option
              className="text-zinc-300 bg-zinc-800 text-md p-2 "
              value="Python"
            >
              Python
            </option>
            <option
              className="text-zinc-300 bg-zinc-800 text-md p-2 "
              value="JS"
            >
              JS
            </option>
          </select>

          <button
            className="bg-blue-800 px-3 py-2 rounded-2xl"
            onClick={async () => {
              setStatus("Processing");
              setOutput("");
              const response = await axios.post(`${BACKEND_URL}/submission`, {
                language: language,
                code: textAreaRef.current!.value,
              });

              await pollBackend(response.data.submissionId);
            }}
          >
            Submit
          </button>
        </div>

        <textarea
          ref={textAreaRef}
          className="h-[95%] w-full p-2 border border-zinc-400 "
        />
      </div>

      <div className="flex-1 bg-zinc-950 text-zinc-200 text-lg">
        <div className="flex items-baseline ">
          <p className="text-3xl p-2 m-2 text-zinc-200">Output</p>
          <p
            className={`text-sm ${
              status === "Processing"
                ? "text-yellow-600"
                : status === "Failure"
                  ? "text-red-500"
                  : "text-green-500"
            }`}
          >
            {status}
          </p>{" "}
        </div>
        <div className="bg-zinc-800 rounded-3xl h-[80%] mr-4  p-5">
          {output}
        </div>
      </div>
    </div>
  );
}

export default App;
