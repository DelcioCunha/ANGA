import { Link, useParams } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import Icon from '../../components/common/Icon';
import NewsCard from '../../components/cards/NewsCard';
import { ExampleBadge } from '../../components/common/Badge';
import NotFound from '../NotFound/NotFound';
import { getNewsItem, getNews } from '../../services/contentService';
import { formatDate, asset } from '../../utils/format';

export default function Article() {
  const { id } = useParams();
  const ref = useReveal();
  const item = getNewsItem(id);
  if (!item) return <NotFound />;
  const more = getNews().filter((n) => n.id !== id).slice(0, 2);
  return (
    <div ref={ref}>
      <PageHeader eyebrow={item.category} title={item.title}>
        <div className="row muted small">
          <span><Icon name="calendar" width={14} height={14} /> {formatDate(item.date)}</span>
          <ExampleBadge show={item.example} />
        </div>
      </PageHeader>
      <section className="section section--tight">
        <article className="container article">
          {item.image && <img src={asset(item.image)} alt="" className="article__img" />}
          <p className="lead article__lead">{item.excerpt}</p>
          {item.body.map((p, i) => <p key={i}>{p}</p>)}
          <Link to="/noticias" className="link-arrow" style={{ marginTop: 16 }}><Icon name="back" /> Todas as notícias</Link>
        </article>
      </section>
      {more.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2 className="footer__title">Ler também</h2>
            <div className="grid grid-2">{more.map((n) => <NewsCard key={n.id} item={n} />)}</div>
          </div>
        </section>
      )}
    </div>
  );
}
