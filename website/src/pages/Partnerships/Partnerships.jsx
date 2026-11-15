import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import SectionHeader from '../../components/common/SectionHeader';
import StatCard from '../../components/cards/StatCard';
import Icon from '../../components/common/Icon';
import { getSite, getPartnerships, getGuilds, getNewsItem, getLeague } from '../../services/contentService';
import { asset } from '../../utils/format';

/** Ala de Parcerias & Publicidade: quem quer divulgar ou fazer parceria fala diretamente com o fundador. */
export default function Partnerships() {
  const ref = useReveal();
  const site = getSite();
  const p = getPartnerships();
  const season = getLeague().seasons?.[0];
  const [form, setForm] = useState({ name: '', brand: '', format: p.formats[0].id, idea: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const [touched, setTouched] = useState(false);

  const wa = (text) => `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;
  const formatLabel = p.formats.find((f) => f.id === form.format)?.title;
  const lines = [
    p.message,
    `*Nome:* ${form.name}`,
    form.brand && `*Marca / empresa:* ${form.brand}`,
    `*Interesse:* ${formatLabel}`,
    form.idea && `\n${form.idea}`,
  ].filter(Boolean);
  const nameMissing = !form.name.trim();
  const onSend = (e) => {
    if (nameMissing) {
      e.preventDefault();
      setTouched(true);
      document.getElementById('partner-name')?.focus();
    }
  };
  const pick = (id) => {
    setForm((f) => ({ ...f, format: id }));
    document.getElementById('proposta')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={ref}>
      <PageHeader eyebrow={p.eyebrow} title={p.title} text={p.lead} icon="megaphone">
        <div className="row" style={{ marginTop: 8 }}>
          <a className="btn btn--whatsapp" href={wa(p.message)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /><span>Falar com o Delcio</span></a>
          <a className="btn btn--ghost" href="#formatos" onClick={(e) => { e.preventDefault(); document.getElementById('formatos')?.scrollIntoView({ behavior: 'smooth' }); }}><span>Ver formatos</span><Icon name="arrow" /></a>
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container stack" style={{ gap: 16 }}>
          <div className="stats">
            <StatCard value={site.community.members} label="Membros na comunidade" />
            <StatCard value={site.community.groups} label="Grupos no WhatsApp" />
            <StatCard value={getGuilds().length} label="Guildas na Liga" />
            <StatCard value={season?.totalRounds || 25} label="Rodadas por temporada" />
          </div>
          <p className="muted small" data-reveal>{p.audienceNote}</p>
        </div>
      </section>

      <section className="section section--alt" id="formatos">
        <div className="container">
          <SectionHeader eyebrow="Formatos" title="Como a tua marca pode aparecer" text="Cada acordo é feito à medida. Escolhe um ponto de partida — os valores e prazos combinamos na conversa." />
          <ul className="partner-grid">
            {p.formats.map((f, i) => (
              <li key={f.id} className="card card--hover partner-card" data-reveal style={{ '--d': `${(i % 3) * 80}ms` }}>
                <div className="icon-tile icon-tile--gold"><Icon name={f.icon} /></div>
                <h3 className="h3">{f.title}</h3>
                <p className="muted">{f.text}</p>
                <ul className="partner-card__list">
                  {f.items.map((it) => <li key={it}><Icon name="check" />{it}</li>)}
                </ul>
                <div className="partner-card__foot">
                  <span className="badge">Valor a combinar</span>
                  <button type="button" className="link-arrow" onClick={() => pick(f.id)}>Quero este <Icon name="arrow" /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Como funciona" title="Do contacto ao acordo" />
          <ol className="flow">
            {p.steps.map((s, i) => (
              <li key={s.title} className="flow__step" data-reveal style={{ '--d': `${i * 90}ms` }}>
                <span className="flow__n">{i + 1}</span>
                <h3 className="h3">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--alt" id="proposta">
        <div className="container partner-deal">
          <div className="stack" style={{ gap: 18 }}>
            <a className="card card--hover contact__wa" href={wa(p.message)} target="_blank" rel="noopener noreferrer" data-reveal>
              <div className="contact__wa-icon"><Icon name="whatsapp" /></div>
              <div>
                <span className="eyebrow">Parcerias · WhatsApp</span>
                <strong className="contact__number">{site.whatsapp.display}</strong>
                <span className="muted">{p.contactName} — {p.contactRole}</span>
              </div>
              <Icon name="external" className="contact__ext" />
            </a>
            <div className="card" data-reveal style={{ '--d': '100ms' }}>
              <span className="eyebrow">Regras da casa</span>
              <ul className="partner-rules">
                {p.rules.map((r) => <li key={r}><Icon name="shield" />{r}</li>)}
              </ul>
            </div>
            {p.partners.length > 0 && (
              <div className="card" data-reveal style={{ '--d': '160ms' }}>
                <span className="eyebrow">Já confiaram na Aliança</span>
                <ul className="partner-list">
                  {p.partners.map((pt) => {
                    const n = pt.news && getNewsItem(pt.news);
                    const body = (
                      <>
                        {n?.image && <img src={asset(n.thumb || n.image)} alt="" loading="lazy" />}
                        <div><strong>{pt.name}</strong><span className="muted small">{pt.text}</span></div>
                      </>
                    );
                    return <li key={pt.name}>{n ? <Link to={`/noticias/${n.id}`}>{body}</Link> : <div>{body}</div>}</li>;
                  })}
                </ul>
              </div>
            )}
          </div>

          <form className="card card--glass contact__form" onSubmit={(e) => e.preventDefault()} data-reveal style={{ '--d': '150ms' }}>
            <h2 className="h3">Enviar proposta</h2>
            <p className="muted small" style={{ marginTop: -8 }}>Preenche e a mensagem abre pronta no WhatsApp do {p.contactName}.</p>
            <div className="field-row">
              <label className="field">
                <span>Nome *</span>
                <input id="partner-name" required aria-invalid={touched && nameMissing} value={form.name} onChange={set('name')} placeholder="O teu nome" autoComplete="name" />
                {touched && nameMissing && <small className="field__error">Escreve o teu nome para continuar.</small>}
              </label>
              <label className="field">
                <span>Marca / empresa</span>
                <input id="partner-brand" value={form.brand} onChange={set('brand')} placeholder="Opcional" autoComplete="organization" />
              </label>
            </div>
            <label className="field">
              <span>Tenho interesse em</span>
              <select id="partner-format" value={form.format} onChange={set('format')}>
                {p.formats.map((f) => <option key={f.id} value={f.id}>{f.title}</option>)}
              </select>
            </label>
            <label className="field">
              <span>O que queres divulgar ou propor?</span>
              <textarea id="partner-idea" rows={4} value={form.idea} onChange={set('idea')} placeholder="Fala-nos do teu produto, serviço ou ideia de parceria…" />
            </label>
            <a className="btn btn--whatsapp btn--block" href={wa(lines.join('\n'))} target="_blank" rel="noopener noreferrer" onClick={onSend}>
              <Icon name="whatsapp" /><span>Enviar no WhatsApp</span>
            </a>
            <p className="muted small">Nada é guardado neste site — a conversa acontece só no WhatsApp.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
