"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewsletterForm({ className, variant = "default" }: { className?: string; variant?: "default" | "on-color" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("flex items-center gap-2 text-success", className)}>
        <Check className="h-5 w-5" />
        <span className="text-sm font-medium">Revisa tu email para confirmar la suscripción</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="h-11 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "flex h-11 items-center gap-1.5 rounded-lg px-5 text-sm font-semibold transition-colors disabled:opacity-60",
          variant === "on-color"
            ? "bg-white text-accent hover:bg-white/90"
            : "bg-accent text-white hover:bg-accent-hover"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Suscribirme
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {status === "error" && (
        <p className="absolute -bottom-6 left-0 text-xs text-danger">
          Error al suscribirse. Inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
