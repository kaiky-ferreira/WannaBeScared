# WannaBeScared

Guia de leitura e manutencao do projeto.

## Estrutura

- `client/`: aplicacao React, TypeScript, Tailwind e Vite.
- `server/`: API FastAPI em Python.
- `PROJECT_GUIDE.md`: documentacao do projeto.

## Client

- `src/main.tsx`: inicializa React, estilos globais e `BrowserRouter`.
- `src/App.tsx`: registra `/`, `/movies` e `/games`.
- `src/pages/Home.tsx`: Hero e Footer.
- `src/pages/Movies.tsx`: catalogo, filtros, infinite scroll e modal.
- `src/pages/Games.tsx`: pagina de jogos em construcao.
- `src/components/Navbar.tsx`: navegacao, busca e resultados.
- `src/components/InputBox.tsx`: campo controlado de busca.
- `src/components/Hero.tsx`: apresentacao inicial.
- `src/components/ExploreBtn.tsx`: link para o catalogo.
- `src/components/Footer.tsx`: rodape e link externo.
- `src/components/movie/MovieCard.tsx`: poster, titulo, ano e rating.
- `src/components/movie/Rating.tsx`: cinco caveiras, meia caveira e nota de 0 a 5.
- `src/components/movie/MovieModal.tsx`: detalhes do filme e fechamento por fundo, botao ou Escape.
- `src/components/movie/FilterBar.tsx`: nota minima, subgenero, ordenacao e limpeza.
- `src/services/movieService.ts`: chama `/movies` com filtros e paginacao.
- `src/services/searchService.ts`: chama `/search`.
- `src/services/api.ts`: define `VITE_API_URL` ou localhost.
- `src/types/movie.ts`: tipos das respostas.
- `src/index.css`: tema, fundo global e tokens Tailwind.

## Server

- `app/main.py`: cria o FastAPI, registra routers e configura CORS.
- `app/core/settings.py`: carrega `TMDB_KEY`, `CLIENT_URL` e URL do TMDB.
- `app/routers/movies.py`: endpoint `GET /movies`.
- `app/routers/search.py`: endpoint `GET /search`.
- `app/services/movie_service.py`: consulta `/discover/movie`, filtra terror, exclui clipes musicais, ordena e pagina.
- `app/services/search_service.py`: consulta `/search/movie`.
- `app/data/subgenres.py`: mapa de subgeneros para keywords do TMDB.
- `app/schemas/movie.py`: modelos Pydantic de filme, filtros e respostas.

## Fluxo do catalogo

`Movies.tsx` le filtros da URL, chama `movieService.ts`, que chama o FastAPI. O backend consulta o TMDB. A ordenacao e feita no servidor antes da paginacao para que novas paginas nao reorganizem cards ja vistos.

Exemplo:

```text
/movies?subgenre=slasher&sort=title
```

## Execucao local

Client:

```bash
cd client
npm install
npm run dev
```

Server no Windows:

```bash
cd server
python -m venv .venv
.venv\\Scripts\\pip install -r requirements.txt
.venv\\Scripts\\uvicorn app.main:app --reload
```

Variaveis:

```text
client/.env
VITE_API_URL=http://localhost:8000

server/.env
TMDB_KEY=sua_chave_do_tmdb
CLIENT_URL=http://localhost:5173
```

## Deploy

Frontend na Vercel:

- Root Directory: `client`.
- Framework: Vite.
- Build Command: `npm run build`.
- Output Directory: `dist`.
- Variavel: `VITE_API_URL` com a URL publica do backend.

Backend no Render ou servico equivalente:

- Root Directory: `server`.
- Build Command: `pip install -r requirements.txt`.
- Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- Variaveis: `TMDB_KEY` e `CLIENT_URL` com a URL publica da Vercel.

## Validacao

```bash
cd client
npm run lint
npm run build
python -m compileall -q ../server/app
```

## Corrigir CORS em producao

Na Vercel, `VITE_API_URL` precisa apontar para a URL publica do backend Render. Sem essa variavel, o build usa `http://localhost:8000`, que so existe no computador local.

No Render, configure:

```text
TMDB_KEY=sua_chave_do_tmdb
CLIENT_URL=https://wannabescared.vercel.app
CORS_ORIGINS=http://localhost:5173,https://wannabescared.vercel.app
```

Depois de alterar variaveis, faca redeploy do backend e do frontend.
