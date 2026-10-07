import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { SAMPLE_BOARDS, type BoardItem } from "../../constants/landingData";

export default function BoardPreview() {
  const [activeTab, setActiveTab] = useState<"sprint" | "roadmap">("sprint");
  const currentBoard = SAMPLE_BOARDS[activeTab];

  return (
    <section id="preview" className="pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xl shadow-zinc-200/50 overflow-hidden">
        {/* Window Bar Header */}
        <div className="px-4 py-3 bg-zinc-100/70 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-300" />
            <div className="w-3 h-3 rounded-full bg-zinc-300" />
            <div className="w-3 h-3 rounded-full bg-zinc-300" />
            <span className="ml-3 text-xs font-semibold text-zinc-600 hidden sm:inline">
              {currentBoard.title}
            </span>
          </div>

          {/* Tab switchers */}
          <div className="flex items-center gap-1 bg-zinc-200/60 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab("sprint")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeTab === "sprint"
                  ? "bg-white text-zinc-900 shadow-2xs scale-[1.02]"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Sprint 42
            </button>
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeTab === "roadmap"
                  ? "bg-white text-zinc-900 shadow-2xs scale-[1.02]"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Roadmap
            </button>
          </div>
        </div>

        {/* Mini Board Columns */}
        <div className="p-4 sm:p-6 bg-zinc-50/60 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. To Do */}
          <PreviewColumn
            title="To Do"
            dotColor="bg-blue-500"
            columnStyle="border-blue-200/70 bg-blue-50/40"
            badgeStyle="bg-blue-100 text-blue-700"
            items={currentBoard.todo}
          />

          {/* 2. In Progress */}
          <PreviewColumn
            title="In Progress"
            dotColor="bg-amber-500"
            columnStyle="border-amber-200/70 bg-amber-50/40"
            badgeStyle="bg-amber-100 text-amber-800"
            items={currentBoard.inProgress}
          />

          {/* 3. Done */}
          <PreviewColumn
            title="Done"
            dotColor="bg-emerald-500"
            columnStyle="border-emerald-200/70 bg-emerald-50/40"
            badgeStyle="bg-emerald-100 text-emerald-800"
            items={currentBoard.done}
          />
        </div>

        {/* Bottom Quick Action Strip */}
        <div className="px-6 py-3 bg-white border-t border-zinc-200/70 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="flex items-center gap-1 font-medium text-zinc-700">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Interactive live board
            </span>
          </div>
          <Link
            to="/board/1"
            className="font-medium text-zinc-900 hover:text-zinc-600 inline-flex items-center gap-1 transition-colors group"
          >
            <span>Test dragging in full workspace</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PreviewColumn({
  title,
  dotColor,
  columnStyle,
  badgeStyle,
  items,
}: {
  title: string;
  dotColor: string;
  columnStyle: string;
  badgeStyle: string;
  items: BoardItem[];
}) {
  return (
    <div className={`rounded-xl border p-3.5 flex flex-col ${columnStyle}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          <span className="text-xs font-semibold text-zinc-800 uppercase tracking-wider">
            {title}
          </span>
          <span
            className={`px-1.5 py-0.2 text-xs font-medium rounded-full ${badgeStyle}`}
          >
            {items.length}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-zinc-200/80 bg-white p-3 shadow-2xs hover:shadow-xs transition-all duration-150 hover:-translate-y-0.5 cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center justify-between text-2xs mb-1.5">
              <span
                className={`px-1.5 py-0.5 rounded font-medium text-[11px] ${item.tagColor}`}
              >
                {item.tag}
              </span>
              <span className="text-zinc-400 text-[11px]">{item.time}</span>
            </div>
            <p className="text-xs font-medium text-zinc-800 leading-snug">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
