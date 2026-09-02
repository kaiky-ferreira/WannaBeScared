from fastapi import FastAPI
from app.routers.movies import router
from app.routers.search import router as search_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(router)
app.include_router(search_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)