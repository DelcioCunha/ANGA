import Icon from '../common/Icon';
import { getSite } from '../../services/contentService';

export default function Intro() {
  const { intro } = getSite();
  return (
    <section className="section">
      <div className="container intro">
        <div className="intro__copy" data-reveal>
          <span className="eyebrow">Quem somos</span>
          <h2 className="h2">{intro.title}</h2>
          <p className="lead">{intro.text}</p>
        </div>
        <div className="grid intro__pillars">
          {intro.pillars.map((p, i) => (
            <div key={p.title} className="card card--hover pillar" data-reveal style={{ '--d': `${i * 70}ms` }}>
              <div className="icon-tile"><Icon name={p.icon} /></div>
              <h3 className="h3">{p.title}</h3>
              <p className="muted">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
