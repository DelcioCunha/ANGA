import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import Icon from '../../components/common/Icon';
import Lightbox from '../../components/common/Lightbox';
import EmptyState from '../../components/common/EmptyState';
import { getExpelledGuilds, getSite } from '../../services/contentService';
import { asset, formatDate } from '../../utils/format';

const STATUS = { expelled: 'Expulsa', extinct: 'Expulsa · Extinta' };

export default function Expelled() {
  const ref = useReveal();
  const all = getExpelledGuilds();
  const text = getSite().expelledStatement;
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = s ? all.filter((g) => g.name.toLowerCase().includes(s)) : all;
    const by = new Map();
    list.forEach((g) => {
      const y = (g.recorded || '').slice(0, 4) || 'Sem data';
      if (!by.has(y)) by.set(y, []);
      by.get(y).push(g);
    });
    return [...by.entries()];
  }, [q, all]);
  const flat = groups.flatMap(([, l]) => l);
  const shots = flat.map((g) => ({ image: g.logo, title: `${g.name} — ${STATUS[g.status] || 'Expulsa'}` }));

  return (
    <div ref={ref} className="expelled-page">
      <PageHeader eyebrow="Registo de expulsões" title="Guildas Expulsas" text={text.lead} icon="alert">
        <div className="row" style={{ marginTop: 8 }}>
          <label className="search">
            <Icon name="target" />
            <span className="sr-only">Procurar guilda expulsa</span>
            <input type="search" placeholder="Procurar guilda…" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <span className="badge badge--red">{all.length} guildas expulsas</span>
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container">
          <div className="verdict" data-reveal>
            <Icon name="shield" />
            <div className="stack" style={{ gap: 10 }}>
              {text.body.map((p, i) => <p key={i}>{p}</p>)}
              <p className="muted small">{text.note} <Link to="/regras" className="link-arrow">Regulamento <Icon name="arrow" /></Link></p>
            </div>
          </div>

          {groups.length ? groups.map(([year, list]) => (
            <div key={year} className="expelled-year">
              <h2 className="expelled-year__title"><span>{year}</span><small>{list.length} {list.length === 1 ? 'guilda registada' : 'guildas registadas'}</small></h2>
              <ul className="expelled-grid">
                {list.map((g, i) => (
                  <li key={g.id} data-reveal style={{ '--d': `${(i % 6) * 40}ms` }}>
                    <button className="expelled-card" onClick={() => setOpen(flat.indexOf(g))} aria-label={`Ver logo de ${g.name}`}>
                      <span className="expelled-card__logo">
                        <img src={asset(g.logo)} alt="" loading="lazy" decoding="async" />
                        <span className="expelled-card__stamp">{STATUS[g.status] || 'Expulsa'}</span>
                      </span>
                      <strong className="expelled-card__name">{g.name}</strong>
                      <span className="expelled-card__meta">
                        {g.groupCreated ? `Grupo criado: ${formatDate(g.groupCreated)}` : 'Data do grupo desconhecida'}
                      </span>
                      {g.reason && <span className="expelled-card__reason">{g.reason}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )) : (
            <EmptyState icon="shield" title="Nenhuma guilda encontrada" text={`Não há guildas expulsas com “${q}”.`} />
          )}
        </div>
      </section>
      <Lightbox items={shots} index={open} onClose={() => setOpen(null)} />
    </div>
  );
}
