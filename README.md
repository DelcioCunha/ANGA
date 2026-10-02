# Aliança Nacional de Guildas Angolanas — Website V1

Website oficial da Aliança Nacional de Guildas Angolanas (comunidade de Free Fire).
Fundador: **Delcio Cunha** · WhatsApp oficial: **+244 947 976 103**

React + Vite · website estático · sem backend · conteúdo em JSON.

```
CONTEÚDO (content/*.json) → CONTENT SERVICE → COMPONENTES → PÁGINAS → BUILD → WEBSITE
```

## Começar

**Ver o site já:** abre `site/index.html` com duplo clique. Não precisa de servidor nem de instalação.

> `website/index.html` é o ficheiro-fonte do React — abri-lo diretamente mostra só um aviso.

Para editar e desenvolver é preciso o **Node.js 20+** (https://nodejs.org).

| Windows | Terminal (qualquer sistema) | O que faz |
|---|---|---|
| `1-INSTALAR.bat` | `cd website && npm install` | instala dependências (1ª vez) |
| `2-DESENVOLVER.bat` | `npm run dev` | modo de edição com atualização ao vivo |
| `3-GERAR-SITE.bat` | `npm run build` | valida o conteúdo e gera `site/` |
| — | `npm run validate` | só valida o conteúdo |
| — | `npm run preview` | serve a pasta `site/` localmente |

O build gera `site/index.html` com todo o JS e CSS embutidos (abre por duplo clique)
e `site/assets/` com as imagens. Para publicar, envia a pasta `site/` para qualquer
alojamento estático (Netlify, Vercel, GitHub Pages, Cloudflare Pages, cPanel…).
As rotas usam `#/` (ex.: `index.html#/guildas`), por isso funcionam em qualquer lado.

## Publicar no GitHub Pages

**Opção A — automática (recomendada).** O ficheiro `.github/workflows/deploy-pages.yml` valida o conteúdo,
gera `site/` e publica-o como raiz do website a cada `push` para a branch `main`.
1. Envia o projeto para o GitHub (a pasta `node_modules` é ignorada).
2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Faz um push (ou em **Actions → Publicar website → Run workflow**). O endereço aparece no fim da execução.

**Opção B — sem Actions.** Em **Settings → Pages → Source: Deploy from a branch**, escolhe `main` e a pasta
`/ (root)`. O `index.html` da raiz encaminha automaticamente para `site/index.html`.
Neste modo, lembra-te de correr `npm run build` (ou `3-GERAR-SITE.bat`) e enviar a pasta `site/` atualizada.

## Estrutura

```
alianca-nacional/
├── .github/workflows/       publicação automática no GitHub Pages
├── index.html               encaminha para site/ (GitHub Pages pela raiz)
├── site/                    ← WEBSITE PRONTO (gerado pelo build — abrir index.html)
├── content/                 ← TODO o texto e dados do site (editar aqui)
│   ├── site.json            identidade, contactos, hero, sobre, como participar, menu
│   ├── guilds.json          guildas
│   ├── league.json          Liga FF: formato, mapas, pontuação, regras, temporadas
│   ├── events.json          eventos
│   ├── trophies.json        Salão de Troféus
│   ├── records.json         Recordes dos Monarcas
│   ├── market.json          Mercado da Aliança
│   ├── news.json            notícias
│   ├── gallery.json         álbuns da galeria
│   ├── expelled-guilds.json registo das guildas expulsas
│   └── rules.json           regulamento
├── website/
│   ├── public/assets/       imagens (branding, guilds, events, trophies, …)
│   └── src/
│       ├── services/contentService.js   única porta de acesso aos dados
│       ├── components/      common · navigation · cards · sections · effects
│       ├── layouts/         MainLayout (navbar, footer, WhatsApp flutuante)
│       ├── pages/           Home, About, Guilds, League, Events, Trophies,
│       │                    Records, Market, News (+ artigo), Rules, Contact
│       ├── hooks/ utils/ styles/
│       └── App.jsx          rotas
├── tools/validator/         validador de conteúdo
├── content-manager/         (Fase 06) aplicação desktop
└── docs/                    arquitetura, conteúdo, design system, guia
```

## Atualizar conteúdo (resumo)

1. Edita o ficheiro certo em `content/`.
2. Coloca imagens em `website/public/assets/<pasta>/` e referencia como
   `/assets/<pasta>/nome.webp` (ou deixa vazio — o site gera brasões e capas automaticamente).
3. Corre `npm run validate`. Corrige os erros que aparecerem.
4. `npm run build` (ou `3-GERAR-SITE.bat`) e publica a pasta `site/`.

Tarefas do dia a dia (nova rodada, tabela, selos, preços) estão explicadas passo a passo em
[`docs/content-structure.md`](docs/content-structure.md#tarefas-mais-comuns).

**Privacidade:** nas capturas de conversas e nos selos de clientes, os números de telefone
dos clientes foram desfocados. Faz o mesmo com cada imagem nova antes de a publicar.

Mais detalhes em [`docs/content-structure.md`](docs/content-structure.md).
