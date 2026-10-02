import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import NewsCard from '../../components/cards/NewsCard';
import EmptyState from '../../components/common/EmptyState';
import { getNews } from '../../services/contentService';

export default function News() {
  const ref = useReveal();
  const news = getNews();
  const featured = news.find((n) => n.featured) || news[0];
  const rest = news.filter((n) => n !== featured);
  return (
    <div ref={ref}>
      <PageHeader eyebrow="Notícias" title="Últimas da Aliança" text="Anúncios oficiais, resultados e novidades da comunidade." icon="news" />
      <section className="section section--tight">
        <div className="container">
          {news.length ? (
            <div className="grid grid-3">
              <NewsCard item={featured} featured />
              {rest.map((n, i) => <NewsCard key={n.id} item={n} style={{ '--d': `${(i % 3) * 80}ms` }} />)}
            </div>
          ) : (
            <EmptyState icon="news" title="Sem notícias por agora" />
          )}
        </div>
      </section>
    </div>
  );
}
