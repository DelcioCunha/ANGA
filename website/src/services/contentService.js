/**
 * CONTENT SERVICE
 * ---------------------------------------------------------------
 * Única porta de entrada dos componentes para os dados.
 * Na V1 lê JSON local (../content). Na V2 basta trocar a
 * implementação destas funções por chamadas a uma API — os
 * componentes não precisam de mudar.
 */
import site from '@content/site.json';
import guilds from '@content/guilds.json';
import league from '@content/league.json';
import events from '@content/events.json';
import trophies from '@content/trophies.json';
import records from '@content/records.json';
import market from '@content/market.json';
import news from '@content/news.json';
import rules from '@content/rules.json';
import gallery from '@content/gallery.json';
import expelled from '@content/expelled-guilds.json';

const byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '');
const byDateAsc = (a, b) => (a.date || '9999').localeCompare(b.date || '9999');

/* ---------- Site / comunidade ---------- */
export const getSite = () => site;
export const getCommunity = () => site.community;

/* ---------- Guildas ---------- */
export const getGuilds = () => guilds.filter((g) => g.status !== 'hidden');
export const getGuild = (id) => guilds.find((g) => g.id === id) || null;

/** Guildas ordenadas pela posição na tabela atual (as restantes no fim). */
export const getGuildsByStanding = () => {
  const order = getStandings().map((r) => r.guildId);
  const pos = (g) => (order.indexOf(g.id) === -1 ? 999 : order.indexOf(g.id));
  return [...getGuilds()].sort((a, b) => pos(a) - pos(b));
};
export const getFeaturedGuilds = () => getGuildsByStanding().filter((g) => g.featured);

/** Posição e números da guilda na temporada atual (ou null). */
export const getGuildStanding = (guildId) => {
  const rows = getStandings();
  const i = rows.findIndex((r) => r.guildId === guildId);
  return i === -1 ? null : { ...rows[i], position: i + 1, total: rows.length };
};

/** Guildas expulsas da Aliança (registo permanente), mais recentes primeiro. */
export const getExpelledGuilds = () => [...expelled].sort((a, b) => (b.recorded || '').localeCompare(a.recorded || ''));

/* ---------- Liga ---------- */
export const getLeague = () => league;
export const getCurrentSeason = () =>
  league.seasons.find((s) => s.id === league.currentSeason) || league.seasons[0];
/** A tabela segue a ordem oficial publicada pela Liga (não é reordenada). */
export const getStandings = (season = getCurrentSeason()) => season?.standings || [];
export const getRounds = (season = getCurrentSeason()) => [...(season?.rounds || [])].sort(byDateDesc);
export const getLatestRound = () => getRounds()[0] || null;

/* ---------- Eventos ---------- */
export const getEvents = () => [...events];
export const getUpcomingEvents = () =>
  events.filter((e) => e.status === 'upcoming' || e.status === 'live').sort((a, b) => (a.status === 'live' ? -1 : b.status === 'live' ? 1 : byDateAsc(a, b)));
export const getPastEvents = () => events.filter((e) => e.status === 'past').sort(byDateDesc);

/* ---------- Hall ---------- */
export const getTrophies = () => [...trophies].sort(byDateDesc);
export const getRecords = () => records;

/* ---------- Mercado ---------- */
export const getMarket = () => market;
export const getPriceGroups = () => market.priceGroups || [];

/* ---------- Notícias ---------- */
export const getNews = () => [...news].sort(byDateDesc);
export const getNewsItem = (id) => news.find((n) => n.id === id) || null;

/* ---------- Regras ---------- */
/** Regulamento geral + secções oficiais vindas da Liga e dos requisitos de adesão (fonte única). */
export const getRules = () => {
  const extra = [];
  if (site.guildMembership) {
    extra.push({ id: 'adesao', title: 'Requisitos de adesão das guildas', rules: site.guildMembership.requirements.map((r) => `${r.title}: ${r.text}`) });
  }
  if (league.rules?.length) extra.push({ id: 'liga-salas', title: 'Liga Aliança — regras das salas', rules: league.rules });
  if (league.forfeitRules?.length) extra.push({ id: 'liga-perda', title: 'Liga Aliança — causas de perda do jogo', rules: league.forfeitRules });
  const ids = new Set(rules.sections.map((x) => x.id));
  return { ...rules, sections: [...extra.filter((x) => !ids.has(x.id)), ...rules.sections] };
};

/* ---------- Galeria ---------- */
/** Álbuns do gallery.json + álbum da Liga gerado a partir das rodadas. */
export const getGallery = () => {
  const s = getCurrentSeason();
  const leagueAlbum = {
    id: 'liga',
    title: `Liga Aliança — ${s.name}`,
    items: [
      ...[...(s.rounds || [])].sort(byDateAsc).map((r) => ({ id: r.id, title: r.title, image: r.image, thumb: r.thumb, date: r.date })),
      ...(league.documents || []).map((d) => ({ id: d.id, title: d.title, image: d.image })),
    ],
  };
  return [leagueAlbum, ...gallery];
};

/* ---------- Estatísticas (a partir dos dados) ---------- */
export const getStats = () => {
  const s = getCurrentSeason();
  const c = getCommunity();
  return [
    { id: 'members', value: c.members, label: 'Membros na comunidade' },
    { id: 'groups', value: c.groups, label: 'Grupos no WhatsApp' },
    { id: 'guilds', value: getStandings(s).length, label: 'Guildas na Liga' },
    { id: 'round', value: s.currentRound, label: `Rodada atual de ${s.totalRounds}` },
  ];
};
