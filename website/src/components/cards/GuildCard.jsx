import GuildCrest from '../common/GuildCrest';
import Icon from '../common/Icon';
import { ExampleBadge } from '../common/Badge';
import { getGuildStanding } from '../../services/contentService';

export default function GuildCard({ guild, onOpen, style }) {
  const st = getGuildStanding(guild.id);
  return (
    <button className={`guild-card card card--hover ${st && st.position <= 3 ? `guild-card--top${st.position}` : ''}`} style={{ '--c': guild.color, ...style }} onClick={() => onOpen?.(guild)} data-reveal aria-label={`Ver ${guild.name}`}>
      <div className="guild-card__glow" aria-hidden="true" />
      <div className="guild-card__top">
        <GuildCrest guild={guild} size={72} />
        {st && (
          <div className="guild-card__rank">
            <strong>{st.position}º</strong>
            <span>na Liga</span>
          </div>
        )}
      </div>
      <div className="guild-card__body">
        <div className="row" style={{ gap: 6 }}>
          {guild.founding && <span className="badge badge--gold"><Icon name="crown" width={12} height={12} /> Fundadora</span>}
          {guild.tag && <span className="guild-card__tag">[{guild.tag}]</span>}
        </div>
        <h3 className="guild-card__name">{guild.name}</h3>
        <p className="guild-card__meta">
          {guild.leader && <span><Icon name="crown" width={13} height={13} /> {guild.leader}</span>}
          {guild.members != null && <span><Icon name="users" width={13} height={13} /> {guild.members} membros</span>}
        </p>
        {st ? (
          <dl className="guild-card__stats">
            <div><dt>Pts</dt><dd>{st.points}</dd></div>
            <div><dt>J</dt><dd>{st.played}</dd></div>
            <div><dt>V</dt><dd>{st.wins}</dd></div>
            <div><dt>Salas</dt><dd>{st.roomsWon}</dd></div>
          </dl>
        ) : (
          <p className="muted guild-card__desc">{guild.description}</p>
        )}
      </div>
      <div className="guild-card__foot">
        <span className="link-arrow">Ver guilda <Icon name="arrow" /></span>
        <ExampleBadge show={guild.example} />
      </div>
    </button>
  );
}

export function JoinGuildCard({ children }) {
  return (
    <div className="guild-card guild-card--join card" data-reveal>
      <div className="icon-tile"><Icon name="shield" /></div>
      <h3 className="guild-card__name">A tua guilda aqui</h3>
      <p className="muted">Lideras uma guilda com 20+ membros e nível 5 ou acima? Filia-te à Aliança e entra na Liga Aliança.</p>
      {children}
    </div>
  );
}
