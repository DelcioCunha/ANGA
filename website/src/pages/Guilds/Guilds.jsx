import { useMemo, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import GuildCard, { JoinGuildCard } from '../../components/cards/GuildCard';
import GuildModal from '../../components/sections/GuildModal';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon';
import { asset } from '../../utils/format';
import EmptyState from '../../components/common/EmptyState';
import { Link } from 'react-router-dom';
import { getGuildsByStanding, getExpelledGuilds } from '../../services/contentService';

export default function Guilds() {
  const ref = useReveal();
  const all = getGuildsByStanding();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(null);
  const [sort, setSort] = useState('liga');
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    let r = s ? all.filter((g) => `${g.name} ${g.tag || ''} ${g.leader || ''} ${g.groupName || ''}`.toLowerCase().includes(s)) : [...all];
    if (sort === 'membros') r.sort((a, b) => (b.members || 0) - (a.members || 0));
    if (sort === 'antigas') r.sort((a, b) => (a.founded || '9999').localeCompare(b.founded || '9999'));
    if (sort === 'nome') r.sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [q, all, sort]);
  const totalMembers = all.reduce((n, g) => n + (g.members || 0), 0);
  const SORTS = [['liga', 'Posição na Liga'], ['membros', 'Mais membros'], ['antigas', 'Mais antigas'], ['nome', 'A–Z']];

  return (
    <div ref={ref}>
      <PageHeader eyebrow="Salão de Guildas" title="As guildas da Aliança" text="As guildas da Aliança, com líder, número de membros e campanha na Liga Aliança. Dados dos grupos a 2 de outubro de 2026." icon="shield">
        <div className="row" style={{ marginTop: 8 }}>
          <label className="search">
            <Icon name="target" />
            <span className="sr-only">Procurar guilda</span>
            <input type="search" placeholder="Procurar guilda ou líder…" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <span className="badge">{all.length} guildas</span>
          <span className="badge badge--violet">{totalMembers} membros nos grupos das guildas</span>
        </div>
      </PageHeader>
      <section className="section section--tight">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Ordenar guildas" style={{ marginBottom: 24 }}>
            {SORTS.map(([id, label]) => (
              <button key={id} role="tab" className="tab" aria-selected={sort === id} onClick={() => setSort(id)}>{label}</button>
            ))}
          </div>
          {list.length ? (
            <div className="grid grid-4">
              {list.map((g, i) => <GuildCard key={g.id} guild={g} onOpen={setActive} style={{ '--d': `${(i % 4) * 60}ms` }} />)}
              {!q && (
                <JoinGuildCard>
                  <Button whatsapp="guild" variant="ghost" size="sm" icon="whatsapp">Filiar guilda</Button>
                </JoinGuildCard>
              )}
            </div>
          ) : (
            <EmptyState icon="shield" title="Nenhuma guilda encontrada" text={`Não há guildas com “${q}”.`} />
          )}
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          <Link to="/guildas/expulsas" className="expelled-teaser" data-reveal>
            <span className="expelled-teaser__logos" aria-hidden="true">
              {getExpelledGuilds().slice(0, 5).map((g) => <img key={g.id} src={asset(g.logo)} alt="" loading="lazy" />)}
            </span>
            <span className="stack" style={{ gap: 4 }}>
              <strong>Guildas expulsas</strong>
              <span className="muted small">{getExpelledGuilds().length} guildas foram expulsas da Aliança. Vê o registo.</span>
            </span>
            <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <GuildModal guild={active} onClose={() => setActive(null)} />
    </div>
  );
}
