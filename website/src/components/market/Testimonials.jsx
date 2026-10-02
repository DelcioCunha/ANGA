import { useState } from 'react';
import Icon from '../common/Icon';
import Lightbox from '../common/Lightbox';

/** Feedback real de clientes, com a conversa original como prova. */
export default function Testimonials({ items }) {
  const [open, setOpen] = useState(null);
  const shots = items.filter((t) => t.image).map((t) => ({ image: t.image, title: `Conversa original — ${t.name}` }));
  return (
    <>
      <div className="quotes">
        {items.map((t, i) => (
          <figure key={t.id} className="quote card" data-reveal style={{ '--d': `${i * 80}ms` }}>
            <Icon name="star" className="quote__mark" />
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>
              <div>
                <strong>{t.name}</strong>
                <span className="muted small">{t.label}</span>
              </div>
              {t.image && (
                <button className="link-arrow" onClick={() => setOpen(shots.findIndex((s) => s.image === t.image))}>
                  Ver conversa <Icon name="arrow" />
                </button>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      <Lightbox items={shots} index={open} onClose={() => setOpen(null)} />
    </>
  );
}
