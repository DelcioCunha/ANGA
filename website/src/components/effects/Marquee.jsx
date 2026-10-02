export default function Marquee({ items }) {
  const list = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {list.map((t, i) => (
          <span key={i} className="marquee__item">
            {t}
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" fill="currentColor" /></svg>
          </span>
        ))}
      </div>
    </div>
  );
}
