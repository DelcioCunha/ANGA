import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import FloatingWhatsApp from '../components/navigation/FloatingWhatsApp';
import ScrollToTop from '../components/navigation/ScrollToTop';

export default function MainLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#conteudo" className="skip-link">Saltar para o conteúdo</a>
      <ScrollToTop />
      <Navbar />
      <main id="conteudo" key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
