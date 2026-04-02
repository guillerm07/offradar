import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Replace } from "lucide-react";
import { getDistinctAlternatives } from "@/lib/queries";
import { paidProducts } from "@/lib/alternatives-data";

export const metadata: Metadata = {
  title: "Alternativas Open Source — Deja de pagar por software que tiene versión gratuita",
  description:
    "Descubre las mejores alternativas open source y gratuitas a TeamViewer, Notion, ChatGPT, Jira, Google Analytics, Postman y más.",
};

export const dynamic = "force-dynamic";

export default async function AlternativasPage() {
  const dbAlternatives = await getDistinctAlternatives();

  const productsWithCount = paidProducts
    .map((product) => {
      const match = dbAlternatives.find(
        (a) => a.alternative_to === product.alternativeTo
      );
      return { ...product, count: match?.count ?? 0 };
    })
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Replace className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Alternativas{" "}
              <span className="text-gradient">Open Source</span>
            </h1>
          </div>
        </div>
        <p className="text-muted max-w-2xl">
          Deja de pagar por software que tiene una alternativa gratuita y de
          código abierto. Para cada producto de pago, te explicamos qué
          alternativas existen, qué ganas y qué pierdes al cambiar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
        {productsWithCount.map((product) => (
          <Link
            key={product.slug}
            href={`/alternativas/${product.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{product.icon}</span>
              <span className="text-xs font-medium text-accent bg-accent-soft rounded-full px-2.5 py-1">
                {product.count} {product.count === 1 ? "alternativa" : "alternativas"}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-bold group-hover:text-accent transition-colors">
              Alternativa a {product.name}
            </h2>

            <p className="mt-1 text-xs text-warning font-medium">
              {product.price}
            </p>

            <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
              {product.description}
            </p>

            <div className="mt-auto pt-4 flex items-center gap-1 text-xs font-semibold text-accent">
              Ver alternativas gratuitas
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
