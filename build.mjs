// Gera o site a partir de site.config.mjs e dos textos em posts/*.md.
// Uso: npm run build  (os arquivos gerados são commitados; o GitHub Pages serve a raiz)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import { marked } from "marked";
import cfg from "./site.config.mjs";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const dataCurta = (iso) => {
  const [a, m, d] = iso.split("-");
  return `${Number(d)} ${MESES[Number(m) - 1]} ${a}`;
};

// Front matter simples: linhas "chave: valor" entre dois "---".
function lerPost(arquivo) {
  const bruto = readFileSync(`posts/${arquivo}`, "utf8").replace(/\r\n/g, "\n");
  const m = bruto.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`posts/${arquivo}: falta o cabeçalho entre ---`);
  const meta = Object.fromEntries(
    m[1].split("\n").filter(Boolean).map((l) => {
      const i = l.indexOf(":");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"(.*)"$/, "$1")];
    })
  );
  for (const k of ["titulo", "data"]) if (!meta[k]) throw new Error(`posts/${arquivo}: falta "${k}"`);
  return { ...meta, slug: arquivo.replace(/\.md$/, ""), html: marked.parse(m[2]) };
}

const posts = readdirSync("posts")
  .filter((f) => f.endsWith(".md"))
  .map(lerPost)
  .filter((p) => p.rascunho !== "sim")
  .sort((a, b) => b.data.localeCompare(a.data));

// Ícones (traço, 24x24)
const ICONES = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  externo: '<path d="M7 17 17 7M8 7h9v9"/>',
  cnh: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.6-1.4 1.7-2 3-2s2.4.6 3 2M14 10h4M14 13h3"/>',
  sistema: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  novo: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  gestao: '<path d="M3 20h18M6 16V10M11 16V6M16 16v-4M20 16V8"/>',
  codigo: '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/>',
  conversa: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  LinkedIn: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  GitHub: '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
};
const ic = (nome) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[nome]}</svg>`;

const iconeMarca = `<svg class="marca-icone" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#2563eb"/><path d="M10 23V9l12 14V9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function pagina({ titulo, descricao, caminho, atual, corpo }) {
  const tituloCompleto = titulo ? `${titulo} | ${cfg.nome}` : `${cfg.nome} | Negócios e tecnologia`;
  const link = (href, nome, extra = "") =>
    `<a class="lnk ${extra}" href="${href}"${atual === href ? ' aria-current="page"' : ""}>${nome}</a>`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tituloCompleto)}</title>
<meta name="description" content="${esc(descricao || cfg.descricao)}">
<link rel="canonical" href="${cfg.url}${caminho}">
<meta property="og:title" content="${esc(tituloCompleto)}">
<meta property="og:description" content="${esc(descricao || cfg.descricao)}">
<meta property="og:url" content="${cfg.url}${caminho}">
<meta property="og:locale" content="pt_BR">
<meta name="theme-color" content="#05070c">
<link rel="icon" href="/assets/icone.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="Blog de ${esc(cfg.nome)}" href="/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
<script>document.documentElement.classList.add("js")</script>
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo" id="topo">
  <div class="miolo">
    <a class="marca" href="/">${iconeMarca}${esc(cfg.nome)}</a>
    <nav aria-label="Principal">${link("/#projetos", "Projetos", "some")}${link("/blog/", "Blog")}${link("/#contato", "Contato")}</nav>
  </div>
</header>
<main id="conteudo">
${corpo}
</main>
<footer class="rodape">
  <div class="miolo">
    <span>© ${new Date().getFullYear()} ${esc(cfg.nome)}. São Paulo, Brasil.</span>
    <span><a href="/blog/">Blog</a> · <a href="/feed.xml">RSS</a> · <a href="mailto:${cfg.email}">${cfg.email}</a></span>
  </div>
</footer>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

const cardsPosts = (lista) =>
  `<div class="cards-posts">${lista
    .map(
      (p, i) => `
  <a class="card-post revela" style="--atraso:${i * 0.08}s" href="/blog/${p.slug}/">
    <time datetime="${p.data}">${dataCurta(p.data)}</time>
    <h3>${esc(p.titulo)}</h3>
    <p>${esc(p.resumo || "")}</p>
    <span class="ler">Ler texto ${ic("seta")}</span>
  </a>`
    )
    .join("")}
</div>`;

