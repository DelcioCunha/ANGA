import { Link } from 'react-router-dom';
import Icon from './Icon';
import { whatsappLink } from '../../utils/format';

/** Botão do design system. `to` = rota interna, `href` = link externo, `whatsapp` = tipo de mensagem. */
export default function Button({ to, href, whatsapp, variant = 'ghost', size, icon, iconRight, block, children, className = '', ...rest }) {
  const cls = ['btn', `btn--${variant}`, size && `btn--${size}`, block && 'btn--block', className].filter(Boolean).join(' ');
  const inner = (
    <>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} />}
    </>
  );
  if (whatsapp) {
    return (
      <a className={cls} href={whatsappLink(whatsapp)} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    );
  }
  if (to) return <Link className={cls} to={to} {...rest}>{inner}</Link>;
  if (href) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer" {...rest}>{inner}</a>;
  return <button className={cls} type="button" {...rest}>{inner}</button>;
}
