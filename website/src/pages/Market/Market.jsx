import { useReveal } from '../../hooks/useReveal';
import SectionHeader from '../../components/common/SectionHeader';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon';
import { ImageGrid } from '../../components/common/Lightbox';
import PriceTable from '../../components/market/PriceTable';
import BadgeLadder from '../../components/market/BadgeLadder';
import BadgeHolders from '../../components/market/BadgeHolders';
import Testimonials from '../../components/market/Testimonials';
import VideoProof from '../../components/market/VideoProof';
import Backdrop from '../../components/effects/Backdrop';
import { getMarket } from '../../services/contentService';
import { asset } from '../../utils/format';

export default function Market() {
  const ref = useReveal();
  const m = getMarket();
  return (
    <div ref={ref}>
      <section className="market-hero">
        <Backdrop />
        <div className="container market-hero__inner">
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow">{m.tagline}</span>
            <h1 className="h1">{m.title}</h1>
            <p className="lead">{m.description}</p>
            <div className="row">
              <Button whatsapp="market" variant="gold" icon="whatsapp">Fazer um pedido</Button>
              <Button href="#precos" variant="ghost" iconRight="arrow" onClick={(e) => { e.preventDefault(); document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' }); }}>Ver preços</Button>
            </div>
          </div>
          <img className="market-hero__logo" src={asset(m.logo)} alt="Logótipo do Mercado da Aliança" width="320" height="320" />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <ul className="guarantee-grid">
            {m.guarantees.map((g, i) => (
              <li key={g.title} className="card" data-reveal style={{ '--d': `${i * 60}ms` }}>
                <div className="icon-tile icon-tile--gold"><Icon name={g.icon} /></div>
                <div>
                  <h3 className="h3">{g.title}</h3>
                  <p className="muted small">{g.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt" id="precos">
        <div className="container market-prices">
          <div className="stack" data-reveal>
            <SectionHeader eyebrow="Tabela de preços" title="Escolhe e pede" text="Toca em “Pedir” e a mensagem chega pronta ao WhatsApp da Aliança. A administração adiciona-te ao grupo com o vendedor." />
          </div>
          <PriceTable />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Como funciona" title="Do pedido ao selo" />
          <ol className="flow">
            {m.howItWorks.map((s, i) => (
              <li key={s.title} className="flow__step" data-reveal style={{ '--d': `${i * 90}ms` }}>
                <span className="flow__n">{i + 1}</span>
                <h3 className="h3">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container badges-intro">
          <div className="stack" style={{ gap: 18 }} data-reveal>
            <span className="eyebrow">{m.badges.motto}</span>
            <h2 className="h2">{m.badges.title}</h2>
            <p className="lead">{m.badges.text}</p>
            <BadgeLadder levels={m.badges.levels} locked={m.badges.lockedLevels} />
          </div>
          <div data-reveal style={{ '--d': '120ms' }}>
            <ImageGrid items={[{ id: 'programa', title: m.badges.title, image: m.badges.poster }]} variant="single" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Clientes reconhecidos" title="Quem já subiu de nível" text="Cada selo é entregue no grupo depois de uma compra confirmada. Toca num selo para o ver em grande." />
          <BadgeHolders holders={m.badges.holders} />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHeader eyebrow="Provas" title="O que dizem os clientes" text="Feedback real, deixado no grupo depois da compra. Os números de telefone foram ocultados para proteger os clientes." />
          <Testimonials items={m.testimonials} />
          <div style={{ height: 32 }} />
          <div className="proofs">
            <VideoProof video={m.video} />
            <ImageGrid items={m.proofs} variant="phone" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div className="stack">
            <SectionHeader eyebrow="Vendedores verificados" title="Com quem compras" />
            {m.sellers.map((s, i) => (
              <div key={s.id} className="card seller" data-reveal style={{ '--d': `${i * 80}ms` }}>
                <div className="icon-tile icon-tile--gold"><Icon name={s.id.includes('kwanza') ? 'gem' : 'target'} /></div>
                <div>
                  <div className="row" style={{ gap: 8 }}>
                    <h3 className="h3">{s.name}</h3>
                    {s.verified && <span className="badge badge--green"><Icon name="check" width={12} height={12} /> Verificado</span>}
                  </div>
                  <p className="small" style={{ color: 'var(--accent-2)' }}>{s.role}</p>
                  <p className="muted">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card safety" data-reveal>
            <div className="icon-tile" style={{ color: '#fda4af', background: 'rgba(225,29,72,.12)', borderColor: 'rgba(225,29,72,.35)' }}><Icon name="alert" /></div>
            <div className="stack">
              <h2 className="h2">Segurança primeiro</h2>
              <ul className="checklist">
                {m.safety.map((s) => <li key={s}><Icon name="check" /> {s}</li>)}
              </ul>
              <Button whatsapp="market" variant="whatsapp" icon="whatsapp">Falar com a administração</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
