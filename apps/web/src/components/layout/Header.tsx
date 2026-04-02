"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Radar,
  Menu,
  X,
  TrendingUp,
  Layers,
  GitCompare,
  FileText,
  Mail,
} from "lucide-react";
import SearchDialog from "@/components/ui/SearchDialog";

const navigation = [
  { name: "Trending", href: "/trending", icon: TrendingUp },
  { name: "Alternativas", href: "/alternativas", icon: GitCompare },
  { name: "Stacks", href: "/stacks", icon: Layers },
  { name: "Papers", href: "/papers", icon: FileText },
  { name: "Newsletter", href: "/newsletter", icon: Mail },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[var(--gradient-end)] shadow-lg shadow-accent/20 transition-transform group-hover:scale-105">
              <Radar className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Off<span className="text-gradient">Radar</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted rounded-lg transition-colors hover:text-foreground hover:bg-surface-hover"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <SearchDialog />

            <Link
              href="/newsletter"
              className="hidden sm:flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              <Mail className="h-4 w-4" />
              Suscribirse
            </Link>

            {/* Mobile toggle */}
            <button
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground hover:bg-surface-hover"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted rounded-lg transition-colors hover:text-foreground hover:bg-surface-hover"
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="flex items-center justify-center gap-1.5 mt-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              onClick={() => setMobileOpen(false)}
            >
              <Mail className="h-4 w-4" />
              Suscribirse a la newsletter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
