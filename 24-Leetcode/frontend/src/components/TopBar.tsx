import { Code2, ChevronRight, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TopBarProps {
  language: string;
  isLoading: boolean;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
}

export function TopBar({
  language,
  isLoading,
  onLanguageChange,
  onRun,
}: TopBarProps) {
  return (
    <header className="relative z-10 flex items-center justify-between px-5 h-11 border-b border-white/[0.05] bg-[#0d0d10]/90 backdrop-blur-sm shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/40">
          <Code2 className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-[13px] font-semibold text-white/80 tracking-tight">
          CodeRunner
        </span>
        <ChevronRight className="w-3 h-3 text-white/15" />
        <span className="text-[11px] text-white/30 font-mono">playground</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2.5">
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="h-7 w-[120px] text-[11px] bg-white/[0.03] border-white/[0.07] text-white/70 hover:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/40 rounded-md transition-colors cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#16161a] border-white/[0.08] text-white/75 text-[11px] rounded-lg shadow-xl shadow-black/50">
            <SelectItem
              value="C++"
              className="cursor-pointer rounded focus:bg-white/[0.06] focus:text-white"
            >
              C++
            </SelectItem>
            <SelectItem
              value="Python"
              className="cursor-pointer rounded focus:bg-white/[0.06] focus:text-white"
            >
              Python
            </SelectItem>
            <SelectItem
              value="JS"
              className="cursor-pointer rounded focus:bg-white/[0.06] focus:text-white"
            >
              JavaScript
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="w-px h-4 bg-white/[0.06]" />

        <Button
          onClick={onRun}
          disabled={isLoading}
          size="sm"
          className="h-7 px-3.5 text-[11px] font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-95 text-white border-0 shadow-md shadow-violet-500/30 transition-all duration-150 disabled:opacity-40 cursor-pointer rounded-md gap-1.5"
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Play className="w-3 h-3 fill-white stroke-none" />
          )}
          {isLoading ? "Running…" : "Run"}
          {!isLoading && (
            <kbd className="ml-1 text-[9px] opacity-50 font-normal bg-white/10 px-1 py-0.5 rounded">
              ⌘↵
            </kbd>
          )}
        </Button>
      </div>
    </header>
  );
}
