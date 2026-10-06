# Estrutura de Conteúdo

Todos os ficheiros vivem em `content/`. O website lê-os através de
`website/src/services/contentService.js` — nenhum componente lê JSON diretamente.

Regras gerais (verificadas pelo validador):

- `id`: minúsculas, números e hífens (`dark-prime`, `liga-ff-t1-abertura`). Único em cada ficheiro.
- Datas: `AAAA-MM-DD` (ex.: `2026-10-20`).
- Imagens: caminho a partir de `website/public` (ex.: `/assets/guilds/dark-prime-logo.webp`). Vazio = arte automática.
- `example: true` mostra a etiqueta "Exemplo" no site.

## Tarefas mais comuns

### Atualizar a tabela da Liga
`content/league.json` → `seasons[0].standings`. Cada linha:
`{ "team": "NOME", "guildId": "id-da-guilda", "points": 45, "played": 19, "wins": 15, "losses": 4, "roomsWon": 48 }`.
A tabela aparece **pela ordem em que está no ficheiro** (igual à app oficial da Liga).
Atualiza também `standingsUpdated` (data) e `currentRound`.

### Publicar uma rodada nova
1. Guarda o cartaz em `website/public/assets/league/rodadas/r21-inicio.webp` (e uma miniatura de ~360px
   de largura em `rodadas/mini/r21-inicio.webp`; se não houver miniatura, apaga a linha `thumb`).
2. Acrescenta a `seasons[0].rounds`:
   `{ "id": "r21-inicio", "round": "21", "phase": "inicio", "date": "2026-10-10", "image": "/assets/league/rodadas/r21-inicio.webp", "thumb": "/assets/league/rodadas/mini/r21-inicio.webp", "title": "Rodada 21 começou", "text": "" }`
   `phase` é `inicio` ou `fim`. A rodada aparece na Liga, no “Último anúncio” da página inicial e na Galeria.

### Publicar uma notícia
1. Recorta a imagem do comunicado (sem números de telefone) e guarda-a em `website/public/assets/news/<id>.webp`.
   Opcional: uma miniatura de ~420px em `assets/news/mini/<id>.webp` (campo `thumb`).
2. Acrescenta a `content/news.json`:
   `{ "id": "titulo-curto", "title": "...", "date": "2026-10-10", "category": "Liga", "image": "/assets/news/titulo-curto.webp", "thumb": "/assets/news/mini/titulo-curto.webp", "excerpt": "Resumo de uma frase.", "body": ["Parágrafo 1", "Parágrafo 2"], "featured": false, "example": false }`
   Categorias usadas: Aliança, Liga, Torneios, Parcerias, Mercado. Vídeo opcional:
   `"video": { "src": "/assets/news/video.mp4", "poster": "/assets/news/titulo-curto.webp" }` e `"credit": "Vídeo: …"`.
3. Não precisas de ordenar: o site mostra sempre a notícia mais recente primeiro (a mais recente fica em destaque),
   agrupada por mês.

### Entregar um selo a um cliente
`content/market.json` → `badges.holders`. Adiciona a imagem do selo em `assets/market/selos/`
e acrescenta-a à lista `badges` do cliente (do nível mais baixo para o mais alto); atualiza `level`.
**Antes de publicar, oculta o número de telefone do cliente na imagem.**

### Mudar preços
`content/market.json` → `priceGroups[].items[]`: `{ "name": "...", "detail": "opcional", "price": 1200 }`.
O preço é só o número (sem “Kz” nem pontos). Atualiza `pricesUpdated`.

### Expulsar uma guilda
1. Remove-a de `content/guilds.json` (e da tabela da Liga, se lá estiver).
2. Guarda só o logo (sem capturas com nomes ou números) em `website/public/assets/guilds/expulsas/<id>.webp`.
3. Acrescenta a `content/expelled-guilds.json`:
   `{ "id": "nome-da-guilda", "name": "NOME", "logo": "/assets/guilds/expulsas/nome-da-guilda.webp", "groupCreated": "2026-01-31", "recorded": "2026-10-02", "members": 20, "status": "expelled", "reason": "" }`
   `status`: `expelled` (expulsa) ou `extinct` (expulsa e já extinta). `reason` é opcional (motivo curto).
O validador avisa se a guilda ainda estiver na lista das guildas ativas.

### Números da comunidade
`content/site.json` → `community.members` e `community.groups`.

## guilds.json

| Campo | Obrigatório | Notas |
|---|---|---|
| id, name, description, status | sim | status: `active`, `inactive` ou `hidden` (não aparece) |
| tag | não | sigla da guilda (ex.: AGM) |
| logo | não | sem logo → brasão com a tag |
| color | não | `#RRGGBB`, cor de destaque da guilda |
| motto, leader, founded, members | não | aparecem no modal da guilda |
| featured | não | `true` → aparece na Home |
| founding | não | `true` → selo "Fundadora" |

## events.json

`id, title, date, description, status` obrigatórios. `status`: `upcoming`, `live` ou `past`.
Opcionais: `time`, `category` (Liga/Torneio/Comunidade…), `image`, `prize`.

## trophies.json

`id, title, tier, event` obrigatórios. `tier`: `legend`, `gold`, `silver`, `bronze`.
`guild` tem de ser o `id` de uma guilda existente. `vacant: true` = troféu por conquistar.

## records.json

`id, title, category, value, unit` obrigatórios. `holder` (jogador), `guild` (id), `event`, `date`.
`vacant: true` = recorde em aberto.

## league.json

- `currentSeason`: id da temporada mostrada por defeito. `banner`: imagem do topo da página da Liga.
- `format`, `rules`: listas simples. `scoring.win`: pontos por jogo ganho.
- `documents`: capturas oficiais (regras, tabela) mostradas na página da Liga.
- `seasons[]`: `currentRound`, `totalRounds`, `phase`, `start`, `standingsUpdated`, `standings[]`, `rounds[]`.

## news.json

`id, title, date, excerpt, body` obrigatórios. `body` é uma lista de parágrafos.
`featured: true` destaca a notícia na página de Notícias. O artigo fica em `/#/noticias/<id>`.

## market.json

`priceGroups` (tabela de preços), `badges` (programa de selos: `levels`, `holders`), `testimonials`, `proofs`,
`video`, `sellers`, `guarantees`, `howItWorks`, `safety`.

## gallery.json

Álbuns `{ id, title, items: [{ id, title, image }] }`. O álbum da Liga é criado automaticamente a partir das rodadas.

## site.json

Identidade, `logo`, `slogans`, `community` (membros, grupos), `about` (história, inauguração, salões), contacto WhatsApp e mensagens pré-preenchidas, redes sociais
(`active: true` + `url` para aparecerem), textos do hero, "Sobre", "Como participar" e menu.

## Estatísticas da Home

São calculadas a partir dos dados: membros e grupos (`site.json`), equipas na tabela e rodada atual (`league.json`).
Não há números escritos à mão.
