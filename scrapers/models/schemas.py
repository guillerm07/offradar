"""
Modelos Pydantic para los datos crudos recolectados por los scrapers.

Define la estructura estandar RawItem que todas las fuentes
producen, permitiendo un procesamiento uniforme posterior.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class RawItemMetadata(BaseModel):
    """Metadatos variables segun la fuente de datos."""

    stars: Optional[int] = None
    forks: Optional[int] = None
    language: Optional[str] = None
    topics: Optional[list[str]] = None
    created_at: Optional[str] = None
    author: Optional[str] = None
    score: Optional[int] = None
    comments: Optional[int] = None


class RawItem(BaseModel):
    """
    Elemento crudo recolectado de cualquier fuente.

    Representa un proyecto, articulo o producto descubierto
    durante el proceso de scraping, antes de ser analizado.
    """

    source: str = Field(..., description="Fuente de origen: github_trending, github_search, hackernews, producthunt")
    source_id: str = Field(..., description="Identificador unico dentro de la fuente")
    url: str = Field(..., description="URL directa al recurso")
    title: str = Field(..., description="Nombre o titulo del elemento")
    description: str = Field(default="", description="Descripcion breve del elemento")
    metadata: RawItemMetadata = Field(default_factory=RawItemMetadata, description="Metadatos especificos de la fuente")
    readme_content: Optional[str] = Field(default=None, description="Contenido del README (primeros 4000 chars)")
    collected_at: datetime = Field(default_factory=datetime.utcnow, description="Momento de recoleccion")
