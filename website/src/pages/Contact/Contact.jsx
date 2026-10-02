import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import Icon from '../../components/common/Icon';
import { getSite } from '../../services/contentService';

const TOPICS = [
  { id: 'join', label: 'Quero entrar na Aliança' },
  { id: 'guild', label: 'Filiar a minha guilda' },
  { id: 'league', label: 'Liga FF' },
  { id: 'market', label: 'Mercado' },
  { id: 'other', label: 'Outro assunto' },
];

export default function Contact() {
  const ref = useReveal();
  const site = getSite();
  const [form, setForm] = useState({ name: '', ffid: '', guild: '', topic: 'join', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const [touched, setTouched] = useState(false);
  const topic = TOPICS.find((t) => t.id === form.topic)?.label;
  const lines = [
    'Olá! Contacto pelo website da Aliança.',
    `*Assunto:* ${topic}`,
    `*Nome/Nick:* ${form.name}`,
    form.ffid && `*ID Free Fire:* ${form.ffid}`,
    form.guild && `*Guilda:* ${form.guild}`,
    form.message && `\n${form.message}`,
  ].filter(Boolean);
  // Link real (não window.open): funciona em qualquer navegador e alojamento.
  const href = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(lines.join('\n'))}`;
  const nameMissing = !form.name.trim();
  const onSend = (e) => {
    if (nameMissing) {
      e.preventDefault();
      setTouched(true);
      document.getElementById('contact-name')?.focus();
    }
  };

  const social = site.social.filter((s) => s.id !== 'whatsapp');

  return (
    <div ref={ref}>
      <PageHeader eyebrow="Contactos" title="Fala com a Aliança" text="A Aliança vive no WhatsApp. Escreve-nos diretamente ou preenche o formulário — a mensagem abre pronta no teu WhatsApp." icon="phone" />
      <section className="section section--tight">
        <div className="container contact">
          <div className="stack">
            <a className="card card--hover contact__wa" href={`https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.defaultMessage)}`} target="_blank" rel="noopener noreferrer" data-reveal>
              <div className="contact__wa-icon"><Icon name="whatsapp" /></div>
              <div>
                <span className="eyebrow">WhatsApp oficial</span>
                <strong className="contact__number">{site.whatsapp.display}</strong>
                <span className="muted">{site.founder.name} — {site.founder.role}</span>
              </div>
              <Icon name="external" className="contact__ext" />
            </a>
            <div className="card" data-reveal style={{ '--d': '100ms' }}>
              <span className="eyebrow">Redes sociais</span>
              <div className="socials">
                {social.map((s) => s.active && s.url ? (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="social-row"><Icon name={s.id} /> {s.label}</a>
                ) : (
                  <span key={s.id} className="social-row social-row--soon"><Icon name={s.id} /> {s.label} <small>Em breve</small></span>
                ))}
              </div>
            </div>
          </div>

          <form className="card card--glass contact__form" onSubmit={(e) => e.preventDefault()} data-reveal style={{ '--d': '150ms' }}>
            <h2 className="h3">Enviar mensagem</h2>
            <label className="field">
              <span>Assunto</span>
              <select id="contact-topic" value={form.topic} onChange={set('topic')}>
                {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </label>
            <div className="field-row">
              <label className="field">
                <span>Nome / Nick *</span>
                <input id="contact-name" required aria-invalid={touched && nameMissing} value={form.name} onChange={set('name')} placeholder="O teu nick" autoComplete="nickname" />
                {touched && nameMissing && <small className="field__error">Escreve o teu nome ou nick para continuar.</small>}
              </label>
              <label className="field">
                <span>ID Free Fire</span>
                <input id="contact-ffid" value={form.ffid} onChange={set('ffid')} placeholder="Ex.: 123456789" inputMode="numeric" />
              </label>
            </div>
            <label className="field">
              <span>Guilda</span>
              <input id="contact-guild" value={form.guild} onChange={set('guild')} placeholder="Nome da tua guilda (opcional)" />
            </label>
            <label className="field">
              <span>Mensagem</span>
              <textarea id="contact-message" rows={4} value={form.message} onChange={set('message')} placeholder="Escreve a tua mensagem…" />
            </label>
            <a className="btn btn--whatsapp btn--block" href={href} target="_blank" rel="noopener noreferrer" onClick={onSend}>
              <Icon name="whatsapp" /><span>Abrir no WhatsApp</span>
            </a>
            <p className="muted small">Nada é guardado neste site — a mensagem é enviada só pelo teu WhatsApp.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
