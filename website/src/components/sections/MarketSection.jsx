import Icon from '../common/Icon';
import Button from '../common/Button';
import PriceTable from '../market/PriceTable';
import BadgeLadder from '../market/BadgeLadder';
import { getMarket } from '../../services/contentService';
import { asset } from '../../utils/format';

export default function MarketSection() {
  const market = getMarket();
  return (
    <section className="section">
      <div className="container">
        <div className="market-banner" data-reveal>
          <div className="market-banner__copy">
            <div className="row" style={{ gap: 16 }}>
              <img className="market-banner__logo" src={asset(market.logo)} alt="Mercado da Aliança" width="84" height="84" loading="lazy" />
              <div>
                <span className="eyebrow">{market.tagline}</span>
                <h2 className="h2">{market.title}</h2>
              </div>
            </div>
            <p className="lead">{market.description}</p>
            <ul className="guarantees">
              {market.guarantees.map((g) => (
                <li key={g.title}><Icon name={g.icon} /> {g.title}</li>
              ))}
            </ul>
            <div className="stack" style={{ gap: 12 }}>
              <span className="eyebrow">{market.badges.title}</span>
              <BadgeLadder levels={market.badges.levels} locked={market.badges.lockedLevels} />
            </div>
            <div className="row">
              <Button to="/mercado" variant="gold" iconRight="arrow">Ver tabela completa e selos</Button>
              <Button whatsapp="market" variant="ghost" icon="whatsapp">Fazer um pedido</Button>
            </div>
          </div>
          <PriceTable compact />
        </div>
      </div>
    </section>
  );
}
