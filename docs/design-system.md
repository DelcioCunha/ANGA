# Design System — Aliança

Direção: **gaming + competição + comunidade + tecnologia + identidade angolana**, tirada dos materiais
reais da ANGA: brasão vermelho/preto com coroa, cartazes da Liga em fogo e roxo, selos dourados do Mercado.
Fundo preto quente, dourado como destaque, roxo (nível 2 / cartazes recentes) e fogo (nível 3 / cartazes da Liga).

Tokens: `website/src/styles/global.css` (`:root`).

## Cores
| Token | Uso |
|---|---|
| `--bg`, `--bg-2`, `--bg-3` | fundos (do mais escuro ao mais claro) |
| `--accent`, `--accent-2`, `--grad-brand` | destaque principal (dourado → fogo), botões, títulos |
| `--grad-gold` | selo nível 1, troféus, mercado |
| `--violet`, `--grad-purple` | selo nível 2 |
| `--fire`, `--grad-fire` | selo nível 3 |
| `--red` | vermelho angolano (faixa, alertas) |
| WhatsApp verde | só em ações de contacto |

## Tipografia
- Display: **Chakra Petch** (títulos em maiúsculas, botões, números)
- Texto: **Inter**
- Classes: `.display`, `.h1`, `.h2`, `.h3`, `.lead`, `.eyebrow`, `.muted`

## Componentes
`Button` (primary · whatsapp · gold · ghost; `to`, `href` ou `whatsapp`), `Badge`/`StatusBadge`/`ExampleBadge`,
`SectionHeader`, `PageHeader`, `Emblem`, `GuildCrest`, `Modal`, `EmptyState`, `Icon`,
`Lightbox` / `ImageGrid` (galerias com deslizar), `RoundsTimeline`, `Standings`,
mercado: `PriceTable`, `BadgeLadder`, `BadgeHolders`, `Testimonials`, `VideoProof`,
cards: `GuildCard`, `EventCard`, `TrophyCard`, `RecordCard`, `NewsCard`, `StatCard`.

## Movimento
- `data-reveal` + `useReveal()`: entrada suave ao rolar; conteúdo sempre visível em repouso.
- Atraso escalonado com `style={{ '--d': '80ms' }}`.
- Tudo respeita `prefers-reduced-motion`.

## Responsividade
Mobile primeiro. Gutter `clamp(16px, 4vw, 40px)`. Grelhas `auto-fill` — sem breakpoints fixos
por página. Menu completo em ecrã inteiro no telemóvel; links principais na barra a partir de 1100px.
