"""
Orquestador principal de recoleccion.

Ejecuta todos los scrapers en paralelo, deduplica por URL
y retorna los resultados unificados.
"""

import asyncio

from scrapers.models.schemas import RawItem
from scrapers.sources.github_search import search_github_repos
from scrapers.sources.github_trending import scrape_github_trending
from scrapers.sources.hackernews import scrape_hackernews
from scrapers.sources.producthunt import scrape_producthunt
from scrapers.sources.n8n_templates import scrape_n8n_templates


async def collect_all() -> list[RawItem]:
    """
    Ejecuta todos los scrapers y deduplica resultados.

    Corre cada fuente de forma concurrente. Si una falla, las demas
    continuan funcionando. Deduplica por URL para evitar repetidos
    entre fuentes distintas (ej: un repo que aparece en trending y
    tambien en search).

    Returns:
        Lista deduplicada de RawItem de todas las fuentes.
    """
    # Ejecutar todos los scrapers en paralelo con manejo individual de errores
    results = await asyncio.gather(
        _safe_run("github_trending", scrape_github_trending),
        _safe_run("github_search", search_github_repos),
        _safe_run("hackernews", scrape_hackernews),
        _safe_run("producthunt", scrape_producthunt),
        _safe_run("n8n_templates", scrape_n8n_templates),
    )

    # Unir todos los resultados
    all_items: list[RawItem] = []
    for result in results:
        all_items.extend(result)

    # Deduplicar por URL, manteniendo el primer elemento encontrado
    seen_urls: set[str] = set()
    unique_items: list[RawItem] = []
    for item in all_items:
        if item.url not in seen_urls:
            seen_urls.add(item.url)
            unique_items.append(item)

    total = len(all_items)
    deduped = len(unique_items)
    duplicates = total - deduped

    print(f"\n[collector] Total recolectado: {total} items")
    if duplicates > 0:
        print(f"[collector] Duplicados eliminados: {duplicates}")
    print(f"[collector] Items unicos: {deduped}")

    return unique_items


async def _safe_run(name: str, coro_func) -> list[RawItem]:
    """
    Ejecuta un scraper con manejo de errores.

    Si el scraper falla por cualquier motivo, retorna lista vacia
    en vez de propagar la excepcion, para que las demas fuentes
    puedan continuar.

    Args:
        name: Nombre de la fuente para mensajes de log.
        coro_func: Funcion asincrona del scraper a ejecutar.

    Returns:
        Lista de items o lista vacia si hubo error.
    """
    try:
        return await coro_func()
    except Exception as e:
        print(f"[collector] ERROR en {name}: {e}")
        return []
