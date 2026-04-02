"""
Scraper de Hacker News usando la API Firebase.

Obtiene las historias principales y filtra aquellas con
puntuacion superior a 50 para encontrar proyectos relevantes.
"""

import asyncio
from datetime import datetime

import httpx

from scrapers.config import DEFAULT_TIMEOUT, REQUEST_DELAY
from scrapers.models.schemas import RawItem, RawItemMetadata

HN_API_BASE = "https://hacker-news.firebaseio.com/v0"
TOP_STORIES_LIMIT = 30  # cantidad de historias a consultar en detalle
MIN_SCORE = 50  # puntuacion minima para incluir una historia


async def scrape_hackernews() -> list[RawItem]:
    """
    Recolecta las historias principales de Hacker News.

    Obtiene los IDs de las top stories, consulta el detalle de
    las primeras 30 y filtra por puntuacion > 50.

    Returns:
        Lista de RawItem con las historias filtradas.
    """
    items: list[RawItem] = []

    async with httpx.AsyncClient(timeout=DEFAULT_TIMEOUT) as client:
        # Obtener lista de IDs de top stories
        try:
            response = await client.get(f"{HN_API_BASE}/topstories.json")
            response.raise_for_status()
            story_ids: list[int] = response.json()
        except httpx.HTTPError as e:
            print(f"[hackernews] Error al obtener top stories: {e}")
            return items

        # Tomar solo las primeras TOP_STORIES_LIMIT
        story_ids = story_ids[:TOP_STORIES_LIMIT]

        # Consultar detalle de cada historia en lotes para no saturar
        for story_id in story_ids:
            try:
                detail_response = await client.get(f"{HN_API_BASE}/item/{story_id}.json")
                detail_response.raise_for_status()
                story = detail_response.json()

                if story is None:
                    continue

                score = story.get("score", 0)
                if score < MIN_SCORE:
                    continue

                # Construir URL (puede ser una URL externa o de HN)
                story_url = story.get("url", "")
                if not story_url:
                    story_url = f"https://news.ycombinator.com/item?id={story_id}"

                title = story.get("title", "")
                author = story.get("by", "")
                comments_count = story.get("descendants", 0)
                created_timestamp = story.get("time", 0)
                created_at = datetime.utcfromtimestamp(created_timestamp).isoformat() if created_timestamp else ""

                item = RawItem(
                    source="hackernews",
                    source_id=str(story_id),
                    url=story_url,
                    title=title,
                    description=story.get("text", "") or "",
                    metadata=RawItemMetadata(
                        score=score,
                        comments=comments_count,
                        author=author,
                        created_at=created_at,
                    ),
                    collected_at=datetime.utcnow(),
                )
                items.append(item)

            except httpx.HTTPError as e:
                print(f"[hackernews] Error al obtener historia {story_id}: {e}")
                continue

            # Pausa entre peticiones para no saturar la API
            await asyncio.sleep(REQUEST_DELAY * 0.3)

    print(f"[hackernews] Recolectadas {len(items)} historias con score > {MIN_SCORE}")
    return items
