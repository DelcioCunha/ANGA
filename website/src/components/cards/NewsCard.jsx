import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import { ExampleBadge } from '../common/Badge';
import { formatDate, asset } from '../../utils/format';

export default function NewsCard({ item, featured, style }) {
  return (
    <Link to={`/noticias/${item.id}`} className={`news-card card card--hover ${featured ? 'news-card--featured' : ''}`} style={style} data-reveal>
      <div className="news-card__media" aria-hidden="true">
        {item.image ? <img src={asset(featured ? item.image : item.thumb || item.image)} alt="" loading="lazy" decoding="async" /> : <div className="news-card__art"><Icon name="news" /></div>}
        {item.video && <span className="news-card__play" aria-label="Notícia com vídeo"><Icon name="youtube" /> Vídeo</span>}
      </div>
      <div className="news-card__body">
        <div className="row" style={{ gap: 8 }}>
          <span className="badge badge--violet">{item.category}</span>
          <ExampleBadge show={item.example} />
        </div>
        <h3 className={featured ? 'h2' : 'h3'}>{item.title}</h3>
        <p className="muted">{item.excerpt}</p>
        <div className="news-card__foot">
          <span className="muted small"><Icon name="calendar" width={14} height={14} /> {formatDate(item.date)}</span>
          <span className="link-arrow">Ler <Icon name="arrow" /></span>
        </div>
      </div>
    </Link>
  );
}
