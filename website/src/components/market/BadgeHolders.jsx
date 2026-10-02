import { useState } from 'react';
import Lightbox from '../common/Lightbox';
import { asset } from '../../utils/format';

const LEVEL = { 1: ['Cliente Novo', 'gold'], 2: ['Cliente Ativo', 'purple'], 3: ['Cliente Frequente', 'fire'] };

/** Clientes com selo: o selo mais alto em destaque e os anteriores em miniatura. */
export default function BadgeHolders({ holders }) {
  const [open, setOpen] = useState(null);
  const items = holders.flatMap((h) => h.badges.map((b, i) => ({ image: b, title: `${h.name} — selo ${i + 1 + (h.level - h.badges.length)}`, holder: h.id })));
  return (
    <>
      <div className="holders">
        {holders.map((h, n) => {
          const [label, tone] = LEVEL[h.level] || ['Cliente', 'gold'];
          const top = h.badges[h.badges.length - 1];
          return (
            <article key={h.id} className={`holder card holder--${tone}`} data-reveal style={{ '--d': `${n * 70}ms` }}>
              <button className="holder__badge" onClick={() => setOpen(items.findIndex((x) => x.image === top))} aria-label={`Ver selo de ${h.name}`}>
                <img src={asset(top)} alt="" loading="lazy" decoding="async" />
              </button>
              <div className="holder__info">
                <h3 className="h3">{h.name}</h3>
                <span className={`badge badge--${tone === 'gold' ? 'gold' : tone}`}>Nível {h.level} · {label}</span>
                {h.badges.length > 1 && (
                  <div className="holder__history">
                    {h.badges.slice(0, -1).map((b) => (
                      <button key={b} onClick={() => setOpen(items.findIndex((x) => x.image === b))} aria-label="Ver selo anterior">
                        <img src={asset(b)} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} />
    </>
  );
}
