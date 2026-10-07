import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Kanban, ArrowRight, Menu, X, Sparkles } from "lucide-react";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
      <header
        className={`max-w-4xl mx-auto rounded-full transition-all duration-300 pointer-events-auto border ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-zinc-300/80 shadow-xl shadow-zinc-950/8 py-2 px-3 sm:px-4"
            : "bg-white/75 backdrop-blur-md border-zinc-200/80 shadow-md shadow-zinc-950/4 py-2.5 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105 group-hover:bg-zinc-800">
                <Kanban className="w-4 h-4 text-zinc-100" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm tracking-tight text-zinc-900">
                  Trello<span className="text-zinc-400 font-normal">Flow</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200/80">
                  v1.2
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-600">
              <a
                href="#features"
                className="px-3 py-1.5 rounded-full hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
              >
                Features
              </a>
              <a
                href="#workflow"
                className="px-3 py-1.5 rounded-full hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
              >
                Workflow
              </a>
              <a
                href="#preview"
                className="px-3 py-1.5 rounded-full hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors"
              >
                Interactive Demo
              </a>
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            {/* Live Status Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-[11px] font-medium text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ready</span>
            </div>

            <Link
              to="/signin"
              className="hidden sm:inline-flex text-xs font-medium text-zinc-600 hover:text-zinc-950 px-3 py-1.5 rounded-full transition-colors hover:bg-zinc-100"
            >
              Sign In
            </Link>

            <Link
              to="/board/1"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xs transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span>Launch Board</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-zinc-200/80 px-2 pb-2 flex flex-col gap-1.5">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              Features
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              Workflow
            </a>
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              Interactive Demo
            </a>
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between px-1">
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium text-zinc-700 hover:text-zinc-950 py-1"
              >
                Sign In to Account
              </Link>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Demo</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
