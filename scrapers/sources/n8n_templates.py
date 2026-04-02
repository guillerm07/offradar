"""
Scraper de templates de n8n.

Obtiene los workflows más populares de la galería de templates de n8n
para inspirar la sección de automatizaciones y ideas replicables.
"""

import asyncio
from datetime import datetime, timezone

import httpx

from scrapers.config import REQUEST_DELAY
from scrapers.models.schemas import RawItem, RawItemMetadata


async def scrape_n8n_templates(limit: int = 30) -> list[RawItem]:
    """Obtiene templates populares de n8n."""
    items: list[RawItem] = []

    async with httpx.AsyncClient(timeout=30) as client:
        try:
            # La API pública de templates de n8n
            response = await client.get(
                "https://api.n8n.io/api/templates/search",
                params={
                    "rows": limit,
                    "page": 1,
                },
            )
            response.raise_for_status()
            data = response.json()

            workflows = data.get("workflows", [])

            for wf in workflows:
                wf_id = str(wf.get("id", ""))
                if not wf_id:
                    continue

                # Extraer nodos/integraciones usadas
                nodes = wf.get("nodes", [])
                node_names = [n.get("displayName", n.get("type", "")) for n in nodes]
                # Filtrar nodos internos
                node_names = [n for n in node_names if n and not n.startswith("n8n-nodes-base.")]

                categories = [c.get("name", "") for c in wf.get("categories", [])]

                items.append(
                    RawItem(
                        source="n8n_templates",
                        source_id=wf_id,
                        url=f"https://n8n.io/workflows/{wf_id}",
                        title=wf.get("name", "Sin título"),
                        description=wf.get("description", "") or f"Workflow de n8n con: {', '.join(node_names[:5])}",
                        metadata=RawItemMetadata(
                            score=wf.get("totalViews", 0),
                            comments=0,
                            topics=categories + node_names[:10],
                            author=wf.get("user", {}).get("username", "n8n"),
                            created_at=wf.get("createdAt", ""),
                        ),
                        readme_content=wf.get("description", ""),
                    )
                )

                await asyncio.sleep(REQUEST_DELAY * 0.5)

        except httpx.HTTPError as e:
            print(f"[n8n Templates] Error HTTP: {e}")
        except Exception as e:
            print(f"[n8n Templates] Error inesperado: {e}")

    print(f"[n8n Templates] {len(items)} templates obtenidos")
    return items
