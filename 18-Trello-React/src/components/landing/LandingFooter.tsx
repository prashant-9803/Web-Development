import { Link } from "react-router";
import { Kanban } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-8 text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-zinc-900 text-white flex items-center justify-center">
            <Kanban className="w-3 h-3" />
          </div>
          <span className="font-medium text-zinc-700">TrelloFlow</span>
          <span>· Built with React 19 & Tailwind CSS</span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/board/1" className="hover:text-zinc-900 transition-colors">
            Live Board
          </Link>
          <Link to="/signin" className="hover:text-zinc-900 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </footer>
  );
}
