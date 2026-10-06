import Icon from '../common/Icon';
import Button from '../common/Button';
import { getSite } from '../../services/contentService';

/** Requisitos para uma guilda entrar na Aliança (content/site.json → guildMembership). */
export default function GuildRequirements({ compact }) {
  const m = getSite().guildMembership;
  if (!m) return null;
  return (
    <div className={`requirements ${compact ? 'requirements--compact' : ''}`} data-reveal>
      <div className="requirements__head">
        <span className="eyebrow">Adesão de guildas</span>
        <h2 className={compact ? 'h3' : 'h2'}>{m.title}</h2>
        {!compact && <p className="lead">{m.intro}</p>}
      </div>
      <ol className="requirements__list">
        {m.requirements.map((r, i) => (
          <li key={r.title} className="requirement">
            <span className="requirement__n">{i + 1}</span>
            <div>
              <h3 className="requirement__title"><Icon name={r.icon} /> {r.title}</h3>
              <p className="muted">{r.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="requirements__cta">
        <p className="muted">{m.cta}</p>
        <Button whatsapp="guild" variant="whatsapp" icon="whatsapp">Inscrever a minha guilda</Button>
      </div>
    </div>
  );
}
