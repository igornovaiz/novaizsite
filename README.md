# igornovaiz.com.br

Site pessoal do Igor Novaiz: blog, trabalho e atalho para o Doutor Drive. Servido pelo GitHub Pages a partir da raiz da branch `main`.

## Escrever um texto novo

1. Crie `posts/nome-do-texto.md` com o cabeçalho:

   ```
   ---
   titulo: Título do texto
   data: 2026-11-05
   resumo: Uma frase que aparece na lista e no Google.
   ---

   Texto em Markdown aqui.
   ```

   Para guardar sem publicar, adicione `rascunho: sim` no cabeçalho.

2. Rode `npm install` (só na primeira vez) e depois `npm run build`.
3. Faça commit de tudo e push. O endereço do texto fica `/blog/nome-do-texto/`.

## Mudar links, "Agora" e "Trabalho"

Tudo isso fica em `site.config.mjs`. Um negócio novo é só mais um item em `trabalho`; com `url`, ele ganha botão. Depois de mudar, rode `npm run build`.
