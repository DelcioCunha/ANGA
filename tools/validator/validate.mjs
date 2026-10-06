#!/usr/bin/env node
/**
 * VALIDADOR DE CONTEÚDO — Aliança Nacional de Guildas Angolanas
 * Verifica: JSON válido, campos obrigatórios, IDs duplicados, datas,
 * formatos, referências quebradas e imagens inexistentes.
 * Uso: node tools/validator/validate.mjs   (corre também antes de cada build)
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const contentDir = join(root, 'content');
const publicDir = join(root, 'website', 'public');

const errors = [];
const warnings = [];
const err = (f, m) => errors.push(`✖ ${f}: ${m}`);
const warn = (f, m) => warnings.push(`⚠ ${f}: ${m}`);

function load(name) {
  const p = join(contentDir, name);
  if (!existsSync(p)) { err(name, 'ficheiro não encontrado'); return null; }
  try { return JSON.parse(readFileSync(p, 'utf8')); }
  catch (e) { err(name, `JSON inválido — ${e.message}`); return null; }
}

const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const isId = (s) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s);

function checkList(file, list, required, opts = {}) {
  if (!Array.isArray(list)) return err(file, 'deve ser uma lista');
  const seen = new Set();
  list.forEach((item, i) => {
    const where = `${file}[${i}]${item?.id ? ` (${item.id})` : ''}`;
    for (const k of required) if (item[k] === undefined || item[k] === '') err(where, `campo obrigatório em falta: "${k}"`);
    if (item.id) {
      if (!isId(item.id)) err(where, 'id deve usar minúsculas, números e hífens (ex.: dark-prime)');
      if (seen.has(item.id)) err(where, 'ID duplicado');
      seen.add(item.id);
    }
    if (item.date && !isDate(item.date)) err(where, `data inválida "${item.date}" (use AAAA-MM-DD)`);
    for (const k of ['image', 'logo']) checkAsset(where, item[k]);
    if (opts.status && item.status && !opts.status.includes(item.status)) err(where, `status inválido "${item.status}" (permitidos: ${opts.status.join(', ')})`);
    if (opts.each) opts.each(item, where);
  });
  return seen;
}

function checkAsset(where, path) {
  if (!path) return;
  if (/^https?:\/\//.test(path)) return;
  const clean = path.replace(/^\.?\//, '');
  if (!existsSync(join(publicDir, clean))) err(where, `imagem inexistente: ${path}`);
  if (!/\.(webp|png|jpe?g|svg|avif|gif|mp4|webm)$/i.test(path)) warn(where, `formato de imagem pouco comum: ${path}`);
}

const site = load('site.json');
const guilds = load('guilds.json');
const league = load('league.json');
const events = load('events.json');
const trophies = load('trophies.json');
const records = load('records.json');
const market = load('market.json');
const news = load('news.json');
const rules = load('rules.json');
const gallery = load('gallery.json');
const expelled = load('expelled-guilds.json');

if (site) {
  for (const k of ['name', 'tagline', 'founder', 'whatsapp', 'hero', 'nav']) if (!site[k]) err('site.json', `campo obrigatório em falta: "${k}"`);
  if (site.whatsapp && !/^\d{9,15}$/.test(site.whatsapp.number)) err('site.json', 'whatsapp.number deve ter só dígitos com indicativo (ex.: 244947976103)');
  site.social?.forEach((s) => s.active && !s.url && warn('site.json', `rede social "${s.id}" ativa mas sem URL`));
}

const guildIds = guilds
  ? checkList('guilds.json', guilds, ['id', 'name', 'description', 'status'], {
      status: ['active', 'inactive', 'hidden'],
      each: (g, w) => g.color && !/^#[0-9a-f]{6}$/i.test(g.color) && err(w, `cor inválida "${g.color}" (use #RRGGBB)`),
    })
  : new Set();

checkList('events.json', events, ['id', 'title', 'description', 'status'], {
  status: ['upcoming', 'live', 'past'],
  each: (e, w) => e.status !== 'upcoming' && !e.date && err(w, 'eventos a decorrer ou concluídos precisam de "date"'),
});

checkList('trophies.json', trophies, ['id', 'title', 'tier', 'event'], {
  each: (t, w) => {
    if (t.guild && !guildIds.has(t.guild)) err(w, `referência quebrada: guilda "${t.guild}" não existe`);
    if (!['legend', 'gold', 'silver', 'bronze'].includes(t.tier)) err(w, `tier inválido "${t.tier}"`);
  },
});

checkList('records.json', records, ['id', 'title', 'category', 'value', 'unit'], {
  each: (r, w) => r.guild && !guildIds.has(r.guild) && err(w, `referência quebrada: guilda "${r.guild}" não existe`),
});

checkList('news.json', news, ['id', 'title', 'date', 'excerpt', 'body'], {
  each: (n, w) => {
    if (!Array.isArray(n.body)) err(w, '"body" deve ser uma lista de parágrafos');
    checkAsset(w, n.thumb);
    if (n.video) { checkAsset(w, n.video.src); checkAsset(w, n.video.poster); }
  },
});

if (league) {
  checkAsset('league.json', league.banner);
  league.documents?.forEach((d) => checkAsset(`league.json:documents (${d.id})`, d.image));
  const seasonIds = checkList('league.json:seasons', league.seasons, ['id', 'name', 'status', 'standings'], {
    each: (s, w) => {
      s.standings?.forEach((r, i) => {
        if (r.guildId && !guildIds.has(r.guildId)) err(w, `tabela linha ${i + 1}: guilda "${r.guildId}" não existe em guilds.json`);
        for (const k of ['points', 'played', 'wins', 'losses']) if (typeof r[k] !== 'number') err(w, `tabela linha ${i + 1} (${r.team}): "${k}" deve ser um número`);
      });
      if (s.currentRound && s.totalRounds && s.currentRound > s.totalRounds) err(w, 'currentRound maior que totalRounds');
      checkList(`${w}:rounds`, s.rounds || [], ['id', 'round', 'phase', 'date', 'image', 'title'], {
        each: (r, rw) => {
          checkAsset(rw, r.thumb);
          if (!['inicio', 'fim'].includes(r.phase)) err(rw, `phase deve ser "inicio" ou "fim"`);
        },
      });
    },
  });
  if (!seasonIds?.has(league.currentSeason)) err('league.json', `currentSeason "${league.currentSeason}" não existe em seasons`);
}

if (market) {
  checkAsset('market.json', market.logo);
  checkList('market.json:priceGroups', market.priceGroups, ['id', 'title', 'items'], {
    each: (g, w) => g.items.forEach((it) => {
      if (!it.name) err(w, 'produto sem nome');
      if (typeof it.price !== 'number' || it.price <= 0) err(w, `preço inválido em "${it.name}" (use só o número, ex.: 1200)`);
    }),
  });
  market.badges?.holders?.forEach((h) => h.badges.forEach((b) => checkAsset(`market.json:selos (${h.name})`, b)));
  market.badges?.poster && checkAsset('market.json:badges', market.badges.poster);
  market.testimonials?.forEach((t) => checkAsset(`market.json:testimonials (${t.id})`, t.image));
  market.proofs?.forEach((t) => checkAsset(`market.json:proofs (${t.id})`, t.image));
  if (market.video) { checkAsset('market.json:video', market.video.src); checkAsset('market.json:video', market.video.poster); }
}
if (expelled) checkList('expelled-guilds.json', expelled, ['id', 'name', 'logo', 'status'], {
  status: ['expelled', 'extinct'],
  each: (g, w) => {
    for (const k of ['groupCreated', 'recorded']) if (g[k] && !isDate(g[k])) err(w, `data inválida em "${k}"`);
    if (guildIds.has(g.id)) err(w, 'esta guilda também está em guilds.json (ativa) — remove-a de um dos dois ficheiros');
  },
});
if (gallery) gallery.forEach((a) => checkList(`gallery.json:${a.id}`, a.items, ['id', 'title', 'image']));
if (site) {
  checkAsset('site.json', site.logo);
  checkAsset('site.json', site.logoSmall);
  site.about?.halls?.forEach((h) => checkAsset('site.json:halls', h.image));
  checkAsset('site.json:inauguration', site.about?.inauguration?.image);
  checkAsset('site.json:community', site.community?.profileImage);
  checkAsset('site.json:founder', site.founder?.photo);
}
if (rules) checkList('rules.json:sections', rules.sections, ['id', 'title', 'rules']);

const examples = [guilds, events, trophies, records, news].flat().filter((x) => x?.example).length;
if (examples) warn('conteúdo', `${examples} item(s) ainda marcados como "example": true`);

console.log('\n🛡  Validação de conteúdo — Aliança\n');
warnings.forEach((w) => console.log(w));
errors.forEach((e) => console.log(e));
if (errors.length) {
  console.log(`\n${errors.length} erro(s). Corrige antes de publicar.\n`);
  process.exit(1);
}
console.log(`\n✔ Conteúdo válido${warnings.length ? ` (${warnings.length} aviso(s))` : ''}.\n`);
