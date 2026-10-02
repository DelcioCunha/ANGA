import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import { asset } from '../../utils/format';

/**
 * Visualizador de imagens em ecrã inteiro.
 * items: [{ image, title }]; index: posição aberta (ou null).
 * Teclado: ← → Esc. Telemóvel: deslizar para os lados.
 */
export default function Lightbox({ items, index, onClose }) {
  const [i, setI] = useState(index ?? 0);
  const touch = useRef(null);
  const open = index !== null && index !== undefined;
  useEffect(() => { if (open) setI(index); }, [index, open]);

  const go = useCallback((d) => setI((v) => (v + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, go, onClose]);

  if (!open || !items[i]) return null;
  const item = items[i];
  const many = items.length > 1;

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50 && many) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}>
      <button className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Fechar"><Icon name="close" /></button>
      {many && <button className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Anterior"><Icon name="back" /></button>}
      <figure className="lightbox__figure" key={item.image}>
        <img src={asset(item.image)} alt={item.title || ''} />
        <figcaption>
          <span>{item.title}</span>
          {many && <span className="lightbox__count">{i + 1} / {items.length}</span>}
        </figcaption>
      </figure>
      {many && <button className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Seguinte"><Icon name="arrow" /></button>}
    </div>,
    document.body
  );
}

/** Grelha de miniaturas que abre o Lightbox. */
export function ImageGrid({ items, variant = 'poster', limit }) {
  const [open, setOpen] = useState(null);
  const list = limit ? items.slice(0, limit) : items;
  return (
    <>
      <div className={`image-grid image-grid--${variant}`}>
        {list.map((it, n) => (
          <button key={it.id || it.image} className="image-grid__item" onClick={() => setOpen(n)} aria-label={`Ver ${it.title}`} data-reveal style={{ '--d': `${(n % 4) * 60}ms` }}>
            <img src={asset(it.thumb || it.image)} alt="" loading="lazy" decoding="async" />
            {it.title && <span className="image-grid__cap">{it.title}</span>}
          </button>
        ))}
      </div>
      <Lightbox items={list} index={open} onClose={() => setOpen(null)} />
    </>
  );
}
