import {
  Terminal,
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { type Status } from "@/lib/constants";

interface StatusInfo {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
}

const STATUS_CONFIG: Record<Status, StatusInfo> = {
  "": { label: "", color: "", bg: "", border: "", icon: null },
  Processing: {
    label: "Running",
    color: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  },
  Success: {
    label: "Accepted",
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  Failure: {
    label: "Error",
    color: "text-red-300",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

interface OutputPanelProps {
  status: Status;
  output: string;
  stdErr: string;
  isLoading: boolean;
  runtimeLabel: string;
}

export function OutputPanel({
  status,
  output,
  stdErr,
  isLoading,
  runtimeLabel,
}: OutputPanelProps) {
  const s = STATUS_CONFIG[status];

  return (
    <div className="w-[44%] min-w-[320px] flex flex-col bg-[#0b0b0e]">
      {/* Header */}
      <div className="flex items-center h-9 px-4 border-b border-white/[0.05] bg-[#0d0d10] shrink-0 gap-3">
        <Terminal className="w-3.5 h-3.5 text-white/30" />
        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
          Output
        </span>
        {status && (
          <div
            className={`ml-auto flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${s.color} ${s.bg} ${s.border} transition-all duration-300`}
          >
            {s.icon}
            {s.label}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        {!status && <IdleState />}
        {status === "Processing" && <ProcessingState />}
        {(status === "Success" || status === "Failure") && (
          <ResultState
            status={status}
            output={output}
            stdErr={stdErr}
            runtimeLabel={runtimeLabel}
            s={s}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 h-6 border-t border-white/[0.04] bg-[#0d0d10] shrink-0 text-[10px] font-mono">
        <div className="flex items-center gap-1.5">
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              isLoading
                ? "bg-amber-400 animate-pulse"
                : status === "Success"
                  ? "bg-emerald-400"
                  : status === "Failure"
                    ? "bg-red-400"
                    : "bg-white/15"
            }`}
          />
          <span className="text-white/25">
            {isLoading ? "running" : status ? status.toLowerCase() : "idle"}
          </span>
        </div>
        <span className="text-white/15">CodeRunner v1.0</span>
      </div>
    </div>
  );
}

function IdleState() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-8">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
          <Terminal className="w-7 h-7 text-white/10" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#09090b] border border-white/[0.06] flex items-center justify-center">
          <Play className="w-2.5 h-2.5 text-white/20 fill-current" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-[13px] text-white/30 font-medium">
          Ready to execute
        </p>
        <p className="text-[11px] text-white/15 mt-1">
          Write your code and click Run
        </p>
      </div>
    </div>
  );
}

function ProcessingState() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5 p-8">
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full border-2 border-violet-500/15 animate-ping"
          style={{ animationDuration: "1.5s" }}
        />
        <div
          className="absolute inset-2 rounded-full border border-violet-500/25 animate-ping"
          style={{ animationDuration: "1.5s", animationDelay: "0.3s" }}
        />
        <div className="absolute inset-0 rounded-full bg-violet-500/5 border border-violet-500/20 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-[13px] text-white/50 font-medium">
          Executing code…
        </p>
        <p className="text-[11px] text-white/20 mt-1 animate-pulse">
          Running on remote worker
        </p>
      </div>
    </div>
  );
}

interface ResultStateProps {
  status: Status;
  output: string;
  stdErr: string;
  runtimeLabel: string;
  s: StatusInfo;
}

function ResultState({
  status,
  output,
  stdErr,
  runtimeLabel,
  s,
}: ResultStateProps) {
  return (
    <div className="p-4 flex flex-col gap-3 font-mono text-[12.5px]">
      {/* Result banner */}
      <div
        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border ${s.bg} ${s.border}`}
      >
        <span className={s.color}>{s.icon}</span>
        <span className={`font-semibold ${s.color}`}>{s.label}</span>
        <span className="text-white/25 text-[10px] ml-auto">{runtimeLabel}</span>
      </div>

      {/* stdout */}
      {output && (
        <div className="flex flex-col gap-1.5">
          <SectionLabel label="stdout" />
          <pre className="text-emerald-300/80 leading-relaxed whitespace-pre-wrap break-words bg-[#0d1f16] border border-emerald-900/40 rounded-lg px-4 py-3 overflow-auto max-h-72">
            {output}
          </pre>
        </div>
      )}

      {/* stderr */}
      {stdErr && (
        <div className="flex flex-col gap-1.5">
          <SectionLabel label="stderr" />
          <pre className="text-red-300/80 leading-relaxed whitespace-pre-wrap break-words bg-[#1f0d0d] border border-red-900/40 rounded-lg px-4 py-3 overflow-auto max-h-72">
            {stdErr}
          </pre>
        </div>
      )}

      {/* Empty success */}
      {status === "Success" && !output && !stdErr && (
        <div className="flex flex-col items-center gap-2 py-6 text-white/25">
          <CheckCircle2 className="w-8 h-8 text-emerald-500/40" />
          <p className="text-[12px]">Ran successfully with no output</p>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] font-bold text-white/25 uppercase tracking-[0.15em]">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/[0.04]" />
    </div>
  );
}
