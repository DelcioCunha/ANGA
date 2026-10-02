import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import GuildCrest from '../common/GuildCrest';
import GuildModal from './GuildModal';
import Button from '../common/Button';
import { getGuildsByStanding } from '../../services/contentService';

/** Mural com todas as guildas da Aliança. */
export default function GuildsSection() {
  const guilds = getGuildsByStanding();
  const [active, setActive] = useState(null);
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow="Salão de Guildas" title={`${guilds.length} guildas, uma Aliança`} text="Cada guilda com a sua bandeira. Toca num brasão para ver a guilda e a sua campanha na Liga." link="/guildas" linkLabel="Salão de Guildas" />
        <ul className="guild-wall">
          {guilds.map((g, i) => (
            <li key={g.id} data-reveal style={{ '--d': `${(i % 8) * 40}ms` }}>
              <button className="guild-wall__item" onClick={() => setActive(g)} style={{ '--c': g.color }}>
                <GuildCrest guild={g} size={64} />
                <span>{g.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="row" style={{ justifyContent: 'center', marginTop: 28 }}>
          <Button whatsapp="guild" variant="ghost" icon="shield">Inscrever a minha guilda</Button>
        </div>
      </div>
      <GuildModal guild={active} onClose={() => setActive(null)} />
    </section>
  );
}
