import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';

// O conteúdo vive em ../content (fonte única, editada pelo Content Manager).
const contentDir = fileURLToPath(new URL('../content', import.meta.url));

/**
 * O build gera ../site/ :
 *   site/index.html  → todo o JS/CSS embutido (abre com duplo clique, sem servidor)
 *   site/assets/...  → imagens copiadas de public/
 * A mesma pasta pode ser publicada tal como está em qualquer alojamento estático.
 */
/**
 * No index.html-fonte existe um aviso para quem o abre diretamente.
 * No build esse aviso é trocado por um ecrã de carregamento com a marca
 * (e uma mensagem caso o JavaScript esteja desativado).
 */
const buildSplash = {
  name: 'alianca-build-splash',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace(
      /<!--SOURCE-NOTICE-START-->[\s\S]*?<!--SOURCE-NOTICE-END-->/,
      `<div style="min-height:100vh;display:grid;place-items:center;background:#06070d;color:#eef0ff;font-family:system-ui,sans-serif;text-align:center;padding:24px">
        <div>
          <div style="font-weight:700;letter-spacing:.2em;font-size:22px">ALIANÇA</div>
          <div style="opacity:.6;font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-top:6px">Nacional de Guildas Angolanas</div>
          <noscript><p style="margin-top:20px;max-width:420px">Este website precisa de JavaScript. Ativa o JavaScript no navegador para continuar.</p></noscript>
        </div>
      </div>`
    );
  },
};

export default defineConfig({
  base: './',
  plugins: [react(), buildSplash, viteSingleFile({ removeViteModuleLoader: true })],
  resolve: {
    alias: { '@content': contentDir },
  },
  server: { fs: { allow: ['..'] }, open: true },
  preview: { open: true },
  build: {
    outDir: '../site',
    emptyOutDir: true,
  },
});
