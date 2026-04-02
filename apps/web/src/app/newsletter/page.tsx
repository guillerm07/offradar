import type { Metadata } from "next";
import { Mail, Check } from "lucide-react";
import NewsletterForm from "@/components/ui/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter — Lo mejor de la semana tech en tu email",
  description:
    "Suscríbete a la newsletter de OffRadar y recibe cada lunes los repos, herramientas y productos tech más interesantes.",
};

const benefits = [
  "Los 10 repos más interesantes de la semana",
  "Alternativas open source descubiertas",
  "Papers de IA explicados en español",
  "Stacks y combinaciones recomendadas",
  "Herramientas replicables con Claude Code",
  "Sin spam, cancela cuando quieras",
];

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[var(--gradient-end)] shadow-lg shadow-accent/20 mb-6">
          <Mail className="h-8 w-8 text-white" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Lo mejor de la semana,{" "}
          <span className="text-gradient">en tu email</span>
        </h1>

        <p className="mt-4 text-lg text-muted leading-relaxed max-w-lg mx-auto">
          Cada lunes recibirás una selección curada de los repos,
          herramientas y productos tech que merece la pena conocer.
          Explicados en profundidad, en español.
        </p>
      </div>

      {/* Benefits */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
        {benefits.map((benefit) => (
          <div key={benefit} className="flex items-start gap-2.5">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 mt-0.5">
              <Check className="h-3 w-3 text-success" />
            </div>
            <span className="text-sm">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="mt-10 mx-auto max-w-md">
        <NewsletterForm />
        <p className="mt-3 text-center text-xs text-muted">
          +500 suscriptores ya reciben la newsletter. Sin spam, lo prometemos.
        </p>
      </div>
    </div>
  );
}
