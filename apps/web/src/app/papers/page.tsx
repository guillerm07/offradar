import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  Brain,
  ExternalLink,
  ArrowRight,
  Lightbulb,
  Tag,
  Users,
  Code,
} from "lucide-react";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Papers explicados — Los papers de IA más importantes, en español",
  description:
    "Los papers de inteligencia artificial que han cambiado la industria, explicados de forma accesible en español. Transformers, LoRA, Constitutional AI y más.",
};

type Paper = {
  title: string;
  authors: string;
  institution: string;
  year: number;
  whyItMatters: string;
  explanation: string[];
  implications: string[];
  arxivUrl: string;
  codeUrl?: string;
  tags: string[];
};

const papers: Paper[] = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin",
    institution: "Google Brain / Google Research",
    year: 2017,
    whyItMatters:
      "Este paper introdujo la arquitectura Transformer, la base de GPT, BERT, Claude y prácticamente toda la IA generativa moderna.",
    explanation: [
      "Antes de 2017, los modelos de lenguaje usaban redes recurrentes (RNN/LSTM) que procesaban el texto palabra por palabra, de izquierda a derecha. Esto era lento porque no se podía paralelizar y los modelos \"olvidaban\" información del principio de textos largos. El equipo de Google propuso algo radical: eliminar la recurrencia por completo y usar únicamente un mecanismo llamado \"atención\" (attention).",
      "El mecanismo de atención permite que cada palabra del texto mire simultáneamente a todas las demás palabras para decidir cuáles son relevantes. En lugar de procesar secuencialmente, el modelo calcula relaciones entre todas las posiciones a la vez, lo que permite un entrenamiento masivamente paralelo en GPUs. Esto aceleró el entrenamiento en órdenes de magnitud.",
      "El impacto fue sísmico. La arquitectura Transformer demostró ser tan versátil que se convirtió en el estándar para casi toda la IA moderna: GPT (OpenAI), BERT (Google), LLaMA (Meta), Claude (Anthropic), Stable Diffusion (para imágenes), Whisper (para audio). Literalmente, toda la revolución de la IA generativa que vivimos hoy existe porque este paper demostró que \"la atención es todo lo que necesitas\".",
    ],
    implications: [
      "Los modelos pueden procesar textos mucho más largos gracias a la atención paralela",
      "El entrenamiento es órdenes de magnitud más rápido que con redes recurrentes",
      "La misma arquitectura sirve para texto, imágenes, audio, vídeo y código",
      "Hizo viable entrenar modelos con miles de millones de parámetros (GPT-3, GPT-4, Claude)",
    ],
    arxivUrl: "https://arxiv.org/abs/1706.03762",
    codeUrl: "https://github.com/tensorflow/tensor2tensor",
    tags: ["Arquitectura fundacional", "NLP", "Transformers", "Atención"],
  },
  {
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Hu, Shen, Wallis, Allen-Zhu, Li, Wang, Wang, Chen",
    institution: "Microsoft Research",
    year: 2021,
    whyItMatters:
      "LoRA permite adaptar modelos gigantes a tareas específicas usando una fracción de la memoria y el coste, democratizando el fine-tuning.",
    explanation: [
      "Cuando quieres que un modelo de lenguaje grande (como GPT o LLaMA) sea experto en algo específico — dermatología, código en Rust, atención al cliente de tu empresa — necesitas hacer \"fine-tuning\": reentrenar el modelo con datos especializados. El problema es que estos modelos tienen miles de millones de parámetros, y reentrenarlos todos requiere GPUs carísimas y semanas de cómputo.",
      "LoRA propone un truco matemáticamente elegante: en lugar de modificar los miles de millones de parámetros originales, congélalos y añade unas matrices pequeñas (de \"rango bajo\") que se entrenan encima. Estas matrices capturan la adaptación específica que necesitas, pero son entre 100x y 1000x más pequeñas que el modelo original. Es como ponerle unas gafas especializadas al modelo en lugar de reconstruirle los ojos.",
      "El impacto práctico fue enorme. De repente, cualquiera con una GPU de consumo (RTX 3090 o incluso menos) podía adaptar modelos grandes a su caso de uso. Esto dio lugar a la explosión de modelos especializados en Hugging Face: modelos para código, para idiomas específicos, para dominios médicos. LoRA es la técnica detrás de la mayoría de los fine-tunes que ves publicados hoy.",
    ],
    implications: [
      "Fine-tuning accesible: una GPU de 24 GB basta para adaptar modelos de 7B-13B parámetros",
      "Puedes tener múltiples \"adaptadores\" LoRA para distintas tareas sobre un mismo modelo base",
      "Los adaptadores son archivos pequeños (megabytes vs gigabytes), fáciles de compartir y combinar",
      "Democratizó la personalización de IA: ya no necesitas ser Google para tener un modelo especializado",
    ],
    arxivUrl: "https://arxiv.org/abs/2106.09685",
    codeUrl: "https://github.com/microsoft/LoRA",
    tags: ["Fine-tuning", "Eficiencia", "Adaptación", "LLM"],
  },
  {
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: "Bai, Kadavath, Kundu, Askell, Kernion, Jones, Chen, Goldie, Mirhoseini, McKinnon, et al.",
    institution: "Anthropic",
    year: 2022,
    whyItMatters:
      "Propone un método para hacer modelos de IA más seguros y útiles usando la propia IA como supervisor, en lugar de depender exclusivamente de evaluadores humanos.",
    explanation: [
      "Cuando entrenas un modelo de lenguaje, este aprende de internet: lo bueno y lo malo. Para que el modelo sea seguro y útil, se usa RLHF (Reinforcement Learning from Human Feedback): humanos evalúan miles de respuestas y el modelo aprende qué tipo de respuestas son preferibles. Pero esto tiene problemas: es caro, lento, y los evaluadores humanos pueden ser inconsistentes o tener sesgos.",
      "Constitutional AI (CAI) propone una alternativa ingeniosa: darle al modelo una \"constitución\" — un conjunto de principios escritos como \"sé respetuoso\", \"no ayudes a hacer daño\", \"admite cuando no sabes algo\" — y usar al propio modelo para evaluar y mejorar sus respuestas según esos principios. Primero, el modelo genera respuestas; luego, se le pide que critique sus propias respuestas según la constitución y las revise; finalmente, se entrena con las versiones mejoradas.",
      "Este enfoque es importante por varias razones. Reduce la dependencia de evaluadores humanos (más escalable), hace explícitos los valores que guían al modelo (más transparente), y permite iterar rápidamente sobre los principios. Es la base del sistema de seguridad de Claude y ha influido en cómo toda la industria piensa sobre la alineación de modelos de IA.",
    ],
    implications: [
      "Los principios de seguridad del modelo son explícitos y auditables, no una caja negra",
      "Se reduce la necesidad de miles de evaluadores humanos para cada iteración",
      "El método es escalable: a medida que los modelos mejoran, también mejora la auto-supervisión",
      "Sienta las bases para sistemas de IA que se auto-corrigen según valores definidos por humanos",
    ],
    arxivUrl: "https://arxiv.org/abs/2212.08073",
    tags: ["Seguridad", "Alineación", "RLHF", "Ética en IA"],
  },
];

