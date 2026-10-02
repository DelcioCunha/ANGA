import { useState } from 'react';
import Icon from '../common/Icon';
import { getMarket, getPriceGroups } from '../../services/contentService';
import { formatDate, formatKz, whatsappLink } from '../../utils/format';

/** Tabela de preços por categoria. Cada linha abre o WhatsApp com o pedido escrito. */
export default function PriceTable({ compact }) {
  const market = getMarket();
  const groups = getPriceGroups();
  const [active, setActive] = useState(groups[0]?.id);
  const group = groups.find((g) => g.id === active) || groups[0];
  if (!group) return null;
  const order = (item) => `Olá! Quero fazer um pedido no Mercado da Aliança:\n*${item.name}*${item.detail ? ` (${item.detail})` : ''} — ${formatKz(item.price)}`;

  return (
    <div className="prices" style={{ '--g': group.color }}>
      <div className="tabs prices__tabs" role="tablist" aria-label="Categorias de produtos">
        {groups.map((g) => (
          <button key={g.id} role="tab" className="tab" aria-selected={g.id === group.id} onClick={() => setActive(g.id)}>
            {g.title}
          </button>
        ))}
      </div>
      <div className="prices__panel card" role="tabpanel">
        <header className="prices__head">
          <div className="prices__icon"><Icon name={group.icon} /></div>
          <div>
            <h3 className="h3">{group.title}</h3>
            <p className="muted small">{group.subtitle}</p>
          </div>
        </header>
        <ul className="prices__list">
          {(compact ? group.items.slice(0, 4) : group.items).map((it) => (
            <li key={it.name} className="prices__row">
              <div className="prices__name">
                <strong>{it.name}</strong>
                {it.detail && <span className="muted small">{it.detail}</span>}
              </div>
              <span className="prices__price">{formatKz(it.price)}</span>
              <a className="btn btn--sm btn--whatsapp prices__order" href={whatsappLink(order(it))} target="_blank" rel="noopener noreferrer" aria-label={`Pedir ${it.name}`}>
                <Icon name="whatsapp" /><span>Pedir</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="muted small prices__foot">Preços em Kwanzas, atualizados a {formatDate(market.pricesUpdated)}. O pagamento é combinado com o vendedor dentro do grupo Mercado da Aliança.</p>
      </div>
    </div>
  );
}
