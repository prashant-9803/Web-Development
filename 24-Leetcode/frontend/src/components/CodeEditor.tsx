import { useRef, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { LANGUAGE_PLACEHOLDERS, LANGUAGE_LABELS } from "@/lib/constants";

interface LineNumbersProps {
  count: number;
  gutterRef: React.RefObject<HTMLDivElement | null>;
}

function LineNumbers({ count, gutterRef }: LineNumbersProps) {
  const displayCount = Math.max(count, 26);
  return (
    <div
      ref={gutterRef}
      className="flex flex-col pt-4 pb-4 pl-3 pr-2 text-right font-mono text-[13px] leading-[1.7] text-white/[0.14] select-none shrink-0 bg-[#09090b] border-r border-white/[0.04] w-11 overflow-hidden"
    >
      {Array.from({ length: displayCount }, (_, i) => (
        <span key={i}>{i + 1}</span>
      ))}
    </div>
  );
}

interface CodeEditorProps {
  language: string;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
  onRun?: () => void;
}

export function CodeEditor({ language, textAreaRef, onRun }: CodeEditorProps) {
  const { ext, runtime } = LANGUAGE_LABELS[language] ?? { ext: "txt", runtime: "" };
  const initialLines = (LANGUAGE_PLACEHOLDERS[language] ?? "").split("\n").length;
  const [lineCount, setLineCount] = useState(initialLines);
  const gutterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLineCount((LANGUAGE_PLACEHOLDERS[language] ?? "").split("\n").length);
  }, [language]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onRun?.();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.setRangeText("    ", start, end, "end");
      setLineCount(textarea.value.split("\n").length);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 border-r border-white/[0.05]">
      {/* Tab strip */}
      <div className="flex items-end h-9 bg-[#0d0d10] shrink-0 border-b border-white/[0.05] px-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#09090b] border border-b-0 border-white/[0.07] rounded-t-md text-[11px] text-white/60">
          <span className="w-2 h-2 rounded-full bg-violet-400/60 shrink-0" />
          <span className="font-mono">solution.{ext}</span>
        </div>
      </div>

      {/* Line numbers + Textarea */}
      <div className="flex flex-1 overflow-hidden bg-[#09090b]">
        <LineNumbers count={lineCount} gutterRef={gutterRef} />
        <Textarea
          key={language}
          ref={textAreaRef}
          defaultValue={LANGUAGE_PLACEHOLDERS[language]}
          spellCheck={false}
          onChange={(e) => setLineCount(e.target.value.split("\n").length)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none rounded-none border-0 bg-transparent text-[#cdd6f4] font-mono text-[13px] leading-[1.7] p-4 pl-3 focus-visible:ring-0 focus-visible:outline-none placeholder:text-white/15 selection:bg-violet-500/25 overflow-auto"
        />
      </div>

      {/* Editor footer */}
      <div className="flex items-center gap-4 px-4 h-6 border-t border-white/[0.04] bg-[#0d0d10] shrink-0 text-[10px] text-white/25 font-mono">
        <span>{runtime}</span>
        <span>UTF-8</span>
        <span>LF</span>
        <div className="ml-auto flex items-center gap-1">
          <span className="text-white/15">Press</span>
          <kbd className="bg-white/[0.04] border border-white/[0.07] px-1 rounded text-[9px]">
            Ctrl
          </kbd>
          <span className="text-white/15">+</span>
          <kbd className="bg-white/[0.04] border border-white/[0.07] px-1 rounded text-[9px]">
            Enter
          </kbd>
          <span className="text-white/15">to run</span>
        </div>
      </div>
    </div>
  );
}
