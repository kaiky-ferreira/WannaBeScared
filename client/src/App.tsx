import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Games from "./pages/Games";

function App() {
  return (
    <div className="site-frame flex min-h-screen flex-col text-palette-main">
      <header>
        <Navbar />
      </header>
      <main className="mx-auto w-full max-w-[72rem] flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
