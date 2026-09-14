# Wanna Be Scared

Ever wanted a good scare but spent an hour scrolling through streaming apps finding nothing?

**Wanna Be Scared** is a catalog for horror recommendations. Right now the focus is on horror movies, but a dedicated section for horror games is coming soon.

**(The site ISN'T a screamer)**


## URL
[https://wannabescared.vercel.app/](https://wannabescared.vercel.app/)

## Tech Stack
- **Front-end:** React + TypeScript, TailwindCSS
- **Back-end:** Python + FastAPI
- **Data:** The Movie Database (TMDB) API


## Want to mess with the code?

**1. Clone the repo**
```bash
git clone https://github.com/kaiky-ferreira/WannaBeScared.git
cd WannaBeScared
```

**2. Set up the back-end**
```bash
cd server
python -m venv .venv

# Activate the virtual environment:
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate

pip install -r requirements.txt
```

**3. Set up the front-end**
```bash
cd ../client
npm install
```

**4. Create a .env file inside the server folder and drop your TMDB API key there:**
```bash
VITE_TMDB_API_KEY=your_key
```

**5. Split terminals and spin it up**

Terminal 1
```bash (
cd server/app
fastapi dev
```

Terminal 2
```bash (
cd client
npm run dev
```
