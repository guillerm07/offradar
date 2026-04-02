"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, Star, Loader2 } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

type SearchResult = {
  id: number;
  name: string;
  seoSlug: string;
  description: string;
  stars: number;
  language: string;
  interestScore: number;
  featuredImageUrl: string | null;
};

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.projects || []);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-muted transition-colors hover:border-accent/30 hover:text-foreground"
        aria-label="Buscar"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Buscar...</span>
        <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-mono text-muted">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100]" onClick={() => setOpen(false)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className="relative mx-auto mt-[15vh] w-full max-w-lg px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
          {/* Input */}
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-5 w-5 text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar herramientas, repos, alternativas..."
              className="h-14 flex-1 bg-transparent text-base text-foreground placeholder:text-muted/50 focus:outline-none"
            />
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted shrink-0" />}
            <button onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto p-2">
              {results.map((r) => (
                <Link
                  key={r.id}
                  href={`/proyecto/${r.seoSlug}`}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-surface-hover"
                >
                  {r.featuredImageUrl ? (
                    <img
                      src={r.featuredImageUrl}
                      alt=""
                      className="h-10 w-10 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent shrink-0">
                      {r.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{r.name}</p>
                    <p className="text-xs text-muted truncate">{r.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted shrink-0">
                    <Star className="h-3 w-3" />
                    {formatNumber(r.stars)}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty state */}
          {query.length >= 2 && !loading && results.length === 0 && (
            <div className="p-6 text-center text-sm text-muted">
              No se encontraron resultados para &ldquo;{query}&rdquo;
            </div>
          )}

          {/* Hint */}
          {query.length < 2 && (
            <div className="p-6 text-center text-sm text-muted">
              Escribe al menos 2 caracteres para buscar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
