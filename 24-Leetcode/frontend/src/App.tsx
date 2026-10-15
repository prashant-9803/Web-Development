import { useRef, useState } from "react";
import "./index.css";
import axios from "axios";
import { BACKEND_URL, LANGUAGE_LABELS, type Status } from "./lib/constants";
import { TopBar } from "./components/TopBar";
import { CodeEditor } from "./components/CodeEditor";
import { OutputPanel } from "./components/OutputPanel";


export function App() {
  const [language, setLanguage] = useState("C++");
  const [status, setStatus] = useState<Status>("");
  const [output, setOutput] = useState("");
  const [stdErr, setStdErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  async function pollBackend(submissionId: string, counter = 6) {
    if (counter === 0) {
      setStatus("Failure");
      setStdErr("Submission timed out.");
      setIsLoading(false);
      return;
    }

    const response = await axios.get(
      `${BACKEND_URL}/submission/${submissionId}`,
    );

    if (response.data.status !== "Processing") {
      setStatus(response.data.status);
      setOutput(response.data.response?.output ?? "");
      setStdErr(response.data.response?.stdErr ?? "");
      setIsLoading(false);
    } else {
      await new Promise<void>((resolve) => setTimeout(resolve, 3000));
      pollBackend(submissionId, --counter);
    }
  }

  async function handleRun() {
    setStatus("Processing");
    setOutput("");
    setStdErr("");
    setIsLoading(true);

    const response = await axios.post(`${BACKEND_URL}/submission`, {
      language,
      code: textAreaRef.current!.value,
    });

    await pollBackend(response.data.submissionId);
  }

  const runtimeLabel = LANGUAGE_LABELS[language]?.runtime ?? "";

  return (
    <div
      className="dark h-screen w-screen overflow-hidden bg-[#09090b] flex flex-col"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-indigo-600/8 rounded-full blur-3xl" />
      </div>

      <TopBar
        language={language}
        isLoading={isLoading}
        onLanguageChange={setLanguage}
        onRun={handleRun}
      />

      <div className="flex flex-1 overflow-hidden relative z-0">
        <CodeEditor
          language={language}
          textAreaRef={textAreaRef}
          onRun={handleRun}
        />

        <OutputPanel
          status={status}
          output={output}
          stdErr={stdErr}
          isLoading={isLoading}
          runtimeLabel={runtimeLabel}
        />
      </div>
    </div>
  );
}

export default App;