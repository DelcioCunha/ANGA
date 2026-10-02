import Button from '../common/Button';
import Emblem from '../common/Emblem';
import { getSite } from '../../services/contentService';

export default function JoinCTA() {
  const { cta, join, whatsapp } = getSite();
  return (
    <section className="section">
      <div className="container">
        <div className="cta" data-reveal>
          <div className="cta__bg" aria-hidden="true" />
          <div className="cta__copy">
            <Emblem size={56} />
            <h2 className="h1">{cta.title}</h2>
            <p className="lead">{cta.text}</p>
            <div className="row">
              <Button whatsapp="join" variant="whatsapp" icon="whatsapp">Quero entrar</Button>
              <Button whatsapp="guild" variant="ghost" icon="shield">Sou líder de guilda</Button>
            </div>
            <p className="muted small">WhatsApp oficial: {whatsapp.display}</p>
          </div>
          <ol className="steps">
            {join.steps.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__n">{i + 1}</span>
                <div>
                  <h3 className="h3">{s.title}</h3>
                  <p className="muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
