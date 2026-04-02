export type PaidProduct = {
  slug: string;
  name: string;
  alternativeTo: string; // matches DB alternative_to field
  icon: string;
  price: string;
  description: string;
  whyAlternative: string;
};

export const paidProducts: PaidProduct[] = [
  {
    slug: "teamviewer",
    name: "TeamViewer",
    alternativeTo: "TeamViewer",
    icon: "🖥️",
    price: "Desde 50€/mes",
    description: "Software de escritorio remoto para controlar ordenadores a distancia, usado por empresas de soporte técnico y teletrabajadores.",
    whyAlternative: "El plan gratuito es cada vez más restrictivo: detecta \"uso comercial\" y limita sesiones a 5 minutos. Las licencias comerciales son caras para equipos pequeños. Además, todo el tráfico pasa por sus servidores, lo que puede ser un problema de privacidad.",
  },
  {
    slug: "google-analytics",
    name: "Google Analytics",
    alternativeTo: "Google Analytics",
    icon: "📊",
    price: "\"Gratis\" (pagas con datos)",
    description: "La herramienta de analítica web más usada del mundo. Rastrea visitantes, fuentes de tráfico, comportamiento en la web y conversiones.",
    whyAlternative: "GA4 es excesivamente complejo para la mayoría de webs, requiere banner de cookies obligatorio por GDPR, el script de 45KB ralentiza la web, y estás regalando los datos de navegación de tus visitantes a Google para que los use en publicidad.",
  },
  {
    slug: "notion",
    name: "Notion",
    alternativeTo: "Notion",
    icon: "📝",
    price: "Gratis limitado / 10€/usuario/mes",
    description: "Workspace todo-en-uno con documentos, bases de datos, kanban, wikis y ahora IA integrada. Usado por millones de personas y equipos.",
    whyAlternative: "Tus datos viven en servidores de Notion en EEUU sin opción de self-hosting. La exportación de datos es notoriamente mala. El precio escala rápido con equipos grandes. Y si Notion cierra o cambia términos, estás atrapado.",
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    alternativeTo: "ChatGPT",
    icon: "🤖",
    price: "20$/mes (Plus) / 200$/mes (Pro)",
    description: "El chatbot de IA más popular del mundo, desarrollado por OpenAI. GPT-4 para conversaciones, análisis de documentos, generación de código y más.",
    whyAlternative: "Cuesta 20$/mes por usuario, tus conversaciones se usan para entrenar futuros modelos (salvo que pagues Pro), necesita internet permanente, y no tienes control sobre qué modelo se ejecuta ni cómo se procesan tus datos.",
  },
  {
    slug: "airtable",
    name: "Airtable",
    alternativeTo: "Airtable",
    icon: "📋",
    price: "Gratis limitado / 20€/usuario/mes",
    description: "Base de datos con interfaz de hoja de cálculo. Combina la facilidad de Excel con el poder de una base de datos relacional.",
    whyAlternative: "Precio abusivo para lo que es (20€/usuario/mes en Pro), límite de 50.000 registros por base, no se conecta a tu base de datos existente, y tus datos quedan en sus servidores sin opción de self-hosting.",
  },
  {
    slug: "capcut",
    name: "CapCut",
    alternativeTo: "CapCut",
    icon: "🎬",
    price: "Gratis con marcas de agua / 8€/mes Pro",
    description: "Editor de vídeo de ByteDance (TikTok), el más popular para crear contenido de redes sociales. Fácil, con efectos y subtítulos automáticos.",
    whyAlternative: "Propiedad de ByteDance — toda la telemetría va a servidores chinos. Puede ser baneado si tu país restringe TikTok. Las funciones premium requieren suscripción. Y hay riesgo de dependencia de una empresa que puede cambiar las reglas.",
  },
  {
    slug: "postman",
    name: "Postman",
    alternativeTo: "Postman",
    icon: "🔌",
    price: "Gratis limitado / 14$/usuario/mes",
    description: "Herramienta para probar y desarrollar APIs. Envía peticiones HTTP, gestiona colecciones, crea tests y documentación.",
    whyAlternative: "Se ha convertido en una app de 500MB que tarda en abrir, obliga a crear cuenta, sincroniza datos en su nube sin preguntar, y consume más de 1GB de RAM. Cada actualización añade funciones que nadie pidió.",
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    alternativeTo: "Salesforce",
    icon: "💼",
    price: "25-300€/usuario/mes",
    description: "El CRM más grande del mundo. Gestión de contactos, ventas, pipeline, marketing y servicio al cliente. Usado por grandes empresas.",
    whyAlternative: "Absurdamente caro, lento, interfaz anticuada, necesitas consultores certificados para configurarlo, y la complejidad es desproporcionada para pymes y startups.",
  },
  {
    slug: "jira",
    name: "Jira / Linear",
    alternativeTo: "Jira / Linear",
    icon: "📌",
    price: "Jira: 8€/usuario | Linear: 8$/usuario",
    description: "Herramientas de gestión de proyectos para equipos de desarrollo. Issues, sprints, kanban, roadmaps y seguimiento de bugs.",
    whyAlternative: "Jira es lento, confuso y necesita días de configuración. Linear es bonito pero no self-hosteable y cuesta 8$/usuario/mes. Ambos son un gasto significativo para equipos en crecimiento.",
  },
  {
    slug: "intercom",
    name: "Intercom",
    alternativeTo: "Intercom",
    icon: "💬",
    price: "74-132$/asiento/mes",
    description: "Plataforma de atención al cliente con chat en vivo, email, chatbots y base de conocimiento. El estándar del sector.",
    whyAlternative: "El precio es prohibitivo: 5 agentes cuestan 370-660$/mes. Para startups y pymes es simplemente inasumible. Y tus datos de clientes quedan en sus servidores.",
  },
  {
    slug: "airdrop",
    name: "AirDrop",
    alternativeTo: "AirDrop",
    icon: "📲",
    price: "Gratis (solo Apple)",
    description: "Sistema de transferencia de archivos inalámbrica de Apple. Rápido y sin configuración, pero solo funciona entre dispositivos Apple.",
    whyAlternative: "Solo funciona entre dispositivos Apple. Si tienes un Android y un Mac, o un iPhone y un PC con Windows, AirDrop no sirve. Necesitas una alternativa que funcione entre cualquier combinación de dispositivos.",
  },
  {
    slug: "retool",
    name: "Retool",
    alternativeTo: "Retool",
    icon: "🛠️",
    price: "10$/usuario/mes",
    description: "Plataforma low-code para construir herramientas internas. Conecta bases de datos y APIs, arrastra componentes UI, y despliega dashboards y paneles de admin.",
    whyAlternative: "10$ por usuario al mes se acumula rápido en equipos grandes. No es self-hosteable en el plan estándar. Y para herramientas internas que solo usa tu equipo, pagar una suscripción recurrente duele.",
  },
  {
    slug: "openai-api",
    name: "OpenAI API",
    alternativeTo: "OpenAI API",
    icon: "⚡",
    price: "Pago por uso (tokens)",
    description: "API de inteligencia artificial de OpenAI. Acceso a GPT-4, DALL-E, Whisper, embeddings y más. El estándar de facto para integrar IA en aplicaciones.",
    whyAlternative: "Pagas por cada token, los costes escalan rápido con el volumen, tus datos pasan por servidores de OpenAI, tienes rate limits, y si la API cae, tu aplicación también.",
  },
  {
    slug: "miro",
    name: "Miro / Figma Whiteboard",
    alternativeTo: "Miro / Figma Whiteboard",
    icon: "🎨",
    price: "Miro: 8-16$/usuario | FigJam: 5$/usuario",
    description: "Pizarras digitales colaborativas para diagramas, wireframes, brainstorming y documentación visual. Muy usadas en equipos de producto y diseño.",
    whyAlternative: "Costosas para equipos grandes, lentas de cargar, y para diagramas técnicos rápidos son excesivamente complejas. A veces solo necesitas dibujar unas cajas y flechas.",
  },
  {
    slug: "uptimerobot",
    name: "UptimeRobot",
    alternativeTo: "UptimeRobot",
    icon: "🟢",
    price: "Gratis limitado / 7$/mes",
    description: "Servicio de monitorización de webs y servidores. Comprueba si tus servicios están online y te avisa cuando caen.",
    whyAlternative: "El plan gratuito solo permite 50 monitores con intervalo de 5 minutos. El plan Pro cuesta 7$/mes y sigue teniendo limitaciones. Tus datos de monitorización están en sus servidores.",
  },
];

export function getProductBySlug(slug: string) {
  return paidProducts.find((p) => p.slug === slug) ?? null;
}

export function getProductByAlternativeTo(alternativeTo: string) {
  return paidProducts.find((p) => p.alternativeTo === alternativeTo) ?? null;
}
