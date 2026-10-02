import Backdrop from '../effects/Backdrop';
import Button from '../common/Button';
import Emblem from '../common/Emblem';
import StatCard from '../cards/StatCard';
import { getSite, getStats, getCurrentSeason } from '../../services/contentService';

export default function Hero() {
  const { hero, slogans } = getSite();
  const stats = getStats();
  const season = getCurrentSeason();
  return (
    <section className="hero">
      <Backdrop />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow hero__eyebrow">{hero.eyebrow}</span>
          <h1 className="display hero__title">
            <span className="hero__line">{hero.title[0]}</span>
            <span className="hero__line gradient-text">{hero.title[1]}</span>
          </h1>
          <p className="lead hero__sub">{hero.subtitle}</p>
          <div className="row hero__ctas">
            <Button whatsapp={hero.primaryCta.action} variant="whatsapp" icon="whatsapp">{hero.primaryCta.label}</Button>
            <Button to={hero.secondaryCta.to} variant="ghost" iconRight="arrow">{hero.secondaryCta.label}</Button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__rings" aria-hidden="true"><span /><span /><span /></div>
          <Emblem size={300} className="hero__emblem" />
          <div className="hero__chip hero__chip--a" aria-hidden="true"><strong>Liga Aliança</strong><small>Rodada {season.currentRound} de {season.totalRounds}</small></div>
          <div className="hero__chip hero__chip--b" aria-hidden="true"><strong>{slogans?.[0]}</strong><small>ANGA · Free Fire</small></div>
        </div>
      </div>

      <div className="container hero__stats">
        <div className="stats">
          {stats.map((s, i) => <StatCard key={s.id} value={s.value} label={s.label} style={{ '--d': `${i * 80}ms` }} />)}
        </div>
      </div>
    </section>
  );
}
