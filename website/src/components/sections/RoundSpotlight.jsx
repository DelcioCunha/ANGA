import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Modal from '../common/Modal';
import { getSite, getCurrentSeason } from '../../services/contentService';
import { asset } from '../../utils/format';
import Fixtures from './Fixtures';

/** Destaque grande no topo da página inicial (ex.: lançamento da Rodada 25). Configurado em site.json → spotlight. */
export default function RoundSpotlight() {
  const s = getSite().spotlight;
  const season = getCurrentSeason();
  const [play, setPlay] = useState(false);
  if (!s || !s.enabled) return null;
  const fixtures = (season.fixtures || []).filter((f) => String(f.round) === String(season.currentRound));
  return (
    <section className="spotlight" aria-labelledby="spotlight-title">
      <div className="spotlight__bg" style={{ backgroundImage: `url(${asset(s.image)})` }} aria-hidden="true" />
      <div className="container spotlight__grid">
        <div className="spotlight__media" data-reveal>
          <img src={asset(s.image)} alt={s.imageAlt || s.title} />
          {s.video && (
            <button type="button" className="spotlight__play" onClick={() => setPlay(true)} aria-label="Ver o vídeo de anúncio">
              <span><Icon name="play" /></span>Ver o vídeo
            </button>
          )}
        </div>
        <div className="spotlight__body" data-reveal style={{ '--d': '120ms' }}>
          <span className="badge badge--red badge--live"><span className="dot" />{s.badge}</span>
          <p className="eyebrow spotlight__eyebrow">{s.eyebrow}</p>
          <h2 id="spotlight-title" className="spotlight__title">{s.title}<span>{s.highlight}</span></h2>
          <p className="spotlight__text">{s.text}</p>
          <ul className="spotlight__facts">
            {s.facts.map((f) => (
              <li key={f.label}><Icon name={f.icon} /><div><small>{f.label}</small><strong>{f.value}</strong></div></li>
            ))}
          </ul>
          {fixtures.length > 0 && (
            <div className="spotlight__race">
              <small>Calendário · {fixtures.length} confrontos</small>
              <Fixtures fixtures={fixtures} compact />
            </div>
          )}
          <div className="row">
            <Link className="btn btn--primary" to={s.link || '/liga'}><span>{s.linkLabel || 'Acompanhar a Liga'}</span><Icon name="arrow" /></Link>
            {s.news && <Link className="btn btn--ghost" to={`/noticias/${s.news}`}><span>Ler a notícia</span></Link>}
          </div>
        </div>
      </div>
      {play && (
        <Modal open onClose={() => setPlay(false)}>
          <video className="spotlight__video" src={asset(s.video)} poster={asset(s.image)} controls autoPlay playsInline />
        </Modal>
      )}
    </section>
  );
}
