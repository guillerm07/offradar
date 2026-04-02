import Link from "next/link";
import { Radar } from "lucide-react";

const footerLinks = {
  Explorar: [
    { name: "Trending", href: "/trending" },
    { name: "Categorías", href: "/categoria/inteligencia-artificial" },
    { name: "Alternativas", href: "/alternativas" },
    { name: "Comparativas", href: "/comparativas" },
  ],
  Contenido: [
    { name: "Papers explicados", href: "/papers" },
    { name: "Stacks semanales", href: "/stacks" },
    { name: "Réplica con Code", href: "/replica-con-code" },
    { name: "Hazlo con Code", href: "/hazlo-con-code" },
  ],
  Proyecto: [
    { name: "Newsletter", href: "/newsletter" },
    { name: "Sobre OffRadar", href: "/sobre" },
    { name: "Guillermo del Pino", href: "/guillermo" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-[var(--gradient-end)]">
                <Radar className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Off<span className="text-gradient">Radar</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
              Descubrimos y explicamos las herramientas, repos y productos tech
              más interesantes. Cada día, automáticamente.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border py-6">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} OffRadar. Contenido generado con
            IA, curado con criterio.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/offradar_es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              X/Twitter
            </a>
            <a
              href="https://github.com/guillerm07/offradar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
