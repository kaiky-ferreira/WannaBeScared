import os
from dotenv import load_dotenv

load_dotenv()
TMDB_KEY = os.getenv("TMDB_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"