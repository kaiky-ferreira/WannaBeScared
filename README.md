# WannaBeScared

Project split into a React client and a FastAPI server.

## Local setup

Client:

```bash
cd client
npm install
npm run dev
```

Server:

```bash
cd server
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt
.venv/Scripts/uvicorn app.main:app --reload
```

## Environment variables

Client: copy [client/.env.example](client/.env.example) to `.env` and set `VITE_API_URL`.

Server: copy [server/.env.example](server/.env.example) to `.env` and set `TMDB_KEY`.
