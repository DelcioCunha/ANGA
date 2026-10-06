import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import Icon from '../../components/common/Icon';
import NewsCard from '../../components/cards/NewsCard';
import Lightbox from '../../components/common/Lightbox';
import { ExampleBadge } from '../../components/common/Badge';
import NotFound from '../NotFound/NotFound';
import { getNewsItem, getNews } from '../../services/contentService';
import { asset, formatDate } from '../../utils/format';

export default function Article() {
  const { id } = useParams();
  const ref = useReveal();
  const [zoom, setZoom] = useState(null);
  const item = getNewsItem(id);
  if (!item) return <NotFound />;
  const all = getNews();
  const i = all.findIndex((n) => n.id === id);
  const newer = all[i - 1];
  const older = all[i + 1];
  const more = all.filter((n) => n.id !== id && n.category === item.category).slice(0, 3);

  return (
    <div ref={ref} key={id}>
      <PageHeader eyebrow={item.category} title={item.title}>
        <div className="row muted small">
          <span className="row" style={{ gap: 6 }}><Icon name="calendar" width={14} height={14} /> {formatDate(item.date)}</span>
          {item.credit && <span>· {item.credit}</span>}
          <ExampleBadge show={item.example} />
        </div>
      </PageHeader>
      <section className="section section--tight">
        <div className="container article-layout">
          <article className="article">
            <p className="lead article__lead">{item.excerpt}</p>
            {item.body.map((p, k) => <p key={k}>{p}</p>)}
            <Link to="/noticias" className="link-arrow" style={{ marginTop: 16 }}><Icon name="back" /> Todas as notícias</Link>
          </article>
          {(item.video || item.image) && (
            <aside className="article__media">
              {item.video ? (
                <video controls playsInline preload="none" poster={asset(item.video.poster || item.image)}>
                  <source src={asset(item.video.src)} type="video/mp4" />
                </video>
              ) : (
                <button className="article__poster" onClick={() => setZoom(0)} aria-label="Ver imagem em grande">
                  <img src={asset(item.image)} alt={item.title} />
                  <span className="article__zoom"><Icon name="external" /> Ver em grande</span>
                </button>
              )}
            </aside>
          )}
        </div>
        <nav className="container article-nav" aria-label="Outras notícias">
          {newer ? (
            <Link to={`/noticias/${newer.id}`} className="article-nav__link">
              <small><Icon name="back" /> Mais recente</small><strong>{newer.title}</strong>
            </Link>
          ) : <span />}
          {older && (
            <Link to={`/noticias/${older.id}`} className="article-nav__link article-nav__link--next">
              <small>Mais antiga <Icon name="arrow" /></small><strong>{older.title}</strong>
            </Link>
          )}
        </nav>
      </section>
      {more.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2 className="footer__title">Mais em {item.category}</h2>
            <div className="grid grid-3">{more.map((n) => <NewsCard key={n.id} item={n} />)}</div>
          </div>
        </section>
      )}
      {item.image && !item.video && <Lightbox items={[{ image: item.image, title: item.title }]} index={zoom} onClose={() => setZoom(null)} />}
    </div>
  );
}
