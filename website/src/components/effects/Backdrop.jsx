/** Fundo cinematográfico: grelha tática + orbes de luz. Só CSS, sem custo de JS. */
export default function Backdrop({ variant = 'hero' }) {
  return (
    <div className={`backdrop backdrop--${variant}`} aria-hidden="true">
      <div className="backdrop__grid" />
      <div className="backdrop__orb backdrop__orb--a" />
      <div className="backdrop__orb backdrop__orb--b" />
      <div className="backdrop__orb backdrop__orb--c" />
      <div className="backdrop__noise" />
    </div>
  );
}
