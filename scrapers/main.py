"""
Punto de entrada principal de los scrapers de OffRadar.

Ejecuta el colector, guarda los items crudos como JSON con
marca de tiempo en data/raw/, y opcionalmente los inserta
en PostgreSQL si DATABASE_URL esta configurada.
"""

import asyncio
import json
from datetime import datetime

from scrapers.config import DATABASE_URL, RAW_DATA_DIR
from scrapers.models.schemas import RawItem
from scrapers.pipeline.collector import collect_all
from scrapers.pipeline.publisher import publish_project


def save_raw_items(items: list[RawItem]) -> str:
    """
    Guarda los items crudos en un archivo JSON con marca de tiempo.

    El archivo se crea en data/raw/ con el formato
    'raw_YYYYMMDD_HHMMSS.json'.

    Args:
        items: Lista de RawItem a serializar.

    Returns:
        Ruta del archivo creado.
    """
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    filename = f"raw_{timestamp}.json"
    filepath = RAW_DATA_DIR / filename

    # Serializar todos los items a diccionarios
    data = [item.model_dump(mode="json") for item in items]

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2, default=str)

    print(f"\n[main] Datos guardados en: {filepath}")
    return str(filepath)


def publish_to_db(items: list[RawItem]) -> int:
    """
    Publica los items recolectados en la base de datos.

    Convierte cada RawItem a formato compatible con la tabla
    'projects' y lo inserta/actualiza via el publisher.

    Args:
        items: Lista de RawItem a publicar.

    Returns:
        Cantidad de proyectos publicados exitosamente.
    """
    published = 0
    for item in items:
        project_data = {
            "source": item.source,
            "source_id": item.source_id,
            "url": item.url,
            "name": item.title,
            "description": item.description,
            "stars": item.metadata.stars,
            "forks": item.metadata.forks,
            "language": item.metadata.language,
            "author": item.metadata.author,
            "readme_content": item.readme_content,
            "tags": item.metadata.topics or [],
            "interest_score": item.metadata.score or item.metadata.stars or 0,
        }
        result = publish_project(project_data)
        if result is not None:
            published += 1
    return published


def print_summary(items: list[RawItem]) -> None:
    """
    Imprime un resumen de la recoleccion por fuente.

    Muestra el conteo por cada fuente y los 5 items mas
    destacados segun score/estrellas.

    Args:
        items: Lista de items recolectados.
    """
    print("\n" + "=" * 60)
    print("  RESUMEN DE RECOLECCION - OffRadar")
    print("=" * 60)

    # Conteo por fuente
    sources: dict[str, int] = {}
    for item in items:
        sources[item.source] = sources.get(item.source, 0) + 1

    print(f"\n  Total de items unicos: {len(items)}")
    print(f"  Fuentes activas: {len(sources)}")
    print()

    for source, count in sorted(sources.items()):
        print(f"    - {source}: {count} items")

    # Top 5 por relevancia
    def _score(item: RawItem) -> int:
        return (item.metadata.score or 0) + (item.metadata.stars or 0)

    top_items = sorted(items, key=_score, reverse=True)[:5]

    if top_items:
        print(f"\n  Top 5 mas destacados:")
        print("  " + "-" * 56)
        for i, item in enumerate(top_items, 1):
            score = _score(item)
            print(f"    {i}. [{item.source}] {item.title}")
            print(f"       Score/Stars: {score} | {item.url}")

    print("\n" + "=" * 60)


async def main() -> None:
    """
    Funcion principal asincrona.

    Ejecuta la recoleccion completa, guarda los resultados
    en JSON y opcionalmente en PostgreSQL.
    """
    print("=" * 60)
    print("  OffRadar - Recolector de proyectos tech")
    print(f"  Inicio: {datetime.utcnow().isoformat()}")
    print("=" * 60 + "\n")

    # Recolectar de todas las fuentes
    items = await collect_all()

    if not items:
        print("\n[main] No se recolectaron items. Verificar configuracion y conexion.")
        return

    # Guardar JSON crudo
    filepath = save_raw_items(items)

    # Publicar en BD si esta configurada
    if DATABASE_URL:
        print("\n[main] DATABASE_URL detectada, publicando en PostgreSQL...")
        published = publish_to_db(items)
        print(f"[main] Publicados {published}/{len(items)} proyectos en la base de datos")
    else:
        print("\n[main] DATABASE_URL no configurada, omitiendo publicacion en BD")
        print("[main] Los datos estan disponibles como JSON para analisis interactivo")

    # Imprimir resumen
    print_summary(items)

    print(f"\n[main] Archivo JSON: {filepath}")
    print("[main] Usa Claude Code para analizar los datos interactivamente")


if __name__ == "__main__":
    asyncio.run(main())
