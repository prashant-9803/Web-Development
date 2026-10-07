import { Link } from "react-router";
import { Kanban } from "lucide-react";

const AppBar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-zinc-200/90 bg-white">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center shadow-2xs transition-transform group-hover:scale-105">
          <Kanban className="w-3.5 h-3.5" />
        </div>
        <span className="font-display font-bold text-lg tracking-tight text-zinc-900">
          Trello<span className="text-zinc-400 font-normal">Flow</span>
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3 py-1.5 rounded-lg transition-colors hover:bg-zinc-100 hidden sm:inline-block"
        >
          Landing
        </Link>
        <Link 
          to="/signin" 
          className="text-xs font-medium text-zinc-700 hover:text-zinc-900 px-3.5 py-1.5 rounded-lg border border-zinc-200/90 hover:bg-zinc-50 transition-colors shadow-2xs"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default AppBar;