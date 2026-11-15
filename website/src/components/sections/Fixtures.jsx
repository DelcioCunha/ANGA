import { getGuild } from '../../services/contentService';
import { asset } from '../../utils/format';

const WD = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function Team({ id, align }) {
  const g = getGuild(id);
  return (
    <span className={`fixture__team fixture__team--${align}`}>
      {g?.logo && <img src={asset(g.logo)} alt="" loading="lazy" />}
      <strong>{g?.name || id}</strong>
    </span>
  );
}

/** Calendário de confrontos de uma rodada. O próximo jogo (ou o de hoje) fica em destaque. */
export default function Fixtures({ fixtures = [], compact = false }) {
  if (!fixtures.length) return null;
  const now = today();
  const nextIdx = fixtures.findIndex((f) => f.date >= now);
  return (
    <ol className={`fixtures ${compact ? 'fixtures--compact' : ''}`}>
      {fixtures.map((f, i) => {
        const d = new Date(`${f.date}T12:00:00`);
        const state = f.date < now ? 'past' : i === nextIdx ? (f.date === now ? 'today' : 'next') : 'upcoming';
        return (
          <li key={`${f.date}-${f.home}`} className={`fixture fixture--${state}`}>
            <span className="fixture__date">
              <b>{f.date.slice(8, 10)}/{f.date.slice(5, 7)}</b>
              <small>{WD[d.getDay()]} · {f.time}</small>
            </span>
            <Team id={f.home} align="home" />
            <span className="fixture__vs">VS</span>
            <Team id={f.away} align="away" />
            {state === 'today' && <span className="fixture__flag">Hoje</span>}
            {state === 'next' && <span className="fixture__flag">Próximo</span>}
          </li>
        );
      })}
    </ol>
  );
}
