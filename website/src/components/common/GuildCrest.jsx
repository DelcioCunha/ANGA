import { initials, asset } from '../../utils/format';

/** Logo da guilda; se não houver imagem, gera um brasão com as iniciais/tag. */
export default function GuildCrest({ guild, size = 72 }) {
  if (guild?.logo) {
    return (
      <img className="crest crest--img" src={asset(guild.logo)} alt={`Logo ${guild.name}`} width={size} height={size}
        loading="lazy" decoding="async" style={{ '--c': guild.color, width: size, height: size }} />
    );
  }
  const label = guild?.tag || initials(guild?.name);
  return (
    <div className="crest" style={{ '--c': guild?.color || '#f5b301', width: size, height: size }} aria-label={`Brasão ${guild?.name}`} role="img">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 3 58 13v18c0 15-11 26-26 30C17 57 6 46 6 31V13Z" fill="var(--c)" opacity=".18" stroke="var(--c)" strokeWidth="1.6" />
      </svg>
      <span style={{ fontSize: size * (label.length > 2 ? 0.24 : 0.3) }}>{label}</span>
    </div>
  );
}
