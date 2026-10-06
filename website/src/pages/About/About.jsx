import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import SectionHeader from '../../components/common/SectionHeader';
import Icon from '../../components/common/Icon';
import Emblem from '../../components/common/Emblem';
import JoinCTA from '../../components/sections/JoinCTA';
import { ImageGrid } from '../../components/common/Lightbox';
import { getSite } from '../../services/contentService';
import { asset, formatNumber } from '../../utils/format';

export default function About() {
  const ref = useReveal();
  const site = getSite();
  const { about, founder, community } = site;
  return (
    <div ref={ref}>
      <PageHeader eyebrow="Sobre a ANGA" title="Uma bandeira. Muitas guildas." text={site.intro.text} icon="shield" />

      <section className="section">
        <div className="container about-story">
          <div className="stack" data-reveal>
            <span className="eyebrow">A nossa história</span>
            <h2 className="h2">Da ONGA à Aliança Nacional</h2>
            {about.history.map((p, i) => <p key={i} className="lead">{p}</p>)}
          </div>
          <aside className="founder card card--glass" data-reveal style={{ '--d': '120ms' }}>
            <Emblem size={180} className="founder__logo" />
            <span className="eyebrow">Fundador</span>
            <h3 className="h2">{founder.name}</h3>
            <p className="muted">{founder.role}</p>
            <dl className="community__nums">
              <div><dt>Membros</dt><dd>{formatNumber(community.members)}</dd></div>
              <div><dt>Grupos</dt><dd>{community.groups}</dd></div>
            </dl>
            <a className="footer__wa" href={`https://wa.me/${founder.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /> {founder.whatsappDisplay}
            </a>
          </aside>
        </div>
      </section>

      <section className="section creator-section">
        <div className="container creator">
          <div className="creator__photo" data-reveal>
            <img src={asset(founder.photo)} alt={`Foto de ${founder.name}`} width="308" height="308" loading="lazy" />
            <span className="creator__badge"><Icon name="crown" /> Fundador</span>
          </div>
          <div className="stack creator__copy" data-reveal style={{ gap: 16, '--d': '100ms' }}>
            <span className="eyebrow">O criador</span>
            <h2 className="h2">{founder.name}</h2>
            <p className="creator__role">{founder.role} · {founder.profession}</p>
            {founder.bio.map((p, i) => <p key={i} className="muted creator__text">{p}</p>)}
            <dl className="creator__facts">
              {founder.highlights.map((h) => <div key={h.label}><dt>{h.label}</dt><dd>{h.value}</dd></div>)}
            </dl>
            <div className="row">
              <a className="btn btn--gold" href={founder.portfolio} target="_blank" rel="noopener noreferrer"><Icon name="external" /><span>Ver o meu portfólio</span></a>
              <a className="btn btn--whatsapp" href={`https://wa.me/${founder.whatsapp}`} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /><span>Falar com o fundador</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container inauguration">
          <div className="stack" data-reveal>
            <span className="eyebrow">Inauguração</span>
            <blockquote className="inauguration__quote">“{about.inauguration.quote}”</blockquote>
            <p className="lead">{about.inauguration.text}</p>
          </div>
          <div data-reveal style={{ '--d': '100ms' }}>
            <ImageGrid items={[{ id: 'inauguracao', title: 'Mensagem de fundação nos Comunicados', image: about.inauguration.image }, { id: 'comunidade', title: `A comunidade hoje — ${formatNumber(community.members)} membros`, image: community.profileImage }]} variant="phone" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Os salões" title="Onde a Aliança se reúne" />
          <div className="halls">
            {about.halls.map((h, i) => (
              <figure key={h.id} className="hall-card" data-reveal style={{ '--d': `${i * 100}ms` }}>
                <img src={asset(h.image)} alt={h.title} loading="lazy" />
                <figcaption>
                  <h3 className="h2">{h.title}</h3>
                  <p>{h.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container grid grid-2">
          <div className="card mv" data-reveal>
            <div className="icon-tile"><Icon name="target" /></div>
            <span className="eyebrow">Missão</span>
            <p className="mv__text">{about.mission}</p>
          </div>
          <div className="card mv" data-reveal style={{ '--d': '100ms' }}>
            <div className="icon-tile icon-tile--gold"><Icon name="star" /></div>
            <span className="eyebrow">Visão</span>
            <p className="mv__text">{about.vision}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Estrutura" title="Como a Aliança se organiza" text="Uma hierarquia simples, para que cada membro saiba a quem recorrer." />
          <div className="structure">
            {about.structure.map((s, i) => (
              <div key={s.title} className="structure__level card" data-reveal style={{ '--d': `${i * 90}ms`, '--w': `${100 - i * 8}%` }}>
                <span className="badge badge--violet">{s.level}</span>
                <h3 className="h3">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHeader eyebrow="Os nossos pilares" title={site.slogans?.[0] || 'O código da Aliança'} align="center" />
          <div className="values">
            {about.values.map((v, i) => (
              <div key={v.title} className="value card" data-reveal style={{ '--d': `${i * 60}ms` }}>
                <h3 className="h3">{v.title}</h3>
                <p className="muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JoinCTA />
    </div>
  );
}
