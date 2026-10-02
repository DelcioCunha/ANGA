import Icon from '../common/Icon';

const TONE = { gold: 'var(--grad-gold)', purple: 'var(--grad-purple)', fire: 'var(--grad-fire)' };

/** Os níveis do Programa de Selos, com os níveis futuros bloqueados. */
export default function BadgeLadder({ levels, locked = 0 }) {
  return (
    <ol className="ladder">
      {levels.map((l, i) => (
        <li key={l.level} className={`ladder__step ladder__step--${l.tone}`} data-reveal style={{ '--d': `${i * 90}ms`, '--tone': TONE[l.tone] }}>
          <span className="ladder__hex"><strong>{l.level}</strong></span>
          <div>
            <h3 className="h3">{l.title}</h3>
            <p className="muted small">{l.requirement}</p>
          </div>
        </li>
      ))}
      {locked > 0 && (
        <li className="ladder__step ladder__step--locked" data-reveal style={{ '--d': `${levels.length * 90}ms` }}>
          <span className="ladder__hex"><Icon name="star" /></span>
          <div>
            <h3 className="h3">+{locked} níveis por desbloquear</h3>
            <p className="muted small">Quanto mais compras, mais alto chegas.</p>
          </div>
        </li>
      )}
    </ol>
  );
}
