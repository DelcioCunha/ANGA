import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import Lightbox from '../common/Lightbox';
import Standings from './Standings';
import GuildModal from './GuildModal';
import { getLeague, getCurrentSeason, getLatestRound } from '../../services/contentService';
import { asset, formatDate } from '../../utils/format';

export default function LeagueSection() {
  const league = getLeague();
  const season = getCurrentSeason();
  const latest = getLatestRound();
  const [poster, setPoster] = useState(null);
  const [guild, setGuild] = useState(null);
  return (
    <section className="section league-teaser">
      <div className="container">
        <SectionHeader eyebrow={league.tagline} title={league.name} text={league.description} link="/liga" linkLabel="Tabela completa e rodadas" />
        <div className="league-teaser__grid">
          <div className="card card--glass league-teaser__panel" data-reveal>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3 className="h3">{season.name} · Top 5</h3>
              <span className="badge badge--red badge--live"><span className="dot" />Rodada {season.currentRound} a decorrer</span>
            </div>
            <Standings season={season} limit={5} onSelect={setGuild} />
            <Button to="/liga" variant="ghost" iconRight="arrow" size="sm">Ver as {season.standings.length} equipas</Button>
          </div>
          {latest && (
            <button className="latest-poster" onClick={() => setPoster(0)} data-reveal style={{ '--d': '100ms' }} aria-label={`Ver cartaz: ${latest.title}`}>
              <img src={asset(latest.thumb || latest.image)} alt="" loading="lazy" />
              <span className="latest-poster__cap">
                <span className="eyebrow">Último anúncio</span>
                <strong>{latest.title}</strong>
                <span className="muted small">{formatDate(latest.date)}</span>
              </span>
            </button>
          )}
        </div>
      </div>
      {latest && <Lightbox items={[latest]} index={poster} onClose={() => setPoster(null)} />}
      <GuildModal guild={guild} onClose={() => setGuild(null)} />
    </section>
  );
}
