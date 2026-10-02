import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import TrophyCard from '../../components/cards/TrophyCard';
import Icon from '../../components/common/Icon';
import { getTrophies } from '../../services/contentService';

export default function Trophies() {
  const ref = useReveal();
  const trophies = getTrophies();
  const vacant = trophies.filter((t) => t.vacant);
  const won = trophies.filter((t) => !t.vacant);
  return (
    <div ref={ref}>
      <PageHeader eyebrow="Galeria histórica" title={<>Salão de <span className="gold-text">Troféus</span></>} text="Os campeões da Aliança ficam aqui para sempre. Cada troféu conta uma história de squad, estratégia e Booyah." icon="trophy" />
      <section className="section hall">
        <div className="hall__bg" aria-hidden="true" />
        <div className="container stack" style={{ gap: 48 }}>
          {vacant.length > 0 && (
            <div>
              <h2 className="footer__title">Por conquistar</h2>
              <div className="grid grid-3">{vacant.map((t, i) => <TrophyCard key={t.id} trophy={t} style={{ '--d': `${i * 80}ms` }} />)}</div>
            </div>
          )}
          {won.length > 0 ? (
            <div>
              <h2 className="footer__title">Conquistados</h2>
              <div className="grid grid-3">{won.map((t, i) => <TrophyCard key={t.id} trophy={t} style={{ '--d': `${(i % 3) * 80}ms` }} />)}</div>
            </div>
          ) : (
            <p className="notice"><Icon name="trophy" /> Os primeiros troféus da Aliança são entregues no fim da Temporada 1 da Liga Aliança (Rodada 25). O campeão fica registado aqui para sempre.</p>
          )}
        </div>
      </section>
    </div>
  );
}
