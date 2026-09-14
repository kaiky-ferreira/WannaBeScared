import os
from dotenv import load_dotenv

load_dotenv()
TMDB_KEY = os.getenv("TMDB_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"
CLIENT_URL = os.getenv("CLIENT_URL", "https://wannabescared.vercel.app")
CORS_ORIGINS = [
	origin.strip()
	for origin in os.getenv(
		"CORS_ORIGINS",
		f"http://localhost:5173,{CLIENT_URL}",
	).split(",")
	if origin.strip()
]