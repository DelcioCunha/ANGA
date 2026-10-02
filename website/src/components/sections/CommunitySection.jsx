import Icon from '../common/Icon';
import Button from '../common/Button';
import { getSite } from '../../services/contentService';
import { asset, formatNumber } from '../../utils/format';

/** A comunidade no WhatsApp: números reais e a mensagem de fundação. */
export default function CommunitySection() {
  const site = getSite();
  const c = site.community;
  const inaug = site.about.inauguration;
  return (
    <section className="section section--alt">
      <div className="container community">
        <div className="community__copy" data-reveal>
          <span className="eyebrow">A comunidade</span>
          <h2 className="h2">Vivemos no WhatsApp</h2>
          <p className="lead">{c.description}</p>
          <dl className="community__nums">
            <div><dt>Membros</dt><dd>{formatNumber(c.members)}</dd></div>
            <div><dt>Grupos</dt><dd>{c.groups}</dd></div>
          </dl>
          <blockquote className="community__quote">
            <Icon name="crown" />
            <p>“{inaug.quote}”</p>
            <cite>— {site.founder.name}, na mensagem de fundação</cite>
          </blockquote>
          <div className="row">
            <Button whatsapp="join" variant="whatsapp" icon="whatsapp">Pedir para entrar</Button>
            <Button to="/sobre" variant="ghost" iconRight="arrow">A nossa história</Button>
          </div>
        </div>
        <div className="community__phones" aria-hidden="true">
          <img src={asset(c.profileImage)} alt="" loading="lazy" className="phone phone--a" />
          <img src={asset(inaug.image)} alt="" loading="lazy" className="phone phone--b" />
        </div>
      </div>
    </section>
  );
}
