# WannaBeScared

Guia de leitura e manutencao do projeto.

## Visao geral

O projeto e dividido em uma interface React e uma API FastAPI. O navegador chama o FastAPI, e o FastAPI consulta o TMDB usando a chave secreta do servidor.

```text
Usuario -> React -> FastAPI -> TMDB -> cards e modal
```

## Estrutura

```text
WannaBeScared/
├── client/             Aplicacao React, TypeScript e Tailwind
├── server/             API FastAPI em Python
├── PROJECT_GUIDE.md    Este documento
└── .gitignore          Arquivos ignorados pelo Git
```

## Client

### Configuracao

- `client/package.json`: dependencias e scripts `dev`, `build`, `lint` e `preview`.
- `client/vite.config.ts`: integra Vite, React e Tailwind.
- `client/index.html`: documento inicial, favicon e carregamento da fonte Shlop.
- `client/tsconfig*.json`: configuracoes do TypeScript.
- `client/eslint.config.js`: regras de lint.
- `client/vercel.json`: rewrite necessario para o React Router funcionar na Vercel.

### Entrada e rotas

- `client/src/main.tsx`: cria a raiz React, importa estilos globais e ativa `BrowserRouter`.
- `client/src/App.tsx`: monta a navbar e registra `/`, `/movies` e `/games`.
- `client/src/pages/Home.tsx`: Hero e Footer.
- `client/src/pages/Movies.tsx`: catalogo, filtros, busca paginada e modal.
- `client/src/pages/Games.tsx`: pagina de jogos em construcao.

### Componentes

- `client/src/components/Navbar.tsx`: links, busca e resultados da busca.
- `client/src/components/InputBox.tsx`: formulario controlado de busca.
- `client/src/components/Hero.tsx`: apresentacao da Home.
- `client/src/components/ExploreBtn.tsx`: link para o catalogo.
- `client/src/components/Footer.tsx`: rodape e link externo.
- `client/src/components/movie/MovieCard.tsx`: poster, titulo, ano e rating.
- `client/src/components/movie/Rating.tsx`: cinco caveiras, meia caveira e nota de 0 a 5.
- `client/src/components/movie/MovieModal.tsx`: detalhes do filme; fecha por fundo, botao ou Escape.
- `client/src/components/movie/FilterBar.tsx`: nota minima, subgenero, ordenacao e limpeza.

### Dados e servicos

- `client/src/types/movie.ts`: tipos TypeScript das respostas.
- `client/src/services/api.ts`: URL base da API, usando `VITE_API_URL` ou localhost.
- `client/src/services/movieService.ts`: chama `/movies` com filtros e paginacao.
- `client/src/services/searchService.ts`: chama `/search`.
- `client/src/assets/SkullIcon.tsx`: SVG reutilizavel das caveiras.
- `client/public/favicon.png`: favicon da aplicacao.
- `client/src/index.css`: identidade visual, tokens, layout, CRT, cards, filtros e modal.

## Server

### Entrada e configuracao

- `server/requirements.txt`: dependencias Python.
- `server/app/main.py`: cria o FastAPI, registra routers e configura CORS.
- `server/app/core/settings.py`: carrega `TMDB_KEY`, `CLIENT_URL` e URL do TMDB.
- Arquivos `__init__.py`: marcam os diretorios como pacotes Python.

### Routers

- `server/app/routers/movies.py`: `GET /movies`, com nota, pagina, subgenero, keyword e ordenacao.
- `server/app/routers/search.py`: `GET /search`, usado pela busca da navbar.

### Servicos

- `server/app/services/movie_service.py`: consulta `/discover/movie`, aplica filtros, ordena, pagina e exclui clipes musicais.
- `server/app/services/search_service.py`: consulta `/search/movie`.

### Dados

- `server/app/data/subgenres.py`: mapa de subgeneros para keywords do TMDB.
- `server/app/schemas/movie.py`: modelos Pydantic de filme, filtros e resposta.

## Como o catalogo funciona

`Movies.tsx` le filtros da URL, chama `movieService.ts` e concatena paginas usando `IntersectionObserver`. A ordenacao e enviada ao backend, portanto novas paginas mantem a ordem sem mover cards ja vistos.

Exemplo de URL:

```text
/movies?subgenre=slasher&sort=title
```

O backend exige terror, exclui o genero musical e exige duracao minima para evitar clipes aparecendo como filmes.

## Execucao local

### Client

```bash
cd client
npm install
npm run dev
```

Opcionalmente, `client/.env` pode definir:

```text
VITE_API_URL=http://localhost:8000
```

### Server

```bash
cd server
python -m venv .venv
.venv\\Scripts\\pip install -r requirements.txt
.venv\\Scripts\\uvicorn app.main:app --reload
```

`server/.env` precisa conter:

```text
TMDB_KEY=sua_chave_do_tmdb
CLIENT_URL=http://localhost:5173
```

## Publicacao

O frontend pode ser publicado na Vercel. O backend FastAPI pode ser publicado no Render ou em outro servico que execute Uvicorn.

Na Vercel, configure `VITE_API_URL` com a URL publica do backend.

No backend, configure `TMDB_KEY` e `CLIENT_URL` com a URL publica da Vercel. O `CLIENT_URL` e usado pelo CORS.

Comando de build do frontend:

```bash
npm run build
```

Comando de inicializacao comum para o backend:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

## Validacao

```bash
cd client
npm run lint
npm run build
```

```bash
python -m compileall -q server/app
```

## Proximos pontos

- A classificacao dos subgeneros depende dos metadados do TMDB.
- Posters ausentes usam `/placeholder.jpg`.
- A busca mostra poucos resultados para manter a navbar compacta.
- A pagina Games esta reservada para a proxima etapa.
