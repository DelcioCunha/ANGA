import { getGuild, getStandings } from '../../services/contentService';
import GuildCrest from '../common/GuildCrest';
import { formatDate } from '../../utils/format';

/** Tabela pela ordem oficial publicada pela Liga. */
export default function Standings({ season, limit, onSelect, showFooter = true }) {
  const all = getStandings(season);
  const rows = limit ? all.slice(0, limit) : all;
  return (
    <>
      <div className="table-wrap">
        <table className="standings">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Equipa</th>
              <th scope="col" title="Pontos">Pts</th>
              <th scope="col" title="Jogos">J</th>
              <th scope="col" title="Vitórias">V</th>
              <th scope="col" title="Derrotas">D</th>
              <th scope="col" title="Salas ganhas">Salas</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const g = getGuild(r.guildId);
              return (
                <tr key={r.team} className={i < 3 ? `is-top is-top-${i + 1}` : ''}>
                  <td><span className="pos">{i + 1}</span></td>
                  <td>
                    {onSelect && g ? (
                      <button className="team team--btn" onClick={() => onSelect(g)}>
                        <GuildCrest guild={g} size={32} />{r.team}
                      </button>
                    ) : (
                      <span className="team"><GuildCrest guild={g || { name: r.team }} size={32} />{r.team}</span>
                    )}
                  </td>
                  <td><strong>{r.points}</strong></td>
                  <td>{r.played}</td>
                  <td>{r.wins}</td>
                  <td>{r.losses}</td>
                  <td>{r.roomsWon}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showFooter && (
        <p className="muted small standings__foot">
          {season.phase} · Tabela oficial atualizada a {formatDate(season.standingsUpdated)}. Pts pontos · J jogos · V vitórias · D derrotas · Salas ganhas.
        </p>
      )}
    </>
  );
}
