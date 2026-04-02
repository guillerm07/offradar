"""
Scraper de Product Hunt usando la API GraphQL v2.

Obtiene los productos en tendencia del dia. Excelente fuente para
descubrir ideas de software replicables con IA.
"""

import asyncio
from datetime import datetime

import httpx

from scrapers.config import (
    DEFAULT_TIMEOUT,
    PRODUCTHUNT_API_KEY,
    PRODUCTHUNT_API_SECRET,
    REQUEST_DELAY,
)
from scrapers.models.schemas import RawItem, RawItemMetadata

PH_API_URL = "https://api.producthunt.com/v2/api/graphql"

# Consulta GraphQL para obtener los posts en tendencia del dia
TRENDING_QUERY = """
query {
  posts(order: VOTES, first: 20) {
    edges {
      node {
        id
        name
        tagline
        description
        url
        website
        votesCount
        commentsCount
        createdAt
        makers {
          name
        }
        topics {
          edges {
            node {
              name
            }
          }
        }
        thumbnail {
          url
        }
      }
    }
  }
}
"""


async def scrape_producthunt() -> list[RawItem]:
    """
    Recolecta los productos en tendencia de Product Hunt.

    Usa la API GraphQL v2 para obtener los 20 productos con mas
    votos del dia, incluyendo nombre, tagline, votos y topicos.

    Returns:
        Lista de RawItem con los productos encontrados.
    """
    items: list[RawItem] = []

    if not PRODUCTHUNT_API_KEY:
        print("[producthunt] ADVERTENCIA: Sin PRODUCTHUNT_API_KEY, omitiendo esta fuente")
        return items

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {PRODUCTHUNT_API_KEY}",
    }

    async with httpx.AsyncClient(timeout=DEFAULT_TIMEOUT) as client:
        try:
            response = await client.post(
                PH_API_URL,
                json={"query": TRENDING_QUERY},
                headers=headers,
            )
            response.raise_for_status()
            data = response.json()
        except httpx.HTTPError as e:
            print(f"[producthunt] Error al consultar la API: {e}")
            return items

        # Verificar errores de GraphQL
        if "errors" in data:
            print(f"[producthunt] Errores de GraphQL: {data['errors']}")
            return items

        posts = data.get("data", {}).get("posts", {}).get("edges", [])

        for edge in posts:
            try:
                node = edge.get("node", {})

                # Extraer topicos
                topic_edges = node.get("topics", {}).get("edges", [])
                topics = [t["node"]["name"] for t in topic_edges if t.get("node", {}).get("name")]

                # Extraer makers
                makers = node.get("makers", [])
                author = makers[0]["name"] if makers else ""

                # URL del producto (preferir website, sino la pagina de PH)
                product_url = node.get("website") or node.get("url", "")

                item = RawItem(
                    source="producthunt",
                    source_id=str(node.get("id", "")),
                    url=product_url,
                    title=node.get("name", ""),
                    description=node.get("tagline", ""),
                    metadata=RawItemMetadata(
                        score=node.get("votesCount", 0),
                        comments=node.get("commentsCount", 0),
                        author=author,
                        topics=topics,
                        created_at=node.get("createdAt", ""),
                    ),
                    collected_at=datetime.utcnow(),
                )
                items.append(item)

            except Exception as e:
                print(f"[producthunt] Error procesando producto: {e}")
                continue

    # Pausa de cortesia
    await asyncio.sleep(REQUEST_DELAY)

    print(f"[producthunt] Recolectados {len(items)} productos en tendencia")
    return items
