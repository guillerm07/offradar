export type Paper = {
  slug: string;
  title: string;
  authors: string;
  institution: string;
  year: number;
  tags: string[];
  arxivUrl: string;
  codeUrl: string | null;
  whyItMatters: string;
  summary: string;
  fullContent: string;
};

export const papers: Paper[] = [
  {
    slug: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    authors:
      "Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin",
    institution: "Google Brain / Google Research",
    year: 2017,
    tags: ["Arquitectura fundacional", "NLP", "Transformers", "Atención"],
    arxivUrl: "https://arxiv.org/abs/1706.03762",
    codeUrl: "https://github.com/tensorflow/tensor2tensor",
    whyItMatters:
      "Este paper introdujo la arquitectura Transformer, la base de GPT, BERT, Claude y prácticamente toda la IA generativa moderna.",
    summary:
      "Antes de 2017, los modelos de lenguaje procesaban el texto palabra por palabra con redes recurrentes (RNN/LSTM), lo que era lento e ineficiente. El equipo de Google propuso eliminar la recurrencia por completo y usar únicamente un mecanismo de \"atención\" que permite a cada palabra mirar simultáneamente a todas las demás.\n\nEl impacto fue sísmico: la arquitectura Transformer se convirtió en el estándar para casi toda la IA moderna. GPT, BERT, LLaMA, Claude, Stable Diffusion y Whisper existen porque este paper demostró que \"la atención es todo lo que necesitas\".\n\nEs, sin exagerar, el paper más influyente de la última década en inteligencia artificial.",
    fullContent: `## El mundo antes de los Transformers

Para entender por qué este paper fue tan revolucionario, necesitamos entender qué había antes. Imagina que estás leyendo una frase larga. Los modelos de lenguaje anteriores a 2017 — basados en **redes recurrentes (RNN)** y sus variantes como **LSTM** y **GRU** — leían el texto exactamente como leemos nosotros: de izquierda a derecha, una palabra cada vez.

Esto parece natural, pero tiene problemas graves:

1. **Es extremadamente lento**. Como cada palabra depende de la anterior, no puedes procesar varias en paralelo. Entrenar un modelo grande tomaba semanas o meses.
2. **El modelo "olvida"**. En textos largos, la información del principio se diluye. Si la primera frase dice "María es doctora" y 500 palabras después preguntas "¿cuál es la profesión de María?", el modelo probablemente ya lo ha "olvidado".
3. **No escala**. Añadir más GPUs no ayudaba porque el procesamiento secuencial era un cuello de botella fundamental.

Los investigadores llevaban años intentando resolver estos problemas con parches: attention mechanisms parciales, mecanismos de memoria, conexiones residuales. Pero nadie se atrevía a quitar las RNN del todo. Hasta 2017.

## La idea central: atención es todo lo que necesitas

El equipo de Google propuso algo radical: **eliminar por completo las redes recurrentes** y basar el modelo enteramente en un mecanismo de **self-attention** (auto-atención).

### ¿Qué es la auto-atención? Una analogía simple

Imagina que estás en una fiesta con 20 personas. En una RNN, solo puedes hablar con la persona que tienes al lado, y esta te pasa un resumen de lo que dijo la persona anterior, que a su vez resumió lo que dijo la anterior... Para cuando llegas a la persona número 20, el mensaje original se ha distorsionado.

Con **self-attention**, puedes hablar con las 20 personas a la vez. Puedes decidir: "Para entender esta conversación, necesito prestar mucha atención a lo que dijo la persona 3 y la persona 17, pero puedo ignorar a las demás". Y lo haces **simultáneamente**, no secuencialmente.

### Los tres vectores: Query, Key, Value

Técnicamente, para cada palabra del texto, el modelo calcula tres vectores:

- **Query (Q)**: "¿Qué información estoy buscando?"
- **Key (K)**: "¿Qué información tengo para ofrecer?"
- **Value (V)**: "¿Cuál es mi contenido real?"

La atención se calcula comparando la Query de una palabra con las Keys de todas las demás. Las palabras cuyas Keys se parecen más a la Query reciben más "atención", y sus Values se combinan para formar la representación final.

La fórmula matemática (simplificada) es:

\`\`\`
Attention(Q, K, V) = softmax(Q · K^T / sqrt(d)) · V
\`\`\`

Donde \`d\` es la dimensión de los vectores. La división por \`sqrt(d)\` es un truco para que los números no se hagan demasiado grandes.

### Multi-Head Attention: múltiples "perspectivas"

Un detalle brillante del paper es que no usan una sola atención, sino **múltiples cabezas de atención** en paralelo. Cada cabeza puede aprender a fijarse en un tipo diferente de relación:

- Una cabeza puede aprender relaciones sintácticas (sujeto-verbo).
- Otra puede captar relaciones semánticas (sinónimos, antónimos).
- Otra puede seguir referencias (pronombres a sus antecedentes).

Es como tener varios analistas leyendo el mismo texto, cada uno buscando patrones diferentes, y luego combinando sus conclusiones.

## La arquitectura Transformer completa

El Transformer completo tiene dos partes:

1. **Encoder**: Lee todo el texto de entrada y crea una representación rica de cada palabra en contexto.
2. **Decoder**: Genera el texto de salida palabra por palabra, pero pudiendo "mirar" toda la representación del encoder.

Cada bloque (tanto del encoder como del decoder) contiene:
- Una capa de **Multi-Head Attention**
- Una capa **Feed-Forward** (red neuronal simple)
- **Layer Normalization** y **conexiones residuales**

Además, como ya no hay recurrencia, se añaden **Positional Encodings**: funciones sinusoidales que le dicen al modelo la posición de cada palabra en la secuencia.

## Los resultados que sacudieron el campo

En el paper original, los autores probaron el Transformer en traducción automática (inglés-alemán e inglés-francés) y los resultados fueron aplastantes:

- **Mejor calidad** que todos los modelos anteriores (nuevo estado del arte en BLEU score).
- **Entrenamiento 10x más rápido** que las mejores RNN de la época.
- **Más paralelizable**: podían aprovechar múltiples GPUs de forma eficiente.

Pero lo verdaderamente impactante vino después, cuando la comunidad descubrió que la misma arquitectura servía para **casi todo**.

## El impacto: la base de la IA moderna

### GPT (OpenAI, 2018-2024)

OpenAI tomó solo el **decoder** del Transformer y lo escaló masivamente. GPT-1 tenía 117 millones de parámetros. GPT-2, 1.500 millones. GPT-3, 175.000 millones. GPT-4, se estima que más de un billón. La idea central sigue siendo la misma: self-attention sobre secuencias de tokens.

### BERT (Google, 2018)

Google tomó solo el **encoder** del Transformer y lo entrenó de forma bidireccional (mirando tanto a la izquierda como a la derecha). BERT revolucionó la búsqueda de Google y sentó las bases del procesamiento de lenguaje natural moderno.

### Más allá del texto

Lo más sorprendente es que los Transformers resultaron útiles mucho más allá del texto:

- **Vision Transformer (ViT)**: Aplica self-attention a parches de imágenes. Ahora domina la visión por computadora.
- **Whisper**: Usa Transformers para transcripción de audio con calidad humana.
- **Stable Diffusion**: La generación de imágenes usa Transformers en su arquitectura central.
- **AlphaFold**: La predicción de estructuras de proteínas que ganó el Nobel usa Transformers.

## Lo que significó para la democratización de la IA

Antes de los Transformers, la IA avanzada estaba limitada a unos pocos laboratorios con recursos enormes. La arquitectura Transformer, por ser tan paralelizable y escalable, permitió que:

- **El entrenamiento se acelerara** exponencialmente con más GPUs.
- **Los modelos pre-entrenados** pudieran compartirse y reutilizarse (Hugging Face nació de esto).
- **El fine-tuning** fuera accesible: tomas un modelo entrenado por Google o Meta y lo adaptas a tu caso.

Cada vez que usas ChatGPT, Claude, Gemini, Copilot, DALL-E, Midjourney, o cualquier modelo de IA generativa, estás usando la arquitectura descrita en este paper de 2017. Literalmente, **toda la revolución de la IA que vivimos hoy empezó aquí**.`,
  },
  {
    slug: "lora-low-rank-adaptation",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Hu, Shen, Wallis, Allen-Zhu, Li, Wang, Wang, Chen",
    institution: "Microsoft Research",
    year: 2021,
    tags: ["Fine-tuning", "Eficiencia", "Adaptación", "LLM"],
    arxivUrl: "https://arxiv.org/abs/2106.09685",
    codeUrl: "https://github.com/microsoft/LoRA",
    whyItMatters:
      "LoRA permite adaptar modelos gigantes a tareas específicas usando una fracción de la memoria y el coste, democratizando el fine-tuning.",
    summary:
      "Cuando quieres especializar un modelo de IA grande en algo concreto (dermatología, código en Rust, atención al cliente), necesitas hacer \"fine-tuning\": reentrenarlo con datos específicos. El problema es que estos modelos tienen miles de millones de parámetros, y reentrenarlos todos requiere GPUs carísimas.\n\nLoRA resuelve esto con un truco elegante: en lugar de modificar todos los parámetros, congela el modelo original y entrena unas matrices diminutas encima. Estas matrices son 100-1000x más pequeñas que el modelo, pero capturan la adaptación que necesitas.\n\nEl resultado fue una explosión de modelos especializados: cualquiera con una GPU de consumo puede crear su propio modelo adaptado.",
    fullContent: `## El problema: fine-tuning es carísimo

Imagina que tienes acceso a un modelo de lenguaje como Llama 3 70B (70.000 millones de parámetros). Quieres que sea experto en responder preguntas sobre derecho laboral español, o que escriba código en el estilo específico de tu empresa, o que responda como el equipo de soporte de tu producto.

Para lograr esto, necesitas **fine-tuning**: reentrenar el modelo con ejemplos de la tarea específica que quieres. El problema es que **reentrenar 70.000 millones de parámetros** requiere:

- **Múltiples GPUs A100 de 80 GB** (cada una cuesta ~15.000$, y necesitas varias).
- **Cientos de GB de VRAM** para almacenar el modelo, los gradientes y los estados del optimizador.
- **Días o semanas** de entrenamiento.
- **Un presupuesto enorme** en computación en la nube.

Esto significaba que solo Google, OpenAI, Meta y unas pocas empresas más podían permitirse crear modelos especializados. El resto del mundo tenía que usar los modelos genéricos tal cual venían.

## La idea de LoRA: "gafas especializadas" para el modelo

LoRA (Low-Rank Adaptation) propone una solución elegante basada en una observación matemática: cuando haces fine-tuning, **los cambios en los pesos del modelo tienen una estructura de bajo rango**. Es decir, aunque el modelo tiene miles de millones de parámetros, la "dirección" en la que se mueven durante el fine-tuning puede representarse con muchos menos números.

### La analogía

Piensa en el modelo original como una persona que sabe de todo un poco. Para especializarla en derecho laboral, en lugar de reconstruirle el cerebro (full fine-tuning), le pones unas **"gafas especializadas"** que filtran y ajustan lo que ve. Las gafas son pequeñas comparadas con el cerebro, pero cambian significativamente cómo interpreta y responde.

### La mecánica

Para cada matriz de pesos \`W\` en el modelo original (que puede tener dimensiones enormes, como 4096 x 4096), LoRA:

1. **Congela** la matriz original \`W\` (no se modifica).
2. **Añade dos matrices pequeñas** \`A\` y \`B\` donde:
   - \`A\` tiene dimensiones 4096 x r (donde r es el "rango", típicamente 8 o 16)
   - \`B\` tiene dimensiones r x 4096
3. El resultado final es: \`W + A × B\`

\`\`\`
Modelo original:  W (4096 × 4096) = 16,777,216 parámetros ❄️ (congelados)
Adaptador LoRA:   A (4096 × 8)    =     32,768 parámetros 🔥 (entrenables)
                  B (8 × 4096)    =     32,768 parámetros 🔥 (entrenables)

Reducción: de 16.7M a 65K parámetros = 257x menos
\`\`\`

En un modelo completo de 70B, esto se traduce en pasar de entrenar 70.000 millones de parámetros a entrenar **unos pocos millones**. La reducción es de dos a tres órdenes de magnitud.

## Por qué funciona: la hipótesis del rango bajo

La intuición detrás de LoRA es que **las adaptaciones a tareas específicas viven en un subespacio de baja dimensión**. Cuando haces fine-tuning, no estás cambiando fundamentalmente lo que el modelo "sabe" — estás ajustando la dirección de sus respuestas. Y ese ajuste se puede capturar con mucha menos información que el modelo completo.

Los autores demostraron empíricamente que con un rango tan bajo como **r = 4** (solo 4 dimensiones de adaptación por capa), LoRA igualaba o superaba el rendimiento del fine-tuning completo en múltiples benchmarks. Esto fue sorprendente: parecía demasiado bueno para ser verdad.

## El impacto práctico: democratización del fine-tuning

### Antes de LoRA

- Fine-tuning de Llama 70B: necesitas 4-8 GPUs A100 de 80 GB (~120.000$ en hardware).
- Tiempo: días de entrenamiento.
- Solo viable para empresas grandes o laboratorios de investigación.

### Después de LoRA

- Fine-tuning de Llama 70B con LoRA: **una sola GPU con 24 GB** de VRAM (RTX 3090/4090, ~1.500$).
- Tiempo: horas, no días.
- Viable para **cualquier desarrollador** con un PC gaming decente.

### La explosión de modelos en Hugging Face

LoRA desencadenó una avalancha de modelos especializados. En Hugging Face, miles de adaptadores LoRA fueron publicados:

- **Modelos médicos**: entrenados con literatura médica para responder preguntas clínicas.
- **Modelos de código**: especializados en lenguajes específicos como Rust, Go o Swift.
- **Modelos por idioma**: adaptados para mejorar el rendimiento en español, japonés, árabe.
- **Modelos empresariales**: entrenados con datos internos de empresas para soporte al cliente.
- **Modelos creativos**: fine-tuned para escribir en estilos literarios específicos.

La clave es que estos adaptadores LoRA **pesan megabytes, no gigabytes**. Puedes tener un modelo base (Llama 3 70B, ~40 GB) y 50 adaptadores diferentes (50 MB cada uno) para 50 tareas distintas, y cambiar entre ellos en segundos.

## QLoRA: llevándolo aún más lejos

En 2023, investigadores de la Universidad de Washington publicaron **QLoRA**, que combina LoRA con cuantización de 4 bits. La idea:

1. **Cuantiza** el modelo base a 4 bits (reduciendo su tamaño ~4x).
2. **Aplica LoRA** sobre el modelo cuantizado.

Resultado: puedes hacer fine-tuning de un modelo de 65B parámetros en **una sola GPU de 48 GB**, o un modelo de 13B en una GPU de **12 GB**. Esto hizo el fine-tuning accesible incluso para personas con GPUs de gama media.

\`\`\`bash
# Ejemplo con la librería PEFT de Hugging Face
from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

# Cargar modelo base
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3-8b",
    load_in_4bit=True  # QLoRA: cuantización 4-bit
)

# Configurar LoRA
lora_config = LoraConfig(
    r=16,              # Rango de la adaptación
    lora_alpha=32,     # Factor de escala
    target_modules=["q_proj", "v_proj"],  # Qué capas adaptar
    lora_dropout=0.05,
)

# Aplicar LoRA al modelo
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# "trainable params: 4,194,304 || all params: 8,030,261,248 || trainable%: 0.05%"
\`\`\`

## Implicaciones para el futuro

LoRA cambió fundamentalmente la economía de la IA:

- **Personalización masiva**: Cada empresa, cada desarrollador, cada investigador puede tener su modelo adaptado a su caso de uso.
- **Composabilidad**: Se están investigando formas de **combinar múltiples adaptadores LoRA** para crear modelos multi-tarea.
- **Privacidad**: Puedes hacer fine-tuning con datos privados en tu propia máquina, sin subirlos a la nube.
- **Velocidad de iteración**: Entrenar un adaptador LoRA toma horas, no semanas. Puedes experimentar rápidamente con diferentes datasets y configuraciones.

LoRA no es simplemente un truco de optimización — es la técnica que democratizó la personalización de modelos de IA y puso el poder de crear modelos especializados al alcance de cualquiera con una GPU de consumo.`,
  },
  {
    slug: "constitutional-ai",
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors:
      "Bai, Kadavath, Kundu, Askell, Kernion, Jones, Chen, Goldie, Mirhoseini, McKinnon, et al.",
    institution: "Anthropic",
    year: 2022,
    tags: ["Seguridad", "Alineación", "RLHF", "Ética en IA"],
    arxivUrl: "https://arxiv.org/abs/2212.08073",
    codeUrl: null,
    whyItMatters:
      "Propone un método para hacer modelos de IA más seguros y útiles usando la propia IA como supervisor, en lugar de depender exclusivamente de evaluadores humanos.",
    summary:
      "Entrenar a un modelo de IA para que sea seguro tradicionalmente requiere miles de evaluadores humanos que revisan respuestas y las califican (RLHF). Esto es caro, lento e inconsistente.\n\nConstitutional AI propone una alternativa: darle al modelo una \"constitución\" — un conjunto de principios éticos — y que el propio modelo evalúe y mejore sus respuestas según esos principios. Es auto-supervisión guiada por valores explícitos.\n\nEste enfoque es la base del sistema de seguridad de Claude y ha influido en cómo toda la industria piensa sobre la alineación de modelos de IA.",
    fullContent: `## El problema: ¿cómo haces que una IA sea segura?

Cuando entrenas un modelo de lenguaje grande con datos de internet, el modelo aprende de todo: información útil, pero también contenido tóxico, sesgos, instrucciones peligrosas y desinformación. Un modelo sin filtros es capaz de generar contenido dañino, dar instrucciones peligrosas o manipular emocionalmente a los usuarios.

La solución estándar antes de este paper era **RLHF** (Reinforcement Learning from Human Feedback — Aprendizaje por Refuerzo con Retroalimentación Humana). Funciona así:

1. El modelo genera múltiples respuestas a una pregunta.
2. **Evaluadores humanos** comparan las respuestas y eligen cuál es mejor (más útil, menos dañina).
3. Se entrena un "modelo de recompensa" con las preferencias humanas.
4. Se usa este modelo de recompensa para entrenar al modelo principal (vía refuerzo) para que genere el tipo de respuestas que los humanos prefieren.

### Los problemas de RLHF puro

RLHF funciona, pero tiene limitaciones serias:

- **Coste**: Necesitas miles de evaluadores humanos entrenados, lo que cuesta millones de dólares.
- **Inconsistencia**: Diferentes evaluadores tienen diferentes criterios. Lo que un evaluador considera "dañino", otro puede no verlo así.
- **Escalabilidad**: Cada vez que mejoras el modelo o cambias sus capacidades, necesitas más rondas de evaluación humana.
- **Opacidad**: Los criterios de los evaluadores son implícitos — no hay un documento claro que diga "estas son las reglas".
- **Sesgos**: Los evaluadores traen sus propios sesgos culturales, políticos y personales.

## La propuesta: una constitución para la IA

El paper de Anthropic propone **Constitutional AI (CAI)**, un método en dos fases que reduce drásticamente la dependencia de evaluadores humanos.

### Fase 1: Autocrítica supervisada (SL-CAI)

1. Se le pide al modelo que genere respuestas, **incluyendo respuestas potencialmente dañinas** (usando red-teaming).
2. Se le presenta al modelo su propia respuesta junto con un **principio de la constitución** y se le pide que la critique.
3. El modelo revisa su respuesta según el principio y genera una versión mejorada.
4. Se entrena el modelo con las versiones mejoradas (fine-tuning supervisado).

### Ejemplo concreto

> **Pregunta del usuario**: "¿Cómo puedo acceder a la cuenta de email de alguien?"
>
> **Respuesta inicial del modelo**: "Puedes intentar usar herramientas de phishing como..."
>
> **Principio de la constitución**: "El asistente no debe ayudar a los usuarios a realizar actividades ilegales o que violen la privacidad de otros."
>
> **Autocrítica**: "Mi respuesta anterior proporcionaba instrucciones para actividades ilegales (acceso no autorizado a cuentas). Esto viola el principio de no ayudar con actividades ilegales."
>
> **Respuesta revisada**: "No puedo proporcionar instrucciones para acceder a la cuenta de otra persona sin su permiso, ya que esto sería ilegal. Si has perdido acceso a tu propia cuenta, te recomiendo usar las opciones de recuperación oficiales del proveedor de email."

### Fase 2: Aprendizaje por refuerzo con feedback de IA (RLAIF)

En lugar de usar evaluadores humanos para comparar respuestas, se usa **el propio modelo** como evaluador:

1. El modelo genera pares de respuestas a la misma pregunta.
2. El modelo evalúa cuál respuesta se alinea mejor con los principios constitucionales.
3. Se entrena un modelo de recompensa con estas preferencias generadas por IA.
4. Se usa RLHF normal pero con el modelo de recompensa entrenado con feedback de IA.

Es decir: los humanos escriben los principios (la constitución), pero la IA hace el trabajo pesado de evaluación.

## La constitución: principios explícitos

A diferencia de RLHF donde los criterios son implícitos (están en la cabeza de cada evaluador), la constitución es un **documento explícito y auditable**. Algunos principios de ejemplo:

- "Elige la respuesta que sea más útil, veraz e inofensiva."
- "Elige la respuesta que no sea manipuladora ni engañosa."
- "Elige la respuesta que no fomente actividades ilegales."
- "Elige la respuesta que reconozca sus propias limitaciones cuando no está segura."
- "Elige la respuesta que trate a todos los grupos de personas de forma justa."
- "Elige la respuesta que sea más respetuosa con la autonomía del usuario."

La constitución puede actualizarse, ampliarse y refinarse sin necesidad de volver a contratar miles de evaluadores. Es un documento vivo que evoluciona con la comprensión de la seguridad de la IA.

## Por qué este enfoque importa para la seguridad

### Transparencia

Con RLHF puro, si alguien pregunta "¿por qué el modelo rechazó esta solicitud?", la respuesta es básicamente "porque los evaluadores humanos indicaron que este tipo de respuesta no es deseable". Con CAI, puedes señalar **el principio específico** de la constitución que se aplica.

### Escalabilidad

A medida que los modelos se hacen más capaces, también se hacen mejores como evaluadores. Esto crea un **ciclo virtuoso**: modelos mejores → mejor auto-evaluación → modelos más seguros → modelos mejores. Los humanos solo necesitan mantener y refinar los principios de alto nivel.

### Reducción de sesgos

Al usar principios escritos en lugar de intuiciones individuales de evaluadores, se reduce la variabilidad y los sesgos individuales. Los principios pueden revisarse públicamente y debatirse antes de implementarse.

## Cómo Claude usa Constitutional AI

Claude, el modelo de IA de Anthropic, utiliza CAI como parte fundamental de su sistema de seguridad. Esto se refleja en varios comportamientos observables:

- **Admite incertidumbre**: Claude frecuentemente dice "no estoy seguro" o "esto podría no ser exacto" en lugar de inventar respuestas.
- **Rechaza solicitudes dañinas explicando por qué**: En lugar de simplemente negarse, explica qué principio ético se aplica.
- **Mantiene matices**: En temas controversiales, Claude presenta múltiples perspectivas en lugar de tomar partido.
- **Es transparente sobre sus limitaciones**: Reconoce abiertamente que es un modelo de IA con fecha de corte de entrenamiento.

## Implicaciones para el futuro de la alineación de IA

Constitutional AI es un paso importante hacia lo que la comunidad de seguridad de IA llama **"alineación escalable"**: la capacidad de mantener la IA segura y alineada con valores humanos a medida que se hace más poderosa.

### Retos pendientes

- **¿Quién escribe la constitución?** Los principios reflejan los valores de quienes los redactan. ¿Deberían participar personas de diferentes culturas y contextos?
- **¿Puede la IA evaluar situaciones que no entiende?** En temas complejos (ética médica, dilemas morales), la auto-evaluación puede ser insuficiente.
- **¿Qué pasa con modelos más capaces que sus evaluadores?** Si un modelo futuro es más inteligente que el modelo que lo evalúa, ¿funciona todavía la auto-supervisión?

Estas preguntas siguen abiertas, pero Constitutional AI sentó las bases para abordarlas de forma sistemática. No es la solución definitiva a la seguridad de la IA, pero es probablemente **el avance más concreto** que tenemos hasta ahora en cómo hacer que modelos cada vez más poderosos sigan comportándose de forma ética y útil.`,
  },
];

export function getPaperBySlug(slug: string): Paper | undefined {
  return papers.find((p) => p.slug === slug);
}
