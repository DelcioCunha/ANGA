import { getSite } from '../../services/contentService';
import { asset } from '../../utils/format';

/** Brasão oficial da ANGA (imagem em content/site.json → logo / logoSmall). */
export default function Emblem({ size = 40, className = '' }) {
  const site = getSite();
  const src = asset(size > 120 ? site.logo : site.logoSmall || site.logo);
  return (
    <img
      className={`emblem ${className}`}
      src={src}
      width={size}
      height={size}
      alt={size > 120 ? `Brasão da ${site.name}` : ''}
      style={{ width: size, height: size }}
      decoding="async"
    />
  );
}
