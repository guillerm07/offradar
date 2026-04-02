"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";

export default function CollapsibleFilters({
  children,
  hasFilters,
}: {
  children: React.ReactNode;
  hasFilters: boolean;
}) {
  const [open, setOpen] = useState(hasFilters);

  return (
    <div className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
          hasFilters
            ? "bg-accent/10 text-accent border-accent/20"
            : "bg-surface text-muted border-border hover:border-accent/30 hover:text-foreground"
        }`}
      >
        <Filter className="h-4 w-4" />
        Filtros avanzados
        {hasFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
            !
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-border bg-surface p-5 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
