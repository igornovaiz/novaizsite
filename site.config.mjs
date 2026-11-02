// Dados que aparecem no site. Para mudar um link ou texto curto, mude aqui e rode `npm run build`.
export default {
  nome: "Igor Novaiz",
  url: "https://igornovaiz.com.br",
  descricao:
    "Igor Novaiz: empreendedor em São Paulo. Toco a CNH em Dia, criei o Doutor Drive e escrevo sobre negócios, tecnologia e o que aprendo no caminho.",
  email: "novaizigor@gmail.com",
  redes: [
    { nome: "Instagram", url: "https://instagram.com/igornovaiz" },
    { nome: "LinkedIn", url: "https://linkedin.com/in/igornovaiz" },
    { nome: "GitHub", url: "https://github.com/igornovaiz" },
  ],
  hero: {
    selo: "Empreendedor em São Paulo",
    // Pode ter HTML: o trecho em <span class="azul"> sai em azul.
    titulo: 'Eu construo negócios <span class="azul">e a tecnologia que faz eles rodarem.</span>',
    sub: "Toco a CNH em Dia, criei o Doutor Drive e escrevo sobre negócios, tecnologia e o que aprendo no caminho.",
  },
  faco: [
    {
      icone: "gestao",
      titulo: "Gestão de negócios",
      texto: "Operação, financeiro, equipe e prazos. Faço a empresa funcionar no dia a dia, com processo e número na mão.",
    },
    {
      icone: "codigo",
      titulo: "Tecnologia",
      texto: "Sistemas sob medida para o negócio: vendas, documentos, contratos e painéis, tudo integrado e no ar.",
    },
    {
      icone: "conversa",
      titulo: "Vendas e atendimento",
      texto: "Comunicação clara e negociação. Sei vender, treinar quem vende e cuidar do cliente depois da venda.",
    },
  ],
  // Cada item vira um card em "Projetos" e um ponto no mapa do topo (os três primeiros).
  trabalho: [
    {
      nome: "CNH em Dia Soluções",
      papel: "Sócio e gestor",
      texto: "Defesa de multas, suspensão e cassação da CNH. A operação que eu toco no dia a dia, do comercial ao jurídico.",
      url: "",
      status: "ativo",
    },
    {
      nome: "Doutor Drive",
      papel: "Criei e mantenho",
      texto: "Sistema de gestão para empresas de direito de trânsito: vendas, prazos jurídicos, documentos e contratos num lugar só.",
      url: "https://www.doutordrive.com.br",
      acao: "Entrar no sistema",
      status: "ativo",
      destaque: true,
    },
    {
      nome: "Próximo negócio",
      papel: "Em construção",
      texto: "Ainda não tem nome público. Quando tiver, aparece aqui primeiro.",
      url: "",
      status: "em-breve",
    },
  ],
  agora: {
    atualizado: "2026-10-31",
    itens: [
      "Evoluindo o Doutor Drive com base no uso de todo dia.",
      "Organizando o jurídico da CNH em Dia para nenhum prazo passar.",
      "Recomeçando este site, agora como um lugar para escrever.",
    ],
  },
};
