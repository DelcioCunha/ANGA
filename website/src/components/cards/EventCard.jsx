import Icon from '../common/Icon';
import { StatusBadge, ExampleBadge } from '../common/Badge';
import { dateParts, formatDate, asset } from '../../utils/format';

export default function EventCard({ event, style, compact }) {
  const d = dateParts(event.date);
  return (
    <article className={`event-card card card--hover ${event.status === 'past' ? 'event-card--past' : ''} ${compact ? 'event-card--compact' : ''}`} style={style} data-reveal>
      <div className="event-card__media">
        {event.image ? (
          <img src={asset(event.image)} alt="" loading="lazy" />
        ) : (
          <div className="event-card__art" aria-hidden="true"><Icon name={event.category === 'Liga' ? 'trophy' : event.category === 'Torneio' ? 'target' : 'users'} /></div>
        )}
        <div className="event-card__date">
          <strong>{d.day}</strong>
          <span>{d.month}</span>
        </div>
      </div>
      <div className="event-card__body">
        <div className="row" style={{ gap: 8 }}>
          <span className="badge">{event.category}</span>
          <StatusBadge status={event.status} />
          <ExampleBadge show={event.example} />
        </div>
        <h3 className="h3">{event.title}</h3>
        {!compact && <p className="muted">{event.description}</p>}
        <div className="event-card__meta">
          <span><Icon name="calendar" /> {formatDate(event.date)}</span>
          {event.time && <span><Icon name="clock" /> {event.time}</span>}
          {event.prize && <span><Icon name="gem" /> {event.prize}</span>}
        </div>
      </div>
    </article>
  );
}
