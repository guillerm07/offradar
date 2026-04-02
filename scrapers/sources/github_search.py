"""
Scraper de la API de busqueda de GitHub.

Busca repositorios creados en los ultimos 7 dias con mas de 50
estrellas, ordenados por estrellas. Usa la API REST v3 con
autenticacion por token.
"""

import asyncio
from datetime import datetime, timedelta

import httpx

from scrapers.config import (
    DEFAULT_TIMEOUT,
    GITHUB_TOKEN,
    MAX_README_CHARS,
    REQUEST_DELAY,
)
from scrapers.models.schemas import RawItem, RawItemMetadata

GITHUB_API_BASE = "https://api.github.com"
TOP_RESULTS_FOR_README = 15  # cantidad de repos a los que se les descarga el README


async def search_github_repos() -> list[RawItem]:
    """
    Busca repositorios nuevos y populares en GitHub.

    Consulta la API de busqueda para repos creados en la ultima
    semana con >50 estrellas. Descarga el README de los primeros
    resultados.

    Returns:
        Lista de RawItem con los repositorios encontrados.
    """
    items: list[RawItem] = []

    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    else:
        print("[github_search] ADVERTENCIA: Sin GITHUB_TOKEN, los rate limits seran muy bajos")

    # Fecha de hace 7 dias en formato ISO
    week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%d")
    query = f"created:>{week_ago} stars:>50"

    params = {
        "q": query,
        "sort": "stars",
        "order": "desc",
        "per_page": 30,
    }

    async with httpx.AsyncClient(timeout=DEFAULT_TIMEOUT, headers=headers) as client:
        # Buscar repositorios
        try:
            response = await client.get(f"{GITHUB_API_BASE}/search/repositories", params=params)
            response.raise_for_status()
            data = response.json()
        except httpx.HTTPError as e:
            print(f"[github_search] Error en la busqueda: {e}")
            return items

        repos = data.get("items", [])

        for i, repo in enumerate(repos):
            try:
                full_name = repo.get("full_name", "")
                owner = repo.get("owner", {}).get("login", "")
                topics = repo.get("topics", [])
                created_at = repo.get("created_at", "")

                # Obtener README para los primeros resultados
                readme_content = None
                if i < TOP_RESULTS_FOR_README:
                    readme_content = await _fetch_readme(client, full_name)
                    await asyncio.sleep(REQUEST_DELAY)

                item = RawItem(
                    source="github_search",
                    source_id=full_name,
                    url=repo.get("html_url", ""),
                    title=full_name,
                    description=repo.get("description", "") or "",
                    metadata=RawItemMetadata(
                        stars=repo.get("stargazers_count", 0),
                        forks=repo.get("forks_count", 0),
                        language=repo.get("language"),
                        topics=topics,
                        created_at=created_at,
                        author=owner,
                    ),
                    readme_content=readme_content,
                    collected_at=datetime.utcnow(),
                )
                items.append(item)

            except Exception as e:
                print(f"[github_search] Error procesando repo {repo.get('full_name', '?')}: {e}")
                continue

    print(f"[github_search] Recolectados {len(items)} repositorios nuevos populares")
    return items


async def _fetch_readme(client: httpx.AsyncClient, full_name: str) -> str | None:
    """
    Descarga el contenido del README de un repositorio.

    Usa la API de GitHub para obtener el README decodificado.
    Retorna solo los primeros MAX_README_CHARS caracteres.

    Args:
        client: Cliente HTTP activo con headers de autenticacion.
        full_name: Nombre completo del repo (owner/repo).

    Returns:
        Contenido del README truncado o None si falla.
    """
    try:
        url = f"{GITHUB_API_BASE}/repos/{full_name}/readme"
        response = await client.get(url, headers={"Accept": "application/vnd.github.raw+json"})
        if response.status_code == 200:
            content = response.text[:MAX_README_CHARS]
            return content
    except httpx.HTTPError as e:
        print(f"[github_search] No se pudo obtener README de {full_name}: {e}")
    return None
