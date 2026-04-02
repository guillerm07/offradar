import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OffRadar — Descubre las herramientas tech que importan",
    template: "%s | OffRadar",
  },
  description:
    "Descubrimos y explicamos automáticamente los repos, herramientas de IA, productos y papers más interesantes del ecosistema tech. Cada día, en español.",
  metadataBase: new URL("https://offradar.es"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://offradar.es",
    siteName: "OffRadar",
    title: "OffRadar — Descubre las herramientas tech que importan",
    description:
      "Repos, herramientas de IA, productos y papers explicados en español. Actualizado cada día automáticamente.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@offradar_es",
    creator: "@offradar_es",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      style={{ colorScheme: "dark" }}
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