export default function PapersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <BookOpen className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Papers{" "}
            <span className="text-gradient">explicados</span>
          </h1>
        </div>
        <p className="text-muted max-w-2xl">
          Los papers de inteligencia artificial más importantes, explicados en
          español de forma accesible. Sin jerga innecesaria, con contexto
          práctico y enfocados en por qué importan.
        </p>
      </div>

      {/* Papers */}
      <div className="space-y-10 stagger">
        {papers.map((paper) => (
          <article
            key={paper.title}
            className="rounded-2xl border border-border bg-surface p-6 sm:p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                  {paper.title}
                </h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted flex-wrap">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>{paper.authors}</span>
                  <span className="text-border">|</span>
                  <span className="font-medium">{paper.institution}</span>
                  <span className="text-border">|</span>
                  <span>{paper.year}</span>
                </div>
              </div>
            </div>

            {/* Why it matters callout */}
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-accent-soft p-4 border border-accent/20">
              <Lightbulb className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Por qué importa
                </span>
                <p className="mt-1 text-sm text-foreground/90 leading-relaxed font-medium">
                  {paper.whyItMatters}
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="mt-6 space-y-4">
              {paper.explanation.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm text-foreground/80 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Practical implications */}
            <div className="mt-6 rounded-xl bg-background p-5 border border-border/50">
              <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Brain className="h-4 w-4 text-accent" />
                Implicaciones prácticas
              </h3>
              <ul className="space-y-2">
                {paper.implications.map((impl, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    {impl}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="mt-5 flex items-center gap-2 flex-wrap">
              <Tag className="h-3.5 w-3.5 text-muted" />
              {paper.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Links */}
            <div className="mt-5 pt-5 border-t border-border/50 flex flex-wrap gap-3">
              <a
                href={paper.arxivUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover hover:border-accent/30"
              >
                <FileText className="h-3.5 w-3.5" />
                Leer en arXiv
                <ExternalLink className="h-3 w-3" />
              </a>
              {paper.codeUrl && (
                <a
                  href={paper.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover hover:border-accent/30"
                >
                  <Code className="h-3.5 w-3.5" />
                  Ver código
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 sm:p-8 text-center">
        <h3 className="text-lg font-bold">
          ¿Quieres recibir papers explicados cada semana?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Cada semana seleccionamos un paper relevante de IA y lo explicamos en
          español, sin jerga y con contexto práctico.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1.5 mt-4 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Suscribirme a la newsletter
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
