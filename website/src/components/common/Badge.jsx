export default function Badge({ tone, dot, live, children }) {
  const cls = ['badge', tone && `badge--${tone}`, live && 'badge--live'].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {(dot || live) && <span className="dot" />}
      {children}
    </span>
  );
}

/** Marca conteúdo provisório (campo "example": true no JSON). */
export function ExampleBadge({ show }) {
  if (!show) return null;
  return <span className="badge badge--example" title="Conteúdo provisório — será substituído pelos dados oficiais">Exemplo</span>;
}

const STATUS = {
  upcoming: { label: 'Em breve', tone: 'violet', dot: true },
  live: { label: 'A decorrer', tone: 'red', live: true },
  past: { label: 'Concluído', tone: undefined },
  active: { label: 'Ativa', tone: 'green', dot: true },
  inactive: { label: 'Inativa', tone: undefined },
};
export function StatusBadge({ status, label }) {
  const s = STATUS[status] || { label: status };
  return <Badge tone={s.tone} dot={s.dot} live={s.live}>{label || s.label}</Badge>;
}
