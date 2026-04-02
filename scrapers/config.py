"""
Configuracion central del proyecto OffRadar Scrapers.

Carga variables de entorno desde .env y define constantes
utilizadas por todos los modulos de recoleccion.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# --- Tokens y credenciales ---
GITHUB_TOKEN: str | None = os.getenv("GITHUB_TOKEN")
DATABASE_URL: str | None = os.getenv("DATABASE_URL")
PRODUCTHUNT_API_KEY: str | None = os.getenv("PRODUCTHUNT_API_KEY")
PRODUCTHUNT_API_SECRET: str | None = os.getenv("PRODUCTHUNT_API_SECRET")
REDDIT_CLIENT_ID: str | None = os.getenv("REDDIT_CLIENT_ID")
REDDIT_CLIENT_SECRET: str | None = os.getenv("REDDIT_CLIENT_SECRET")

# --- Directorios de salida ---
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"

# Crear directorios si no existen
RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)

# --- Constantes de scraping ---
DEFAULT_TIMEOUT = 30  # segundos
REQUEST_DELAY = 1.0   # segundos entre peticiones para respetar rate limits
MAX_README_CHARS = 4000  # caracteres maximos de README a almacenar
