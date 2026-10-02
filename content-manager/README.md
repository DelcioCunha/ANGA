# Aliança Content Manager (Fase 06)

Aplicação desktop para a administração editar o conteúdo sem tocar em código.

Plano da primeira versão:
- Editores por secção: Site, Guildas, Eventos, Troféus, Recordes, Liga, Mercado, Notícias, Regras.
- Gestão de imagens (copia para `website/public/assets/...` com o nome padronizado).
- Validação com as mesmas regras de `tools/validator`.
- Botão "Exportar / Atualizar Website" → grava `content/*.json` e corre `npm run build`.
- Funciona offline.

Tecnologia sugerida: Electron (ou Tauri) + React, reutilizando o Design System do website.

Até lá, o conteúdo edita-se diretamente nos ficheiros `content/*.json` (ver `docs/content-structure.md`).