// Página inicial
const [t1, t2, t3] = cfg.trabalho;
const no = (t, classe) => {
  const conteudo = `<span class="ic">${ic(t.icone || "novo")}</span><span>${esc(t.nome)}<small>${esc(t.papel)}</small></span>`;
  const cls = `no ${classe}${t.status === "em-breve" ? " breve" : ""}`;
  return t.url ? `<a class="${cls}" href="${t.url}">${conteudo}</a>` : `<div class="${cls}">${conteudo}</div>`;
};

const home = `
<section class="hero">
  <div class="brilho" aria-hidden="true"></div>
  <div class="miolo">
    <div class="hero-texto">
      <span class="selo"><span class="ponto"></span>${esc(cfg.hero.selo)}</span>
      <h1>${cfg.hero.titulo}</h1>
      <p class="sub">${esc(cfg.hero.sub)}</p>
      <div class="acoes">
        <a class="btn btn-azul" href="#projetos">Ver meus projetos ${ic("seta")}</a>
        <a class="btn btn-borda" href="/blog/">Ler o blog</a>
      </div>
    </div>
    <div class="mapa" aria-label="Igor no centro, ligado a ${cfg.trabalho.map((t) => t.nome).join(", ")}">
      <svg class="linhas" viewBox="0 0 400 400" aria-hidden="true">
        <circle class="orbita" cx="200" cy="200" r="164"/>
        <path class="rota" d="M200 200 L200 36"/><path class="rota" d="M200 200 L304 280"/><path class="rota" d="M200 200 L96 280"/>
        <path class="pulso" pathLength="100" d="M200 200 L200 36"/>
        <path class="pulso p2" pathLength="100" d="M200 200 L304 280"/>
        <path class="pulso p3" pathLength="100" d="M200 200 L96 280"/>
      </svg>
      <div class="no centro" style="left:50%;top:50%">IN</div>
      ${no(t1, "n1")}
      ${no(t2, "n2")}
      ${t3 ? no(t3, "n3") : ""}
    </div>
  </div>
</section>

<section class="secao secao-clara" aria-labelledby="t-faco">
  <div class="miolo">
    <div class="cab revela">
      <h2 id="t-faco">O que eu faço</h2>
      <p>Três frentes que se completam: tocar a operação, construir a tecnologia e conversar com quem compra.</p>
    </div>
    <div class="fazeres">${cfg.faco
      .map(
        (f, i) => `
      <article class="fazer revela" style="--atraso:${i * 0.08}s">
        <div class="ic">${ic(f.icone)}</div>
        <h3>${esc(f.titulo)}</h3>
        <p>${esc(f.texto)}</p>
      </article>`
      )
      .join("")}
    </div>
  </div>
</section>

<section class="secao secao-gelo" id="projetos" aria-labelledby="t-projetos">
  <div class="miolo">
    <div class="cab revela">
      <h2 id="t-projetos">Projetos</h2>
      <p>Onde eu estou trabalhando agora e o que vem por aí.</p>
    </div>
    <div class="projetos">${cfg.trabalho
      .map(
        (t, i) => `
      <article class="projeto revela${t.destaque ? " destaque" : ""}${t.status === "em-breve" ? " breve" : ""}" style="--atraso:${i * 0.08}s">
        <span class="status">${t.status === "em-breve" ? "Em construção" : "Ativo"}</span>
        <h3>${esc(t.nome)}</h3>
        <span class="papel">${esc(t.papel)}</span>
        <p>${esc(t.texto)}</p>
        ${t.url ? `<a class="btn ${t.destaque ? "btn-azul" : "btn-borda"}" href="${t.url}">${esc(t.acao || "Visitar o site")} ${ic("externo")}</a>` : ""}
      </article>`
      )
      .join("")}
    </div>
  </div>
</section>

<section class="secao" aria-labelledby="t-agora">
  <div class="miolo agora">
    <div class="cab revela">
      <h2 id="t-agora">Agora</h2>
      <p>No que estou focado neste momento.</p>
      <p class="data">Atualizado em ${dataCurta(cfg.agora.atualizado)}</p>
    </div>
    <ul>${cfg.agora.itens.map((i, n) => `<li class="revela" style="--atraso:${n * 0.08}s">${ic("check")}<span>${esc(i)}</span></li>`).join("")}</ul>
  </div>
</section>

<section class="secao" style="padding-top:0" aria-labelledby="t-blog">
  <div class="miolo">
    <div class="cab-linha">
      <div class="cab revela">
        <h2 id="t-blog">Do blog</h2>
        <p>Negócios, tecnologia e o que eu aprendo no caminho.</p>
      </div>
      ${posts.length > 3 ? `<a class="btn btn-borda revela" href="/blog/" style="margin-bottom:3rem">Ver todos os textos</a>` : ""}
    </div>
    ${posts.length ? cardsPosts(posts.slice(0, 3)) : `<p class="vazio">O primeiro texto sai em breve.</p>`}
  </div>
</section>

<section class="secao" style="padding-top:0" id="contato" aria-labelledby="t-contato">
  <div class="miolo">
    <div class="contato revela">
      <div style="position:relative;z-index:1">
        <h2 id="t-contato">Vamos conversar?</h2>
        <p>Parcerias, projetos, uma ideia de negócio ou só trocar experiência. Respondo por e-mail.</p>
      </div>
      <div class="lado">
        <a class="btn btn-branco" href="mailto:${cfg.email}">${ic("email")} ${cfg.email}</a>
        <div class="redes">${cfg.redes.map((r) => `<a href="${r.url}" aria-label="${esc(r.nome)}">${ic(r.nome)}</a>`).join("")}</div>
      </div>
    </div>
  </div>
</section>`;

