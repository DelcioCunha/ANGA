import SectionHeader from '../common/SectionHeader';
import NewsCard from '../cards/NewsCard';
import { getNews } from '../../services/contentService';

export default function NewsSection() {
  const news = getNews().slice(0, 3);
  if (!news.length) return null;
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow="Notícias" title="Últimas da Aliança" link="/noticias" linkLabel="Todas as notícias" />
        <div className="grid grid-3">
          {news.map((n, i) => <NewsCard key={n.id} item={n} style={{ '--d': `${i * 80}ms` }} />)}
        </div>
      </div>
    </section>
  );
}
