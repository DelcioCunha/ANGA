import { Link } from 'react-router-dom';
import Emblem from '../common/Emblem';
import Icon from '../common/Icon';
import { getSite } from '../../services/contentService';
import { whatsappLink, formatNumber } from '../../utils/format';

export default function Footer() {
  const site = getSite();
  const year = new Date().getFullYear();
  const social = site.social.filter((s) => s.active && s.url);
  return (
    <footer className="footer">
      <div className="angola-stripe" aria-hidden="true"><span /><span /><span /></div>
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand">
            <Emblem size={44} />
            <span className="brand__text">
              <strong>ANGA</strong>
              <small>Aliança Nacional de Guildas Angolanas</small>
            </span>
          </Link>
          <p className="muted">{site.tagline}</p>
          <div className="row">
            {social.map((s) => (
              <a key={s.id} className="social-btn" href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Icon name={s.id} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="footer__title">A Aliança</h3>
          <ul className="footer__list">
            {site.nav.slice(1, 8).map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="footer__title">Comunidade</h3>
          <ul className="footer__list">
            {site.nav.slice(8).map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="footer__title">Contacto oficial</h3>
          <ul className="footer__list">
            <li className="muted">{site.founder.name} — Fundador</li>
            <li className="muted">{formatNumber(site.community.members)} membros · {site.community.groups} grupos</li>
            <li>
              <a href={whatsappLink('default')} target="_blank" rel="noopener noreferrer" className="footer__wa">
                <Icon name="whatsapp" /> {site.whatsapp.display}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {year} {site.name}. Todos os direitos reservados.</span>
        <span className="muted">Comunidade independente de jogadores. Free Fire é uma marca da Garena.</span>
      </div>
    </footer>
  );
}
