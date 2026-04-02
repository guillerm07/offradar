"""
Publicador de datos enriquecidos a PostgreSQL.

Inserta o actualiza proyectos en la base de datos siguiendo
el esquema Drizzle definido en la aplicacion web. Tambien
permite consultar items pendientes de analisis.
"""

import json
from datetime import datetime
from typing import Any

import psycopg2
import psycopg2.extras

from scrapers.config import DATABASE_URL


def _get_connection():
    """
    Obtiene una conexion a PostgreSQL.

    Usa DATABASE_URL de la configuracion. Lanza excepcion
    si no esta configurada.

    Returns:
        Conexion psycopg2 activa.
    """
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL no esta configurada. Define la variable en .env")
    return psycopg2.connect(DATABASE_URL)


def publish_project(data: dict[str, Any]) -> int | None:
    """
    Inserta o actualiza un proyecto en la tabla 'projects'.

    Usa ON CONFLICT sobre (source, source_id) para hacer upsert.
    Los campos se mapean al esquema Drizzle de la app web.

    Args:
        data: Diccionario con los campos del proyecto. Claves esperadas:
            - source (str): fuente de origen
            - source_id (str): identificador en la fuente
            - url (str): URL del proyecto
            - name (str): nombre del proyecto
            - description (str, opcional)
            - summary_es (str, opcional): resumen en espanol
            - tags (list[str], opcional)
            - difficulty (str, opcional): facil/medio/dificil
            - interest_score (int, opcional)
            - stars (int, opcional)
            - forks (int, opcional)
            - language (str, opcional)
            - author (str, opcional)
            - readme_content (str, opcional)
            - seo_slug (str): slug para SEO (requerido)
            - status (str, opcional): draft/published/archived

    Returns:
        ID del proyecto insertado/actualizado o None si fallo.
    """
    conn = None
    try:
        conn = _get_connection()
        cur = conn.cursor()

        # Generar seo_slug si no viene
        seo_slug = data.get("seo_slug") or _generate_slug(data.get("name", "sin-nombre"))

        query = """
            INSERT INTO projects (
                source, source_id, url, name, description,
                summary_es, tags, difficulty, interest_score,
                stars, forks, language, author, readme_content,
                seo_slug, status, created_at, updated_at
            ) VALUES (
                %(source)s, %(source_id)s, %(url)s, %(name)s, %(description)s,
                %(summary_es)s, %(tags)s, %(difficulty)s, %(interest_score)s,
                %(stars)s, %(forks)s, %(language)s, %(author)s, %(readme_content)s,
                %(seo_slug)s, %(status)s, %(created_at)s, %(updated_at)s
            )
            ON CONFLICT (source, source_id)
            DO UPDATE SET
                url = EXCLUDED.url,
                name = EXCLUDED.name,
                description = EXCLUDED.description,
                stars = EXCLUDED.stars,
                forks = EXCLUDED.forks,
                language = EXCLUDED.language,
                author = EXCLUDED.author,
                readme_content = EXCLUDED.readme_content,
                updated_at = EXCLUDED.updated_at
            RETURNING id;
        """

        now = datetime.utcnow()
        params = {
            "source": data.get("source", ""),
            "source_id": data.get("source_id", ""),
            "url": data.get("url", ""),
            "name": data.get("name", ""),
            "description": data.get("description"),
            "summary_es": data.get("summary_es"),
            "tags": json.dumps(data.get("tags", [])),
            "difficulty": data.get("difficulty"),
            "interest_score": data.get("interest_score", 0),
            "stars": data.get("stars", 0),
            "forks": data.get("forks", 0),
            "language": data.get("language"),
            "author": data.get("author"),
            "readme_content": data.get("readme_content"),
            "seo_slug": seo_slug,
            "status": data.get("status", "draft"),
            "created_at": now,
            "updated_at": now,
        }

        cur.execute(query, params)
        result = cur.fetchone()
        conn.commit()

        project_id = result[0] if result else None
        print(f"[publisher] Proyecto '{data.get('name', '?')}' publicado con id={project_id}")
        return project_id

    except Exception as e:
        print(f"[publisher] Error al publicar proyecto: {e}")
        if conn:
            conn.rollback()
        return None
    finally:
        if conn:
            conn.close()


def get_pending_items() -> list[dict[str, Any]]:
    """
    Obtiene los proyectos pendientes de analisis.

    Retorna proyectos en estado 'draft' que aun no tienen
    resumen en espanol (summary_es IS NULL), indicando que
    no han sido procesados por el analisis interactivo.

    Returns:
        Lista de diccionarios con los datos de cada proyecto.
    """
    conn = None
    try:
        conn = _get_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        query = """
            SELECT id, source, source_id, url, name, description,
                   stars, forks, language, author, readme_content,
                   tags, created_at
            FROM projects
            WHERE status = 'draft'
              AND summary_es IS NULL
            ORDER BY interest_score DESC NULLS LAST, stars DESC NULLS LAST
            LIMIT 50;
        """

        cur.execute(query)
        rows = cur.fetchall()

        items = [dict(row) for row in rows]
        print(f"[publisher] Encontrados {len(items)} proyectos pendientes de analisis")
        return items

    except Exception as e:
        print(f"[publisher] Error al consultar pendientes: {e}")
        return []
    finally:
        if conn:
            conn.close()


def _generate_slug(name: str) -> str:
    """
    Genera un slug SEO-friendly a partir de un nombre.

    Convierte a minusculas, reemplaza caracteres especiales
    por guiones y limita la longitud.

    Args:
        name: Nombre original del proyecto.

    Returns:
        Slug limpio para uso en URLs.
    """
    import re
    import unicodedata

    # Normalizar y quitar acentos
    slug = unicodedata.normalize("NFKD", name)
    slug = slug.encode("ascii", "ignore").decode("ascii")
    # Convertir a minusculas y reemplazar no-alfanumericos
    slug = slug.lower()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = slug.strip("-")
    # Limitar longitud
    return slug[:200] if slug else "sin-nombre"
