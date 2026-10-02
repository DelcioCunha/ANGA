import { useEffect, useState } from 'react';
import Icon from '../common/Icon';
import { whatsappLink } from '../../utils/format';

/** Aparece depois de o visitante passar o topo da página (não tapa os CTAs do hero). */
export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a className={`fab-wa ${show ? '' : 'fab-wa--hidden'}`} href={whatsappLink('default')} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Aliança no WhatsApp" tabIndex={show ? 0 : -1}>
      <Icon name="whatsapp" />
      <span className="fab-wa__label">Fala connosco</span>
    </a>
  );
}
