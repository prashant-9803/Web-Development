import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Sparkles, ArrowRight, Check, Command } from "lucide-react";
import { VALUE_PROPS } from "../../constants/landingData";

const WORDS = [
  {
    text: "side projects",
    color: "from-indigo-600 via-purple-600 to-pink-500",
    border: "border-indigo-500/50",
  },
  {
    text: "sprint goals",
    color: "from-amber-500 via-orange-500 to-rose-500",
    border: "border-amber-500/50",
  },
  {
    text: "daily tasks",
    color: "from-blue-600 via-sky-500 to-cyan-500",
    border: "border-blue-500/50",
  },
  {
    text: "team roadmap",
    color: "from-emerald-600 via-teal-500 to-cyan-600",
    border: "border-emerald-500/50",
  },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const currentWord = WORDS[wordIndex];

  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden">
      {/* Subtle ambient light aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[300px] bg-gradient-to-tr from-blue-100/40 via-amber-100/30 to-emerald-100/40 rounded-full blur-3xl -z-10 animate-glow pointer-events-none" />

      {/* Background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Animated Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 border border-zinc-200/90 text-zinc-800 shadow-2xs mb-8 transition-transform hover:scale-105 cursor-default backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: "8s" }} />
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 bg-clip-text text-transparent animate-text-shimmer font-semibold font-display">
            React 19 & Tailwind v4
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
          <span className="text-zinc-500 font-normal">Tactile Drag & Drop</span>
        </div>

        {/* High-Contrast Hero Headline with Consistent 1-Line Lockup & Color Accents */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-zinc-950 leading-[1.08] max-w-4xl mx-auto">
          <span className="whitespace-nowrap inline-flex items-baseline justify-center gap-2 sm:gap-3">
            <span>Organize your</span>
            <span
              key={wordIndex}
              className={`inline-block animate-word-swap bg-gradient-to-r ${currentWord.color} bg-clip-text text-transparent font-extrabold border-b-2 ${currentWord.border} pb-0.5 `}
            >
              {currentWord.text}
            </span>
          </span>
          <br />
          <span className="text-zinc-400 font-normal text-2xl sm:text-4xl lg:text-5xl mt-2.5 block tracking-tight">
            without the dashboard clutter.
          </span>
        </h1>

        {/* Subheading in Inter */}
        <p className="mt-8 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed font-normal">
          A calm, keyboard-friendly Kanban board built for developers who want to track
          progress fast without configuring 30 custom fields.
        </p>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/board/1"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-zinc-900 text-white font-medium text-sm shadow-sm hover:bg-zinc-800 transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Live Board</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/signin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-zinc-200/90 text-zinc-700 font-medium text-sm shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 transition-all"
          >
            <Command className="w-3.5 h-3.5 text-zinc-400" />
            <span>Sign in to Account</span>
          </Link>
        </div>

        {/* Value checklist */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-zinc-500">
          {VALUE_PROPS.map((prop) => (
            <div key={prop} className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{prop}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
