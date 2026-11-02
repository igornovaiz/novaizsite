// Dados que aparecem no site. Para mudar um link ou texto curto, mude aqui e rode `npm run build`.
export default {
  nome: "Igor Novaiz",
  url: "https://igornovaiz.com.br",
  descricao:
    "Igor Novaiz: empreendedor em São Paulo. Toco uma consultoria em direito de trânsito, crio sistemas de gestão e escrevo sobre negócios, tecnologia e o que aprendo no caminho.",
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
    sub: "Sou sócio de uma consultoria em direito de trânsito, crio sistemas de gestão sob medida e escrevo sobre negócios, tecnologia e o que aprendo no caminho.",
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
  // Sem nome de empresa: descreva o ramo. Com `url`, o card ganha botão.
  trabalho: [
    {
      nome: "Consultoria em direito de trânsito",
      papel: "Sócio e gestor",
      icone: "cnh",
      texto: "Defesa de multas, suspensão e cassação da CNH. Toco a operação no dia a dia, do comercial ao jurídico.",
      url: "",
      status: "ativo",
    },
    {
      nome: "Sistema de gestão",
      papel: "Criei e mantenho",
      icone: "sistema",
      texto: "Software sob medida para empresas de serviços: vendas, prazos jurídicos, documentos e contratos num lugar só.",
      url: "",
      status: "ativo",
      destaque: true,
    },
    {
      nome: "Próximo negócio",
      papel: "Em construção",
      icone: "novo",
      texto: "Ainda não tem nome público. Quando tiver, aparece aqui primeiro.",
      url: "",
      status: "em-breve",
    },
  ],
  agora: {
    atualizado: "2026-11-02",
    itens: [
      "Evoluindo um sistema de gestão com base no uso de todo dia.",
      "Organizando o jurídico da operação para nenhum prazo passar.",
      "Construindo o Novaiz, meu assistente pessoal com inteligência artificial.",
    ],
  },
};
