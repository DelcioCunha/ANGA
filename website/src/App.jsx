import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Guilds from './pages/Guilds/Guilds';
import League from './pages/League/League';
import Events from './pages/Events/Events';
import Trophies from './pages/Trophies/Trophies';
import Records from './pages/Records/Records';
import Market from './pages/Market/Market';
import News from './pages/News/News';
import Article from './pages/News/Article';
import Rules from './pages/Rules/Rules';
import Gallery from './pages/Gallery/Gallery';
import Expelled from './pages/Expelled/Expelled';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';

/* HashRouter: funciona em qualquer hosting estático sem configurar o servidor. */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<About />} />
          <Route path="guildas" element={<Guilds />} />
          <Route path="guildas/expulsas" element={<Expelled />} />
          <Route path="liga" element={<League />} />
          <Route path="eventos" element={<Events />} />
          <Route path="trofeus" element={<Trophies />} />
          <Route path="recordes" element={<Records />} />
          <Route path="mercado" element={<Market />} />
          <Route path="noticias" element={<News />} />
          <Route path="noticias/:id" element={<Article />} />
          <Route path="galeria" element={<Gallery />} />
          <Route path="regras" element={<Rules />} />
          <Route path="contactos" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
