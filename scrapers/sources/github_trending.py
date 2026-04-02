"""
Scraper de la pagina de GitHub Trending.

Extrae los repositorios en tendencia parseando el HTML de
https://github.com/trending usando httpx + BeautifulSoup.
"""

import asyncio
from datetime import datetime

import httpx
from bs4 import BeautifulSoup

from scrapers.config import DEFAULT_TIMEOUT, REQUEST_DELAY
from scrapers.models.schemas import RawItem, RawItemMetadata


async def scrape_github_trending() -> list[RawItem]:
    """
    Obtiene los repositorios en tendencia de GitHub.

    Parsea el HTML de la pagina de trending y extrae nombre,
    descripcion, estrellas, lenguaje y estrellas del dia.

    Returns:
        Lista de RawItem con los repos en tendencia.
    """
    items: list[RawItem] = []
    url = "https://github.com/trending"

    async with httpx.AsyncClient(timeout=DEFAULT_TIMEOUT) as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
        except httpx.HTTPError as e:
            print(f"[github_trending] Error al obtener la pagina: {e}")
            return items

    soup = BeautifulSoup(response.text, "html.parser")
    articles = soup.select("article.Box-row")

    for article in articles:
        try:
            # Nombre del repositorio (owner/repo)
            h2 = article.select_one("h2 a")
            if not h2:
                continue
            repo_path = h2.get("href", "").strip("/")
            if not repo_path:
                continue

            parts = repo_path.split("/")
            if len(parts) < 2:
                continue
            owner = parts[0]
            repo_name = parts[1]
            full_name = f"{owner}/{repo_name}"

            # Descripcion
            desc_tag = article.select_one("p")
            description = desc_tag.get_text(strip=True) if desc_tag else ""

            # Lenguaje de programacion
            lang_tag = article.select_one("[itemprop='programmingLanguage']")
            language = lang_tag.get_text(strip=True) if lang_tag else None

            # Estrellas totales
            stars_tag = article.select_one("a[href$='/stargazers']")
            stars = _parse_number(stars_tag.get_text(strip=True)) if stars_tag else 0

            # Forks
            forks_tag = article.select_one("a[href$='/forks']")
            forks = _parse_number(forks_tag.get_text(strip=True)) if forks_tag else 0

            # Estrellas del dia
            stars_today = 0
            spans = article.select("span.d-inline-block.float-sm-right")
            if spans:
                text = spans[0].get_text(strip=True)
                stars_today = _parse_number(text.split(" ")[0])

            item = RawItem(
                source="github_trending",
                source_id=full_name,
                url=f"https://github.com/{full_name}",
                title=full_name,
                description=description,
                metadata=RawItemMetadata(
                    stars=stars,
                    forks=forks,
                    language=language,
                    author=owner,
                    topics=[],
                ),
                collected_at=datetime.utcnow(),
            )
            items.append(item)

        except Exception as e:
            print(f"[github_trending] Error parseando articulo: {e}")
            continue

    # Pequena pausa para respetar rate limits
    await asyncio.sleep(REQUEST_DELAY)

    print(f"[github_trending] Recolectados {len(items)} repositorios en tendencia")
    return items


def _parse_number(text: str) -> int:
    """
    Convierte texto numerico de GitHub a entero.

    Maneja formatos como '1,234' o '1.2k'.
    """
    text = text.strip().replace(",", "")
    if not text:
        return 0
    if "k" in text.lower():
        try:
            return int(float(text.lower().replace("k", "")) * 1000)
        except ValueError:
            return 0
    try:
        return int(text)
    except ValueError:
        return 0
