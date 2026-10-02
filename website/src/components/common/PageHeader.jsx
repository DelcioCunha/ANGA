import Icon from './Icon';

/** Cabeçalho cinematográfico das páginas internas. */
export default function PageHeader({ eyebrow, title, text, icon, children }) {
  return (
    <section className="page-header">
      <div className="page-header__bg" aria-hidden="true" />
      <div className="container page-header__inner">
        {icon && (
          <div className="page-header__icon">
            <Icon name={icon} />
          </div>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="h1">{title}</h1>
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
    </section>
  );
}