writeFileSync("index.html", pagina({ caminho: "/", corpo: home }));

// Blog
rmSync("blog", { recursive: true, force: true });
mkdirSync("blog", { recursive: true });
writeFileSync(
  "blog/index.html",
  pagina({
    titulo: "Blog",
    descricao: `Textos de ${cfg.nome} sobre negócios, tecnologia e o que aprendo no caminho.`,
    caminho: "/blog/",
    atual: "/blog/",
    corpo: `<section class="blog-hero"><div class="brilho" aria-hidden="true"></div><div class="miolo"><h1>Blog</h1><p class="resumo">Negócios, tecnologia e o que eu aprendo no caminho.</p></div></section>
<div class="miolo lista-blog">${posts.length ? cardsPosts(posts) : `<p class="vazio">O primeiro texto sai em breve.</p>`}</div>`,
  })
);

for (const p of posts) {
  mkdirSync(`blog/${p.slug}`, { recursive: true });
  writeFileSync(
    `blog/${p.slug}/index.html`,
    pagina({
      titulo: p.titulo,
      descricao: p.resumo,
      caminho: `/blog/${p.slug}/`,
      atual: "/blog/",
      corpo: `<article>
  <header class="blog-hero"><div class="brilho" aria-hidden="true"></div><div class="miolo">
    <time datetime="${p.data}">${dataCurta(p.data)}</time>
    <h1>${esc(p.titulo)}</h1>
    ${p.resumo ? `<p class="resumo">${esc(p.resumo)}</p>` : ""}
  </div></header>
  <div class="leitura"><div class="miolo">
    <div class="texto">${p.html}</div>
    <a class="btn btn-azul" href="/blog/">Ver todos os textos</a>
  </div></div>
</article>`,
    })
  );
}

// 404
writeFileSync(
  "404.html",
  pagina({
    titulo: "Página não encontrada",
    caminho: "/404.html",
    corpo: `<section class="blog-hero" style="min-height:55vh"><div class="brilho" aria-hidden="true"></div><div class="miolo"><h1>Esta página não existe</h1><p class="resumo">O endereço pode ter mudado.</p><div class="acoes" style="margin-top:2rem"><a class="btn btn-azul" href="/">Ir para o início</a><a class="btn btn-borda" href="/blog/">Ver o blog</a></div></div></section>`,
  })
);

// RSS
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(cfg.nome)}</title><link>${cfg.url}/blog/</link><description>${esc(cfg.descricao)}</description><language>pt-BR</language>
${posts
  .map(
    (p) =>
      `<item><title>${esc(p.titulo)}</title><link>${cfg.url}/blog/${p.slug}/</link><guid>${cfg.url}/blog/${p.slug}/</guid><pubDate>${new Date(
        p.data + "T12:00:00-03:00"
      ).toUTCString()}</pubDate><description>${esc(p.resumo || "")}</description></item>`
  )
  .join("\n")}
</channel></rss>
`;
writeFileSync("feed.xml", rss);

if (!existsSync(".nojekyll")) writeFileSync(".nojekyll", "");
console.log(`Pronto: página inicial, ${posts.length} texto(s) no blog, 404 e feed.`);
