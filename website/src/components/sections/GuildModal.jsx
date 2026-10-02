import Modal from '../common/Modal';
import GuildCrest from '../common/GuildCrest';
import Icon from '../common/Icon';
import Button from '../common/Button';
import { ExampleBadge } from '../common/Badge';
import { getTrophies, getGuildStanding, getCurrentSeason } from '../../services/contentService';
import { formatDate } from '../../utils/format';

export default function GuildModal({ guild, onClose }) {
  if (!guild) return null;
  const trophies = getTrophies().filter((t) => t.guild === guild.id && !t.vacant);
  const st = getGuildStanding(guild.id);
  const season = getCurrentSeason();
  const facts = [
    { label: guild.leaderRole || 'Líder', value: guild.leader },
    { label: 'Membros no grupo', value: guild.members, note: guild.membersUpdated && `em ${formatDate(guild.membersUpdated)}` },
    { label: 'Grupo criado', value: guild.founded && formatDate(guild.founded) },
    { label: 'Grupo no WhatsApp', value: guild.groupName },
    { label: 'Tag', value: guild.tag },
  ].filter((f) => f.value);
  return (
    <Modal open={!!guild} onClose={onClose} labelledBy="guild-modal-title">
      <div className="guild-modal" style={{ '--c': guild.color }}>
        <div className="guild-modal__head">
          <GuildCrest guild={guild} size={104} />
          <div className="stack" style={{ gap: 8 }}>
            <div className="row" style={{ gap: 6 }}>
              {guild.founding && <span className="badge badge--gold"><Icon name="crown" width={12} height={12} /> Fundadora</span>}
              {st && <span className="badge badge--violet">{st.position}º na Liga Aliança</span>}
              <ExampleBadge show={guild.example} />
            </div>
            <h2 className="h2" id="guild-modal-title">{guild.name}</h2>
            {guild.motto && <p className="guild-card__motto">“{guild.motto}”</p>}
          </div>
        </div>
        <p className="lead" style={{ marginTop: 18 }}>{guild.description}</p>
        {facts.length > 0 && (
          <dl className="facts">
            {facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd>{f.note && <small className="muted">{f.note}</small>}</div>)}
          </dl>
        )}
        {st && (
          <div className="guild-modal__league">
            <h3 className="footer__title">{season.name} · {season.phase}</h3>
            <dl className="facts facts--5">
              <div><dt>Posição</dt><dd>{st.position}º de {st.total}</dd></div>
              <div><dt>Pontos</dt><dd>{st.points}</dd></div>
              <div><dt>Jogos</dt><dd>{st.played}</dd></div>
              <div><dt>V / D</dt><dd>{st.wins} / {st.losses}</dd></div>
              <div><dt>Salas ganhas</dt><dd>{st.roomsWon}</dd></div>
            </dl>
          </div>
        )}
        {trophies.length > 0 && (
          <div className="guild-modal__trophies">
            <h3 className="footer__title">Conquistas</h3>
            <ul className="footer__list">
              {trophies.map((t) => <li key={t.id}><Icon name="trophy" width={14} height={14} /> {t.title} — {t.event}</li>)}
            </ul>
          </div>
        )}
        <Button whatsapp={`Olá! Quero saber mais sobre a guilda ${guild.name} da Aliança.`} variant="whatsapp" icon="whatsapp" block>
          Falar com a Aliança sobre esta guilda
        </Button>
      </div>
    </Modal>
  );
}
