import Icon from '../common/Icon';
import { ExampleBadge } from '../common/Badge';
import { getGuild } from '../../services/contentService';
import { formatDate, asset } from '../../utils/format';

const TIER = { legend: 'Lendário', gold: 'Ouro', silver: 'Prata', bronze: 'Bronze' };

export default function TrophyCard({ trophy, style }) {
  const guild = getGuild(trophy.guild);
  const winner = trophy.vacant ? 'Por conquistar' : [trophy.player, guild?.name].filter(Boolean).join(' · ') || 'A definir';
  return (
    <article className={`trophy-card card tier-${trophy.tier} ${trophy.vacant ? 'trophy-card--vacant' : ''}`} style={style} data-reveal>
      <div className="trophy-card__stage" aria-hidden="true">
        <div className="trophy-card__ring" />
        {trophy.image ? <img src={asset(trophy.image)} alt="" loading="lazy" /> : <Icon name="trophy" className="trophy-card__icon" />}
      </div>
      <div className="trophy-card__body">
        <div className="row" style={{ gap: 8, justifyContent: 'center' }}>
          <span className="trophy-card__tier">{TIER[trophy.tier] || trophy.tier}</span>
          <ExampleBadge show={trophy.example} />
        </div>
        <h3 className="h3">{trophy.title}</h3>
        <p className="trophy-card__winner">{winner}</p>
        <p className="muted small">{trophy.event}{trophy.date ? ` — ${formatDate(trophy.date)}` : ''}</p>
      </div>
    </article>
  );
}
