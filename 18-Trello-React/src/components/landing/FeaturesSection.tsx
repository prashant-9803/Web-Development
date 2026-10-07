import { Move, Palette, Zap, Layers, GripVertical, CheckSquare, Calendar, Sparkles } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white border-y border-zinc-200/80 relative overflow-hidden">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-700 border border-zinc-200/80 mb-3">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Built For Engineering Flow</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            Crafted for clarity, built for speed.
          </h2>
          <p className="mt-3.5 text-base text-zinc-600">
            Every interaction has been honed to eliminate friction and keep you in your flow state.
          </p>
        </div>

        {/* Modern Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* ─── Card 1: HTML5 Drag & Drop ─── */}
          <div className="group rounded-3xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white p-7 sm:p-8 shadow-2xs hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient hover glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-blue-100/60 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60 shadow-2xs mb-5">
                <Move className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-zinc-950 tracking-tight mb-2">
                HTML5 Drag & Drop
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-md">
                Smooth native drag interactions powered by React DnD. Instant visual drop target indicators highlight valid slots the moment you lift a card.
              </p>
            </div>

            {/* Visual Widget: Dragging Card & Drop Slot */}
            <div className="mt-8 pt-6 border-t border-zinc-200/70 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Floating dragged card */}
              <div className="rounded-xl border border-blue-300 bg-white p-3 shadow-md -rotate-1 ring-2 ring-blue-400/20">
                <div className="flex items-center justify-between text-2xs mb-1.5">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/50">
                    TR-42
                  </span>
                  <GripVertical className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <p className="text-xs font-semibold text-zinc-900 leading-tight">
                  Setup OAuth 2.0 Backend
                </p>
              </div>

              {/* Glowing dropzone indicator */}
              <div className="rounded-xl border-2 border-dashed border-blue-400 bg-blue-50/50 p-3 flex flex-col items-center justify-center text-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping mb-1" />
                <span className="text-xs font-semibold text-blue-700">Release to drop</span>
                <span className="text-[10px] text-blue-500 font-medium">In Progress lane</span>
              </div>
            </div>
          </div>

          {/* ─── Card 2: Gentle Color Harmony ─── */}
          <div className="group rounded-3xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white p-7 sm:p-8 shadow-2xs hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient hover glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-100/60 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60 shadow-2xs mb-5">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-zinc-950 tracking-tight mb-2">
                Gentle Color Harmony
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-md">
                Carefully tuned pastel tints for To Do, In Progress, and Done to avoid visual fatigue during deep work while keeping white cards crisp and legible.
              </p>
            </div>

            {/* Visual Widget: 3 Column Palette Swatches */}
            <div className="mt-8 pt-6 border-t border-zinc-200/70 flex flex-col sm:flex-row items-center gap-2.5">
              <div className="flex-1 w-full rounded-xl border border-blue-200/80 bg-blue-50/50 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold text-zinc-800">To Do</span>
                </div>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  4
                </span>
              </div>

              <div className="flex-1 w-full rounded-xl border border-amber-200/80 bg-amber-50/50 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-semibold text-zinc-800">Doing</span>
                </div>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  2
                </span>
              </div>

              <div className="flex-1 w-full rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-zinc-800">Done</span>
                </div>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  8
                </span>
              </div>
            </div>
          </div>

          {/* ─── Card 3: Instant Feedback ─── */}
          <div className="group rounded-3xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white p-7 sm:p-8 shadow-2xs hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient hover glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60 shadow-2xs mb-5">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-zinc-950 tracking-tight mb-2">
                Instant Feedback
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-md">
                Immediate optimistic UI state changes with zero lag. No spinny wheels or network waiting screens—state transitions happen instantly.
              </p>
            </div>

            {/* Visual Widget: Speed Telemetry Pill */}
            <div className="mt-8 pt-6 border-t border-zinc-200/70 flex items-center justify-between bg-zinc-900 text-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">
                    State Sync Latency
                  </div>
                  <div className="font-mono text-lg font-bold text-white tracking-tight">
                    0.00 ms
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Optimistic
              </span>
            </div>
          </div>

          {/* ─── Card 4: Clean Card Anatomy ─── */}
          <div className="group rounded-3xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white p-7 sm:p-8 shadow-2xs hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient hover glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-purple-100/60 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200/60 shadow-2xs mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-zinc-950 tracking-tight mb-2">
                Clean Card Anatomy
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-md">
                High-contrast typography with card descriptions, distinct IDs, priority indicators, subtask checklists, and responsive multi-column layouts.
              </p>
            </div>

            {/* Visual Widget: Deconstructed Linear-style Card */}
            <div className="mt-8 pt-6 border-t border-zinc-200/70">
              <div className="rounded-xl border border-zinc-200/90 bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200/80">
                      TR-108
                    </span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200/60">
                      Security
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Urgent
                  </span>
                </div>
                <p className="text-xs font-semibold text-zinc-900">
                  Refactor JWT Token Refresh Flow
                </p>
                <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <CheckSquare className="w-3 h-3 text-zinc-400" />
                      3/4
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      Today
                    </span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px] font-bold">
                    PR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
