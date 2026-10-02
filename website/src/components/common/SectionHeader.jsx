import Icon from './Icon';
import { Link } from 'react-router-dom';

export default function SectionHeader({ eyebrow, title, text, link, linkLabel = 'Ver tudo', align = 'left' }) {
  return (
    <header className={`section-header section-header--${align}`} data-reveal>
      <div className="section-header__copy">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="h2">{title}</h2>
        {text && <p className="lead">{text}</p>}
      </div>
      {link && (
        <Link to={link} className="link-arrow">
          {linkLabel} <Icon name="arrow" />
        </Link>
      )}
    </header>
  );
}
