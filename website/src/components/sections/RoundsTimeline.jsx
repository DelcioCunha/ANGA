import { useMemo, useState } from 'react';
import Lightbox from '../common/Lightbox';
import { asset, dateParts } from '../../utils/format';

/** Linha do tempo das rodadas: cada rodada com o cartaz de início e/ou fim. */
export default function RoundsTimeline({ rounds, current }) {
  const [open, setOpen] = useState(null);
  const groups = useMemo(() => {
    const map = new Map();
    [...rounds].sort((a, b) => b.date.localeCompare(a.date)).forEach((r) => {
      if (!map.has(r.round)) map.set(r.round, []);
      map.get(r.round).push(r);
    });
    return [...map.entries()].map(([round, items]) => ({ round, items: items.sort((a, b) => a.date.localeCompare(b.date)) }));
  }, [rounds]);
  const flat = groups.flatMap((g) => g.items);

  return (
    <>
      <div className="rounds" role="list">
        {groups.map((g, gi) => (
          <article key={g.round} className={`round ${String(current) === g.round ? 'round--current' : ''}`} role="listitem" data-reveal style={{ '--d': `${Math.min(gi, 4) * 60}ms` }}>
            <header className="round__head">
              <span className="round__label">Rodada</span>
              <strong className="round__num">{g.round}</strong>
              {String(current) === g.round && <span className="badge badge--red badge--live"><span className="dot" />A decorrer</span>}
            </header>
            <div className="round__posters">
              {g.items.map((r) => {
                const d = dateParts(r.date);
                return (
                  <button key={r.id} className="round__poster" onClick={() => setOpen(flat.indexOf(r))} aria-label={`Ver cartaz: ${r.title}`}>
                    <img src={asset(r.thumb || r.image)} alt="" loading="lazy" decoding="async" />
                    <span className={`round__phase round__phase--${r.phase}`}>{r.phase === 'inicio' ? 'Início' : 'Fim'} · {d.day} {d.month}</span>
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
      <Lightbox items={flat} index={open} onClose={() => setOpen(null)} />
    </>
  );
}
