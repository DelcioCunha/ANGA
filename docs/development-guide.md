# Guia de Desenvolvimento

## Adicionar uma página nova
1. Criar `src/pages/NomeDaPagina/NomeDaPagina.jsx`.
2. Usar `PageHeader` no topo e `useReveal()` no contentor para as animações.
3. Registar a rota em `src/App.jsx`.
4. Adicionar a entrada ao menu em `content/site.json` → `nav`.

## Adicionar um tipo de conteúdo novo
1. Criar `content/novo.json`.
2. Importar e expor no `contentService.js` (`getNovo()`).
3. Adicionar regras ao validador.
4. Documentar em `docs/content-structure.md`.

## Imagens
- Formato preferido: `.webp`, comprimido (logos ~256×256, capas 1600×800).
- Nomes: `angomonarcas-logo.webp`, `liga-ff-2026-banner.webp`, `trofeu-jornada-20.webp`.
- Pastas: `public/assets/{branding,guilds,events,trophies,records,market,news,backgrounds}`.

## Convenções
- Componentes recebem dados por props; nunca texto fixo de conteúdo.
- Cores e espaçamentos só via tokens CSS.
- Antes de publicar: `npm run build` (inclui validação).
