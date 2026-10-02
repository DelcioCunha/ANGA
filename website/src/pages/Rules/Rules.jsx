import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import PageHeader from '../../components/common/PageHeader';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';
import { getRules } from '../../services/contentService';
import { formatDate } from '../../utils/format';

export default function Rules() {
  const ref = useReveal();
  const rules = getRules();
  const [active, setActive] = useState(rules.sections[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    rules.sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [rules]);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  let counter = 0;

  return (
    <div ref={ref}>
      <PageHeader eyebrow="Regulamento" title="Regras da Aliança" text={rules.intro} icon="scroll">
        <p className="muted small">Última atualização: {formatDate(rules.updated)}</p>
        {rules.draft && <p className="notice"><Icon name="alert" /> <span>{rules.draftNote} <Link to="/liga" className="link-arrow">Regras da Liga <Icon name="arrow" /></Link></span></p>}
      </PageHeader>
      <section className="section section--tight">
        <div className="container rules">
          <nav className="rules__toc" aria-label="Secções do regulamento">
            {rules.sections.map((s, i) => (
              <button key={s.id} className={`rules__toc-link ${active === s.id ? 'is-active' : ''}`} onClick={() => go(s.id)}>
                <span>{String(i + 1).padStart(2, '0')}</span>{s.title}
              </button>
            ))}
          </nav>
          <div className="stack" style={{ gap: 20 }}>
            {rules.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="card rules__section" data-reveal>
                <h2 className="h3"><span className="gradient-text">{String(i + 1).padStart(2, '0')}</span> {s.title}</h2>
                <ol className="rules__list">
                  {s.rules.map((r) => { counter += 1; return <li key={r}><span>{counter}</span>{r}</li>; })}
                </ol>
              </section>
            ))}
            <div className="notice"><Icon name="alert" /> Ao participar na Aliança, aceitas este regulamento. Dúvidas? Fala com a administração.</div>
            <Button whatsapp="Olá! Tenho uma dúvida sobre as regras da Aliança." variant="ghost" icon="whatsapp">Tirar uma dúvida</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
