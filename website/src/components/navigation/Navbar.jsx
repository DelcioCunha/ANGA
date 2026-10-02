import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Emblem from '../common/Emblem';
import Icon from '../common/Icon';
import Button from '../common/Button';
import { getSite } from '../../services/contentService';

export default function Navbar() {
  const site = getSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const primary = site.nav.filter((n) => ['/', '/sobre', '/liga', '/guildas', '/mercado', '/eventos', '/galeria'].includes(n.to));

  return (
    <>
      <header className={`navbar ${scrolled || open ? 'navbar--solid' : ''}`}>
        <div className="container navbar__inner">
          <Link to="/" className="brand" aria-label={`${site.name} — início`}>
            <Emblem size={38} />
            <span className="brand__text">
              <strong>ANGA</strong>
              <small>Aliança Nacional de Guildas Angolanas</small>
            </span>
          </Link>

          <nav className="navbar__links" aria-label="Principal">
            {primary.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className="navbar__link">
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <Button whatsapp="join" variant="whatsapp" size="sm" icon="whatsapp" className="navbar__cta">
              Entrar
            </Button>
            <button className="navbar__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`menu ${open ? 'menu--open' : ''}`} aria-hidden={!open}>
        <nav className="container menu__inner" aria-label="Menu completo">
          {site.nav.map((n, i) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className="menu__link" style={{ '--i': i }} tabIndex={open ? 0 : -1}>
              <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
              {n.label}
              <Icon name="chevron" />
            </NavLink>
          ))}
          <div className="menu__footer">
            <Button whatsapp="join" variant="whatsapp" icon="whatsapp" block tabIndex={open ? 0 : -1}>
              Entrar na Aliança
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
