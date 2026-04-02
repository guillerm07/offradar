import fs from "fs";

const filePath = "/Users/guillermodelpinohernandez/Documents/offroad/apps/web/src/lib/alternatives-data.ts";
let content = fs.readFileSync(filePath, "utf8");

const replacements = {
  "chatgpt": {
    whatYouGain: `[
      "Gratis al 100% — sin suscripción mensual de 20$",
      "Privacidad total: tus conversaciones no salen de tu ordenador ni se usan para entrenar modelos",
      "Funciona sin internet — en aviones, en zonas rurales, en cualquier sitio",
      "Sin límite de mensajes por hora ni rate limits",
      "Elige el modelo que quieras: Llama, Mistral, Phi, DeepSeek... y cámbialo cuando quieras",
      "Puedes ejecutar modelos especializados (código, español, medicina) que ChatGPT no ofrece",
    ]`,
    whatYouLose: `[
      "GPT-4 sigue siendo superior en razonamiento complejo y tareas difíciles",
      "La velocidad de respuesta depende de tu hardware (con GPU va bien, solo CPU es más lento)",
      "No tienes acceso a plugins, búsqueda web integrada ni DALL-E",
      "Los modelos locales de 7-8B son buenos pero no a nivel GPT-4 para todo",
      "Necesitas gestionar descargas de modelos y actualizaciones tú mismo",
      "No hay app móvil nativa tan pulida como la de ChatGPT",
    ]`,
    detailedComparison: `"La cuestión no es \\\"¿es tan bueno como GPT-4?\\\" sino \\\"¿es suficientemente bueno para lo que necesito?\\\". Para el 70% del uso cotidiano — redactar emails, resumir textos, responder preguntas generales, ayudar con código sencillo — un Llama 3.1 8B corriendo en local es perfectamente capaz. Para el 30% restante — razonamiento multi-paso, análisis de documentos largos, código complejo — GPT-4 sigue siendo notablemente mejor. La ventaja real de lo local no es la calidad sino la libertad: sin coste, sin censura, sin que nadie lea lo que escribes, y funcionando 24/7 sin depender de servidores ajenos."`
  },
  "airtable": {
    whatYouGain: `[
      "Sin límite de registros — mete millones de filas sin pagar más",
      "Se conecta a tu base de datos existente (PostgreSQL, MySQL) sin duplicar datos",
      "API REST automática generada para cada tabla — sin configuración extra",
      "Self-hosteable: tus datos de negocio en tu servidor, no en el de Airtable",
      "Sin coste por usuario — todo tu equipo accede gratis",
      "Webhooks nativos para automatizar flujos cuando cambian los datos",
    ]`,
    whatYouLose: `[
      "El ecosistema de automaciones de Airtable (Automations) es más maduro",
      "Las apps y extensiones del marketplace de Airtable no tienen equivalente directo",
      "La colaboración en tiempo real de Airtable es más fluida",
      "Airtable tiene vistas de interfaz (Interface Designer) que las alternativas aún no replican",
      "Los formularios de Airtable son más configurables y tienen lógica condicional avanzada",
    ]`,
    detailedComparison: `"La diferencia fundamental es filosófica: Airtable quiere ser tu base de datos. La alternativa open source quiere darle cara bonita a la base de datos que ya tienes. Si partes de cero, Airtable es más rápido de arrancar. Pero si ya tienes datos en PostgreSQL o MySQL (que es lo normal en cualquier empresa con más de 6 meses de vida), la alternativa es objetivamente superior porque no duplicas datos, no pagas por registro, y tu equipo no técnico puede ver y editar los mismos datos que usa tu aplicación."`
  },
  "capcut": {
    whatYouGain: `[
      "Sin marcas de agua — nunca, en ningún plan, en ninguna función",
      "Tu contenido no pasa por servidores de ByteDance (privacidad total)",
      "No puede ser baneado si tu país restringe TikTok/ByteDance",
      "Sin suscripción de pago — todas las funciones accesibles desde el día 1",
      "Open source: puedes auditar el código y verificar qué hace con tus archivos",
      "No hay algoritmo que modere tu contenido antes de exportarlo",
    ]`,
    whatYouLose: `[
      "Los efectos de texto y animaciones de CapCut son más variados y pulidos",
      "Los subtítulos automáticos de CapCut (con IA) son más precisos de momento",
      "CapCut tiene app móvil madura — las alternativas son solo escritorio por ahora",
      "La biblioteca de música y efectos de sonido de CapCut es enorme y gratuita",
      "Algunos filtros virales específicos de TikTok solo están en CapCut",
      "La curva de aprendizaje de CapCut es menor (más tutoriales, más comunidad)",
    ]`,
    detailedComparison: `"CapCut sigue siendo el editor más rápido para hacer un vídeo viral para TikTok — tiene los efectos, las tendencias y la integración directa. Pero si editas para múltiples plataformas, si te preocupa la privacidad, o si simplemente no quieres depender de una empresa china que puede cambiar las reglas cuando quiera, la alternativa open source cubre perfectamente el 80% de los casos de uso. Para cortes, subtítulos, transiciones, texto animado y exportación en formato vertical, ya funciona bien. Lo que le falta vendrá con el tiempo — el ritmo de desarrollo es impresionante."`
  },
  "postman": {
    whatYouGain: `[
      "Carga al instante (milisegundos vs los 15+ segundos de Postman)",
      "Sin cuenta obligatoria — abre y empieza a enviar peticiones",
      "Consumo de RAM mínimo (funciona en el navegador vs 1GB+ de Postman)",
      "Tus colecciones no se sincronizan a la nube de una empresa sin tu permiso",
      "Self-hosteable para equipos con datos sensibles en sus APIs",
      "Funciona desde el navegador — sin instalar apps de 500MB",
      "Sin pop-ups constantes para vender el plan Pro",
    ]`,
    whatYouLose: `[
      "Mock servers integrados (Postman los tiene, las alternativas no)",
      "Monitors para ejecutar peticiones automáticas programadas",
      "La documentación automática de APIs de Postman es más completa",
      "Newman (CLI para CI/CD) está muy integrado con el ecosistema Postman",
      "El ecosistema de workspaces compartidos de Postman para equipos enterprise",
    ]`,
    detailedComparison: `"Postman se ha convertido en el ejemplo perfecto de feature creep: empezó como algo simple y útil, y ha ido añadiendo capas de complejidad que la mayoría de usuarios no necesita. El 90% de los desarrolladores usa Postman para una cosa: enviar peticiones HTTP y ver la respuesta. Para eso, la alternativa open source es estrictamente mejor: más rápida, más ligera, sin fricción de login, y sin el peso de funciones enterprise que solo añaden complejidad. Si eres de ese 10% que necesita mock servers, monitors avanzados y Newman para CI/CD enterprise, Postman tiene sentido. Para todos los demás, el cambio es una mejora inmediata."`
  },
  "salesforce": {
    whatYouGain: `[
      "De 25-300€/usuario/mes a 0€ — el ahorro es monumental",
      "Interfaz moderna y rápida (no la pesadilla visual de Salesforce)",
      "Self-hosteable: los datos de tus clientes en tu infraestructura",
      "Configuración en minutos, no en semanas con un consultor certificado",
      "API GraphQL completa para integrar con cualquier herramienta",
      "Extensible con código abierto — no dependes del marketplace de Salesforce",
      "No necesitas una certificación para configurar un campo personalizado",
    ]`,
    whatYouLose: `[
      "Salesforce tiene un ecosistema de integraciones enterprise inmenso (ERP, marketing, analytics)",
      "Los workflows avanzados de Salesforce (Process Builder, Flow) son más potentes",
      "Reporting y dashboards de Salesforce son muy completos para ventas enterprise",
      "El soporte técnico SLA de Salesforce es profesional y garantizado",
      "Funcionalidades de marketing automation integradas (Pardot/Marketing Cloud)",
      "La gestión de territorios, cuotas y forecasting avanzado",
    ]`,
    detailedComparison: `"Salesforce es como un avión de combate: potentísimo pero necesitas entrenamiento para pilotarlo y mantenimiento constante. La alternativa open source es como un coche deportivo: te lleva donde necesitas de forma rápida y elegante. Para una startup o pyme que necesita gestionar contactos, llevar un pipeline de ventas y hacer seguimiento de oportunidades, Salesforce es excesivo en todos los sentidos — precio, complejidad y tiempo de implementación. La alternativa te da exactamente lo que necesitas en una fracción del tiempo. Solo si tu empresa tiene procesos de venta multinacional complejos, equipos de 50+ comerciales, e integración con SAP o similar, Salesforce empieza a justificar su precio."`
  },
  "jira": {
    whatYouGain: `[
      "Carga en menos de 1 segundo (vs los 3-5 segundos de Jira)",
      "Configuración inicial en minutos, no en días",
      "Interfaz limpia e intuitiva que no requiere certificación para usar",
      "Self-hosteable con Docker — tus datos de proyecto bajo tu control",
      "0€ por usuario vs 7.75-8€/usuario/mes",
      "Sprints, kanban, roadmaps y backlog sin complejidad innecesaria",
      "Migración directa desde Jira con importador integrado",
    ]`,
    whatYouLose: `[
      "Jira tiene un ecosistema de plugins enorme en su Marketplace (3.000+ apps)",
      "Los filtros JQL de Jira son extremadamente potentes para búsquedas complejas",
      "Confluence (wiki) y Bitbucket (código) están profundamente integrados con Jira",
      "Los informes y dashboards de Jira son más configurables para managers",
      "La gestión de permisos por proyecto/rol de Jira es muy granular",
      "Jira Service Management para ITSM está muy maduro",
    ]`,
    detailedComparison: `"Si mañana preguntaras a 100 desarrolladores \\\"¿te gusta usar Jira?\\\", el 80% diría que no. Es lento, confuso, y tiene una curva de aprendizaje absurda para lo que hace. Linear solucionó el problema de la UX pero te cobra 8$ por usuario y no puedes self-hostear. La alternativa open source coge lo mejor de ambos mundos: la experiencia fluida de Linear, la potencia suficiente para sprints y roadmaps, y la libertad del self-hosting. El único caso donde Jira sigue siendo difícil de reemplazar es en empresas grandes (+200 personas) donde el ecosistema de plugins, la integración con Confluence/Bitbucket, y la gestión de permisos granular son realmente necesarios."`
  },
  "intercom": {
    whatYouGain: `[
      "De 74-132$/asiento/mes a 0€ — para 5 agentes son 370-660$/mes de ahorro",
      "Self-hosteable: los datos de las conversaciones con clientes en tu servidor",
      "Sin límite de agentes, conversaciones ni contactos",
      "Mismos canales: chat en vivo, email, WhatsApp, Facebook, Instagram, Telegram",
      "Chatbots y automatizaciones incluidas sin coste extra",
      "Base de conocimiento (centro de ayuda) integrada",
      "Personalizable al 100% al ser open source",
    ]`,
    whatYouLose: `[
      "Los chatbots de IA de Intercom (Fin) son más avanzados de serie",
      "Product tours y mensajes in-app de Intercom para onboarding de usuarios",
      "Los informes de Intercom para medir CSAT y rendimiento de equipo son más visuales",
      "El ecosistema de integraciones de Intercom es mayor (350+ apps)",
      "Intercom tiene funcionalidades de marketing (campañas, segmentación) que las alternativas no",
      "El soporte técnico de Intercom para resolver problemas rápido",
    ]`,
    detailedComparison: `"El cálculo es simple: ¿tu empresa puede permitirse 370-660$/mes solo en herramienta de chat? Si la respuesta es sí y necesitas las funcionalidades avanzadas de Intercom (chatbot con IA tipo Fin, product tours, campañas de marketing), entonces Intercom tiene sentido. Si la respuesta es no — que es la realidad de la mayoría de startups y pymes — la alternativa open source te da el 90% de la funcionalidad por el 0% del coste. El widget de chat, la bandeja compartida, la gestión multicanal y los chatbots básicos funcionan igual de bien. La diferencia se nota en las funciones premium que Intercom cobra extra: IA avanzada, product tours y marketing automation."`
  },
  "airdrop": {
    whatYouGain: `[
      "Funciona entre CUALQUIER dispositivo: Android + Mac, iPhone + Windows, Linux + iOS...",
      "Mismo principio que AirDrop: sin internet, por red local, instantáneo",
      "Sin límite de tamaño de archivo — envía vídeos de gigas sin problema",
      "Transferencia cifrada con TLS — seguro incluso en redes WiFi públicas",
      "Open source: puedes verificar que no envía datos a ningún servidor",
      "Disponible en todas las plataformas: móvil, escritorio, web",
    ]`,
    whatYouLose: `[
      "AirDrop entre dispositivos Apple es más instantáneo (Bluetooth + WiFi directo)",
      "AirDrop está integrado en el sistema — no necesitas abrir una app aparte",
      "AirDrop soporta compartir más que archivos (contraseñas, contactos, links de apps)",
      "La detección de dispositivos cercanos de AirDrop es más fiable en el ecosistema Apple",
    ]`,
    detailedComparison: `"Si vives 100% en el ecosistema Apple (iPhone, Mac, iPad, todo Apple), AirDrop es difícil de superar porque está integrado en el sistema. Pero en el momento en que tienes UN dispositivo que no es Apple — un Android, un PC con Windows, un servidor Linux — AirDrop deja de servir. Y ahí es donde la alternativa brilla: funciona entre todo, es igual de fácil, igual de rápido, y no necesitas subirlo a ninguna nube. Es la solución universal que Apple nunca quiso hacer."`
  },
  "retool": {
    whatYouGain: `[
      "Sin coste por usuario — tu equipo entero accede sin que la factura crezca",
      "Self-hosteable con Docker — los datos de tus herramientas internas en tu infraestructura",
      "Open source: puedes auditar y modificar el código de la plataforma",
      "Sin dependencia de un SaaS — si Retool sube precios o cierra, no te afecta",
      "Componentes UI suficientes para el 90% de herramientas internas",
      "Comunidad activa que contribuye componentes y mejoras",
    ]`,
    whatYouLose: `[
      "Retool tiene más componentes UI y más pulidos (especialmente para mobile)",
      "Las integraciones nativas de Retool con servicios enterprise (Snowflake, BigQuery) son más profundas",
      "Retool tiene AI features integradas para generar componentes con prompts",
      "El soporte enterprise de Retool (SSO, audit logs, permisos granulares) es más maduro",
      "Retool Workflows para automatizaciones backend es una funcionalidad única",
    ]`,
    detailedComparison: `"Para construir un panel de administración, un dashboard de métricas, o un formulario interno que conecte con tu base de datos, ambas opciones hacen el trabajo bien. La diferencia está en el coste a largo plazo: con 10 usuarios en Retool pagas 100$/mes por siempre. Con la alternativa self-hosted, pagas 0$ por siempre. A medida que tu equipo crece, esa diferencia se vuelve significativa. Solo si necesitas las integraciones enterprise avanzadas de Retool o su soporte SLA, el coste adicional se justifica."`
  },
  "openai-api": {
    whatYouGain: `[
      "Sin coste por token — paga una vez el servidor y úsalo ilimitadamente",
      "Privacidad total: los datos de tus usuarios no salen de tu infraestructura",
      "Sin rate limits: procesa tantas peticiones como tu hardware permita",
      "Sin puntos de fallo externos: si OpenAI cae, tu app sigue funcionando",
      "API 100% compatible con OpenAI — cambias una URL y todo funciona igual",
      "Elige entre cientos de modelos: Llama, Mistral, DeepSeek, Qwen, Phi...",
      "Cumplimiento de GDPR/compliance automático al no enviar datos fuera",
    ]`,
    whatYouLose: `[
      "GPT-4 y o1 siguen siendo los modelos más capaces del mercado para muchas tareas",
      "La velocidad de inferencia en la nube de OpenAI es difícil de igualar sin GPU potente",
      "DALL-E para generación de imágenes no tiene equivalente local tan integrado",
      "Function calling y JSON mode de OpenAI son los más fiables y documentados",
      "Necesitas gestionar infraestructura: servidor, GPU, actualizaciones de modelos",
      "El fine-tuning en OpenAI es más sencillo que hacerlo localmente",
    ]`,
    detailedComparison: `"La decisión depende de tu caso de uso. Si procesas datos sensibles (salud, legal, finanzas), la alternativa local es casi obligatoria por compliance. Si tu factura de OpenAI supera los 500€/mes, un servidor con GPU dedicada puede amortizarse en 2-3 meses. Si necesitas la máxima calidad posible y el coste no es problema, la API de OpenAI con GPT-4 sigue siendo la opción más cómoda. Lo inteligente para muchas empresas es un enfoque híbrido: modelo local para tareas rutinarias (80% del volumen, 20% del coste) y API de OpenAI para tareas complejas (20% del volumen, 80% de la calidad)."`
  },
  "miro": {
    whatYouGain: `[
      "Gratis al 100% — sin coste por usuario ni planes limitados",
      "Carga en milisegundos (no los 5-10 segundos de Miro)",
      "Sin cuenta obligatoria — abre la web y empieza a dibujar",
      "Cifrado end-to-end en sesiones colaborativas — ni los servidores ven tu diagrama",
      "Self-hosteable para empresas con requisitos de seguridad",
      "Estilo hand-drawn único que hace los diagramas técnicos más accesibles y atractivos",
      "Integraciones con Obsidian, VS Code, Notion, Confluence...",
    ]`,
    whatYouLose: `[
      "Miro es mejor para workshops de diseño con 20+ personas simultáneamente",
      "Las plantillas de Miro (retrospectivas, user stories, journeys) son más variadas",
      "Miro tiene vídeo-chat integrado para sesiones de brainstorming",
      "La gestión de permisos y workspaces de Miro para equipos grandes es más completa",
      "Los sticky notes y votaciones de Miro son mejores para dinámicas de grupo",
      "Figma/FigJam se integra mejor con el flujo de diseño de producto",
    ]`,
    detailedComparison: `"Para diagramas técnicos (arquitectura de software, flujos de datos, wireframes, explicaciones visuales), la alternativa open source es superior a Miro y FigJam. Es más rápida, más enfocada, y el estilo visual hand-drawn produce diagramas que la gente quiere mirar. Para workshops colaborativos con muchas personas (retrospectivas, design sprints, brainstormings con sticky notes), Miro sigue siendo difícil de sustituir. La clave es no usar un martillo para todo: la alternativa para diagramas técnicos, Miro para workshops de equipo."`
  },
  "uptimerobot": {
    whatYouGain: `[
      "Sin límite de monitores (UptimeRobot limita a 50 en el plan gratuito)",
      "Intervalos de comprobación de 20 segundos (vs 5 minutos en UptimeRobot Free)",
      "Más de 90 canales de notificación (vs ~10 en UptimeRobot)",
      "Página de estado pública completamente personalizable (logo, colores, dominio propio)",
      "Monitorización de Docker, bases de datos, DNS, certificados SSL y más",
      "Tus datos de monitorización en tu servidor, no en los de UptimeRobot",
      "Dashboard más elegante y con mejor experiencia de usuario",
    ]`,
    whatYouLose: `[
      "UptimeRobot monitoriza desde múltiples ubicaciones globales — self-hosting solo desde tu servidor",
      "No necesitas gestionar infraestructura con UptimeRobot (SaaS gestionado)",
      "Las apps móviles de UptimeRobot están más pulidas",
      "UptimeRobot tiene un API más documentada para integraciones enterprise",
    ]`,
    detailedComparison: `"Para la mayoría de personas y equipos, la alternativa self-hosted es superior en todo excepto en una cosa: la monitorización multi-región. UptimeRobot comprueba tu web desde Dallas, Londres, Singapur, etc. Con self-hosting, solo compruebas desde donde está tu servidor. Si necesitas saber que tu web funciona desde Asia, UptimeRobot tiene ventaja. Para todo lo demás — cantidad de monitores, frecuencia de comprobación, canales de notificación, personalización de la página de estado — la alternativa open source gana por goleada. Y es gratis."`
  },
};

for (const [slug, data] of Object.entries(replacements)) {
  const emptyGain = `slug: "${slug}",
`;

  // Replace empty arrays with real content
  const pattern = new RegExp(
    `(slug: "${slug}",[\\s\\S]*?)whatYouGain: \\[\\],\\n\\s*whatYouLose: \\[\\],\\n\\s*detailedComparison: "",`,
    "m"
  );

  content = content.replace(pattern, (match, prefix) => {
    return `${prefix}whatYouGain: ${data.whatYouGain},\n    whatYouLose: ${data.whatYouLose},\n    detailedComparison: ${data.detailedComparison},`;
  });
}

fs.writeFileSync(filePath, content);
console.log("✅ 12 productos actualizados con qué ganas/pierdes");
