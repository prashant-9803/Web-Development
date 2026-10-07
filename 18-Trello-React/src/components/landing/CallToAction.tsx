import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-white border-t border-zinc-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
          Ready to focus on what matters?
        </h2>
        <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-lg mx-auto">
          Open the interactive demo board right now or create an account to start
          managing your daily backlog.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/board/1"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white font-medium text-sm shadow-sm hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Open Your Board</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/signin"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-zinc-200 text-zinc-700 font-medium text-sm hover:bg-zinc-50 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
