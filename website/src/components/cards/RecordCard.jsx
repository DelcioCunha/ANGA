import Icon from '../common/Icon';
import { ExampleBadge } from '../common/Badge';
import { getGuild } from '../../services/contentService';

export default function RecordCard({ record, index, style }) {
  const guild = getGuild(record.guild);
  return (
    <article className={`record-card card card--hover ${record.vacant ? 'record-card--vacant' : ''}`} style={style} data-reveal>
      <span className="record-card__index">{String(index + 1).padStart(2, '0')}</span>
      <div className="row" style={{ gap: 8 }}>
        <span className="badge badge--gold"><Icon name="crown" width={12} height={12} /> {record.category}</span>
        <ExampleBadge show={record.example} />
      </div>
      <h3 className="h3">{record.title}</h3>
      <div className="record-card__value">
        <strong className="gold-text">{record.value}</strong>
        <span>{record.unit}</span>
      </div>
      <p className="record-card__holder">
        {record.vacant ? 'Recorde em aberto — sê o primeiro.' : [record.holder, guild?.name].filter(Boolean).join(' · ')}
      </p>
    </article>
  );
}
