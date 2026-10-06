import { useMemo, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import NewsCard from '../../components/cards/NewsCard';
import EmptyState from '../../components/common/EmptyState';
import { getNews, getSite } from '../../services/contentService';
import { parseDate } from '../../utils/format';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

/** Notícias da mais recente para a mais antiga, agrupadas por mês. */
export default function News() {
  const ref = useReveal();
  const news = getNews();
  const cats = ['Todas', ...new Set(news.map((n) => n.category))];
  const [cat, setCat] = useState('Todas');
  const list = cat === 'Todas' ? news : news.filter((n) => n.category === cat);
  const [featured, ...rest] = list;

  const groups = useMemo(() => {
    const m = new Map();
    rest.forEach((n) => {
      const p = parseDate(n.date);
      const key = p ? `${p.y}-${String(p.m).padStart(2, '0')}` : 'sem-data';
      if (!m.has(key)) m.set(key, { label: p ? `${MONTHS[p.m - 1]} ${p.y}` : 'Sem data', items: [] });
      m.get(key).items.push(n);
    });
    return [...m.values()];
  }, [rest]);

  const founded = parseDate(getSite().foundedDate);
  return (
    <div ref={ref}>
      <PageHeader eyebrow="Notícias" title="Últimas da Aliança" text={`Anúncios oficiais, Liga, torneios e Mercado — a história da comunidade desde ${founded ? `${founded.d} de ${MONTHS[founded.m - 1].toLowerCase()} de ${founded.y}` : 'o primeiro dia'}, da notícia mais recente à mais antiga.`} icon="news">
        <div className="tabs" role="tablist" aria-label="Filtrar notícias" style={{ marginTop: 8 }}>
          {cats.map((c) => (
            <button key={c} role="tab" className="tab" aria-selected={c === cat} onClick={() => setCat(c)}>
              {c}{c !== 'Todas' && ` (${news.filter((n) => n.category === c).length})`}
            </button>
          ))}
        </div>
      </PageHeader>
      <section className="section section--tight">
        <div className="container" key={cat}>
          {featured ? (
            <>
              <div className="grid grid-3"><NewsCard item={featured} featured /></div>
              {groups.map((g) => (
                <div key={g.label} className="news-month">
                  <h2 className="news-month__title"><span>{g.label}</span><small>{g.items.length} {g.items.length === 1 ? 'notícia' : 'notícias'}</small></h2>
                  <div className="grid grid-3">
                    {g.items.map((n, i) => <NewsCard key={n.id} item={n} style={{ '--d': `${(i % 3) * 70}ms` }} />)}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <EmptyState icon="news" title="Sem notícias por agora" />
          )}
        </div>
      </section>
    </div>
  );
}
