import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import SectionHeader from '../../components/common/SectionHeader';
import Standings from '../../components/sections/Standings';
import RoundsTimeline from '../../components/sections/RoundsTimeline';
import GuildModal from '../../components/sections/GuildModal';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon';
import { ImageGrid } from '../../components/common/Lightbox';
import { getLeague, getCurrentSeason, getStandings } from '../../services/contentService';
import { asset, formatDate } from '../../utils/format';

export default function League() {
  const ref = useReveal();
  const league = getLeague();
  const season = getCurrentSeason();
  const [guild, setGuild] = useState(null);
  const progress = Math.round((season.currentRound / season.totalRounds) * 100);
  const leader = getStandings(season)[0];

  return (
    <div ref={ref}>
      <section className="league-hero">
        <img className="league-hero__bg" src={asset(league.banner)} alt="" />
        <div className="league-hero__shade" aria-hidden="true" />
        <div className="container league-hero__inner">
          <span className="eyebrow">{league.tagline}</span>
          <h1 className="display">{league.name}</h1>
          <p className="lead">{league.description}</p>
          <div className="season-bar" aria-label={`Rodada ${season.currentRound} de ${season.totalRounds}`}>
            <div className="season-bar__top">
              <span><strong>{season.name}</strong> · {season.phase}</span>
              <span className="badge badge--red badge--live"><span className="dot" />Rodada {season.currentRound} de {season.totalRounds}</span>
            </div>
            <div className="season-bar__track"><i style={{ width: `${progress}%` }} /></div>
            <div className="season-bar__meta muted small">
              <span>Início: {formatDate(season.start)}</span>
              <span>Líder: {leader?.team} ({leader?.points} pts)</span>
            </div>
          </div>
          <div className="row">
            <Button whatsapp="guild" variant="primary" icon="shield">Inscrever a minha guilda</Button>
            <Button href="#tabela" variant="ghost" icon="trophy" onClick={(e) => { e.preventDefault(); document.getElementById('tabela')?.scrollIntoView({ behavior: 'smooth' }); }}>Ver tabela</Button>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="format-grid">
            {league.format.map((f, i) => (
              <div key={f.label} className="format-item" data-reveal style={{ '--d': `${i * 50}ms` }}>
                <span>{f.label}</span>
                <strong>{f.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="tabela">
        <div className="container">
          <SectionHeader eyebrow="Classificação" title={`Tabela — ${season.name}`} text="Toca numa equipa para ver a sua campanha." />
          <div className="card card--glass" data-reveal>
            <Standings season={season} onSelect={setGuild} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Rodada a rodada" title="A história da temporada" text="Todos os cartazes oficiais de início e fim de rodada, do mais recente ao primeiro. Toca para ver em grande." />
          <RoundsTimeline rounds={season.rounds} current={season.currentRound} />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div className="card" id="regras-liga" data-reveal>
            <span className="eyebrow">Regras oficiais das salas</span>
            <h2 className="h2" style={{ margin: '10px 0 6px' }}>Como se joga</h2>
            <ul className="checklist">
              {league.rules.map((r) => <li key={r}><Icon name="check" /> {r}</li>)}
            </ul>
            <div className="points-callout">
              <strong>{league.scoring.win}</strong>
              <span>pontos por jogo ganho<br /><span className="muted small">{league.scoring.note}</span></span>
            </div>
          </div>
          <div className="stack" data-reveal style={{ '--d': '100ms' }}>
            <span className="eyebrow">Documentos oficiais</span>
            <p className="muted">Capturas da app da Liga, com as regras e a tabela de {formatDate(season.standingsUpdated)}.</p>
            <ImageGrid items={league.documents} variant="phone" />
          </div>
        </div>
      </section>
      <GuildModal guild={guild} onClose={() => setGuild(null)} />
    </div>
  );
}
