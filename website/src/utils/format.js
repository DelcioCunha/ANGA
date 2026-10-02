import { getSite } from '../services/contentService';

/** Link wa.me com mensagem pré-preenchida. */
export function whatsappLink(kind = 'default', number) {
  const { whatsapp } = getSite();
  const msg =
    {
      default: whatsapp.defaultMessage,
      join: whatsapp.joinMessage,
      guild: whatsapp.guildMessage,
      market: whatsapp.marketMessage,
    }[kind] || kind;
  return `https://wa.me/${number || whatsapp.number}?text=${encodeURIComponent(msg)}`;
}

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MONTHS_LONG = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

export function parseDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d };
}
export function formatDate(iso) {
  const p = parseDate(iso);
  if (!p) return 'Data a definir';
  return `${p.d} de ${MONTHS_LONG[p.m - 1]} de ${p.y}`;
}
export function dateParts(iso) {
  const p = parseDate(iso);
  if (!p) return { day: '--', month: 'TBA', year: '' };
  return { day: String(p.d).padStart(2, '0'), month: MONTHS[p.m - 1], year: p.y };
}

export function initials(name = '') {
  const words = name.replace(/[^\p{L}\p{N} ]/gu, '').trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Converte "/assets/x.webp" em "assets/x.webp" para funcionar em qualquer
 * local: duplo clique (file://), subpasta ou domínio. URLs http(s) ficam iguais.
 */
export function asset(path) {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return path.replace(/^\.?\//, '');
}

/** 1200 → "1.200" (agrupamento angolano/português, também para 4 dígitos) */
export function formatNumber(value) {
  return String(Math.round(Number(value))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** 1200 → "Kz 1.200" */
export function formatKz(value) {
  return `Kz ${formatNumber(value)}`;
}
