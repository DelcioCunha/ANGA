# Arquitetura — V1

```
content/*.json ──► services/contentService.js ──► components ──► pages ──► vite build ──► site/
                         ▲
                         └── V2: trocar a implementação por chamadas a uma API
```

- **Sem backend, sem base de dados.** O build produz HTML/CSS/JS estáticos.
- **Build autónomo**: `vite-plugin-singlefile` embute JS e CSS no `site/index.html`, por isso abre
  por duplo clique (`file://`) e funciona igual em qualquer alojamento. Imagens ficam em `site/assets/`
  com caminhos relativos (helper `asset()` em `utils/format.js`).
- **HashRouter** (`/#/rota`): funciona em qualquer alojamento estático.
- **Alias `@content`** (vite.config.js) aponta para `../content`, a fonte única que o
  futuro Content Manager vai escrever.
- **Content Service** é a camada intermédia pedida na secção 20 do documento técnico:
  os componentes chamam `getGuilds()`, `getEvents()`… e não sabem de onde vêm os dados.
- **Validador** (`tools/validator/validate.mjs`) corre antes de cada `npm run build`
  e bloqueia a publicação se houver JSON inválido, IDs duplicados, datas inválidas,
  imagens inexistentes ou referências quebradas.
- **Contacto**: todos os CTAs geram links `wa.me` com mensagem pré-preenchida
  (entrar, filiar guilda, mercado, recorde, dúvida de regras, formulário de contacto).
  Nada é guardado no site.

## Migração para V2 (resumo)
1. Criar API (ex.: Node/Express ou Supabase) com os mesmos modelos.
2. Tornar as funções do contentService assíncronas (`async`) e adicionar um hook `useContent`.
3. Os componentes continuam a receber os mesmos objetos.
