export const PRODUTO = {
  nome: "Parque Ilha Bela",
  cidade: "Campos dos Goytacazes/RJ",
  consultor: "Pedro",
  construtora: "MRV",
  programa: "Minha Casa Minha Vida",
  subsidio: "R$ 55.000",
  metragem: "41,85 m²",
  quartos: "2 quartos",
  localizacao: "Av. Presidente Vargas, 447 — Parque Pecuária",
  referencia: "5 min do Partage Shopping, 1 min do Dom Atacadista",
  diferenciais: "prainha exclusiva, piscinas, salão gourmet, churrasqueira, playground, espaço funcional, condomínio fechado 24h",
  prova_social: "27 contratos assinados e R$ 5,6 milhões em vendas em apenas 2 dias de pré-venda",
  contexto_base: `Você é um copywriter especialista em mercado imobiliário popular e funis de conversão.
Produto: Parque Ilha Bela — apartamentos 2 quartos (41,85 m²) em Campos dos Goytacazes/RJ.
Construtora: MRV (maior da América Latina, 46 anos de mercado).
Programa: Minha Casa Minha Vida — subsídio de até R$ 55.000.
Diferencial real: prainha exclusiva, piscinas, salão gourmet, churrasqueira, playground, espaço funcional, condomínio fechado 24h.
Localização: Av. Presidente Vargas, 447 — Parque Pecuária. A 5 min do Partage Shopping, 1 min do Dom Atacadista.
Consultor: Pedro — atendimento via WhatsApp, simulação gratuita e sem compromisso.
Dado real de prova social: 27 contratos assinados e R$ 5,6 milhões em vendas em apenas 2 dias de pré-venda.
Tom: direto, humano, sem juridiquês. Nunca mencione diretamente a marca MRV no copy público.`,
};

export const ANGULOS = [
  {
    id: "contrario",
    nome: "Contrário",
    emoji: "⚡",
    descricao: "Quebra o senso comum que o prospect já tem, gerando curiosidade.",
    exemplo: "Sabe o que a maioria dos especialistas nunca falam?",
    cor: "green",
  },
  {
    id: "historia",
    nome: "História",
    emoji: "📖",
    descricao: "Storytelling com punch emocional. Protagonista que se identifica com o público.",
    exemplo: "Riram de mim quando falei que ia comprar meu apê...",
    cor: "blue",
  },
  {
    id: "curiosidade",
    nome: "Curiosidade",
    emoji: "🔍",
    descricao: "Pega algo do cotidiano e aponta como 'coisa nova' — novo risco ou funcionalidade.",
    exemplo: "1 a cada 30 moradores de Campos já mora num condomínio fechado pagando menos que aluguel.",
    cor: "purple",
  },
  {
    id: "conspiracao",
    nome: "Conspiração",
    emoji: "🕵️",
    descricao: "Ângulo 'nós contra eles' — segredos que o mercado esconde do comprador.",
    exemplo: "O que construtoras e corretores nunca contam sobre o preço de lançamento.",
    cor: "red",
  },
  {
    id: "paradoxal",
    nome: "Ideia Paradoxal",
    emoji: "🔄",
    descricao: "Pega uma ideia que o prospect já tem e traz para o hook de forma inesperada.",
    exemplo: "Como pessoas sem dinheiro guardado estão comprando apê — e quem tem está perdendo.",
    cor: "orange",
  },
  {
    id: "pop_quiz",
    nome: "Pop Quiz",
    emoji: "❓",
    descricao: "Quiz estilo 'show do milhão' onde a resposta correta quebra uma crença comum.",
    exemplo: "Qual dessas opções rende MENOS? A) Poupança B) Tesouro C) FGTS D) Renda variável",
    cor: "yellow",
  },
  {
    id: "truque",
    nome: "Truque",
    emoji: "🎯",
    descricao: "Reivindica facilidade + mistério como solução para uma dor comum.",
    exemplo: "O truque legal que trabalhadores CLT usam pra comprar sem dar entrada do bolso.",
    cor: "teal",
  },
  {
    id: "nova_descoberta",
    nome: "Nova Descoberta",
    emoji: "🚀",
    descricao: "Usa autoridade e credibilidade para criar esperança nova no prospect.",
    exemplo: "Mensagem urgente: 27 contratos em 2 dias — o maior lançamento da história de Campos.",
    cor: "indigo",
  },
  {
    id: "problema_solucao",
    nome: "Problema / Solução",
    emoji: "🔧",
    descricao: "Chamada direta do problema + reivindicação de solução clara.",
    exemplo: "Você paga aluguel todo mês e no final do ano não tem nada seu.",
    cor: "slate",
  },
];

// IDs de todos os ângulos — todos ficam disponíveis para todos os funis
export const TODOS_ANGULOS = [
  "contrario","historia","curiosidade","conspiracao",
  "paradoxal","pop_quiz","truque","nova_descoberta","problema_solucao"
];

export const FUNIS_BASE = [
  {
    id: "v1",
    nome: "Funil Geral",
    subtitulo: "Público 25–45 anos · Trabalhadores",
    slug: "parque-ilhabela-v1",
    paginas: ["Despertar (gancho emocional)", "Revelação (produto + benefícios)", "Apresentação (galeria + formulário)"],
    visual: "Escuro/verde, energético",
    tom: "Direto, animado — como um amigo empolgado contando uma oportunidade",
    protagonista: "Camila, 32 anos, moradora de Campos, 8 anos pagando aluguel",
    angulos_recomendados: ["historia", "contrario", "nova_descoberta"],
    cor: "green",
    inicio_recomendado: "historia",
    instrucao_extra: "3 páginas gamificadas. Foco em FGTS como entrada + subsídio MCMV.",
    custom: false,
  },
  {
    id: "senior",
    nome: "Funil Sênior 50+",
    subtitulo: "Público 50–70 anos · Aposentados",
    slug: "parque-ilhabela-senior",
    paginas: ["Página única longa (scroll)"],
    visual: "Fontes serifadas, verde escuro + creme. Sem música, sem contador.",
    tom: "Pausado, acolhedor — como um filho explicando algo importante ao pai",
    protagonista: "Seu José, 61 anos, aposentado de Campos, nunca teve imóvel próprio",
    angulos_recomendados: ["historia", "problema_solucao", "nova_descoberta"],
    cor: "amber",
    inicio_recomendado: "problema_solucao",
    instrucao_extra: "Seções: segurança, conforto, localização, financiamento, FAQ. Slideshow automático de fotos reais.",
    custom: false,
  },
  {
    id: "fgts",
    nome: "Funil FGTS CLT",
    subtitulo: "Trabalhadores CLT · 28–50 anos",
    slug: "parque-ilhabela-fgts",
    paginas: ["FGTS Parado (calculadora de perda)", "Como Funciona (passo a passo visual)", "Conversão (galeria + FAQ + formulário)"],
    visual: "Verde vibrante, foco em educação financeira",
    tom: "Revelação — como quem está contando um segredo financeiro importante",
    protagonista: "Trabalhador CLT que tem FGTS mas não sabe que pode usar como entrada",
    angulos_recomendados: ["contrario", "truque", "pop_quiz"],
    cor: "blue",
    inicio_recomendado: "contrario",
    instrucao_extra: "FGTS rende 3%, inflação come 4,8%. Calculadora interativa na P1. Passo a passo FGTS→entrada na P2.",
    custom: false,
  },
  {
    id: "urgencia",
    nome: "Funil Urgência",
    subtitulo: "Procrastinador · Alta tensão",
    slug: "parque-ilhabela-urgencia",
    paginas: ["Choque (ticker + contador + vagas ao vivo)", "Prova social (27 contratos, depoimento)", "Conversão final (sticky bar + formulário)"],
    visual: "Escuro/vermelho, alta tensão",
    tom: "Urgente e honesto — breaking news, rápido, cortado, sem enrolação",
    protagonista: "Quem já considerou comprar mas está procrastinando",
    angulos_recomendados: ["conspiracao", "paradoxal", "nova_descoberta"],
    cor: "red",
    inicio_recomendado: "conspiracao",
    instrucao_extra: "Dados reais: 27 contratos + R$5,6mi em 2 dias. Preço sobe com andamento da obra.",
    custom: false,
  },
];

// Carrega funis do localStorage (inclui os custom) e mescla com os base
export function getFunis() {
  try {
    const custom = JSON.parse(localStorage.getItem("funis_custom") || "[]");
    return [...FUNIS_BASE, ...custom];
  } catch {
    return FUNIS_BASE;
  }
}

export function saveFunilCustom(funil) {
  try {
    const custom = JSON.parse(localStorage.getItem("funis_custom") || "[]");
    custom.push({ ...funil, custom: true });
    localStorage.setItem("funis_custom", JSON.stringify(custom));
  } catch {}
}

export function deleteFunilCustom(id) {
  try {
    const custom = JSON.parse(localStorage.getItem("funis_custom") || "[]");
    localStorage.setItem("funis_custom", JSON.stringify(custom.filter(f => f.id !== id)));
  } catch {}
}

// Alias para compatibilidade — componentes usam FUNIS
export const FUNIS = FUNIS_BASE;

export const VSLS = [
  {
    id: "vsl1",
    funil_id: "v1",
    nome: "VSL Funil Geral",
    duracao: "3–4 min",
    tom: "Amigo empolgado",
    estrutura: [
      { tempo: "0:00–0:20", bloco: "Gancho", descricao: "Frase que para o scroll imediatamente" },
      { tempo: "0:20–0:45", bloco: "Dor", descricao: "Amplificar o problema do aluguel com emoção" },
      { tempo: "0:45–1:15", bloco: "Agitação", descricao: "10 anos de aluguel = R$120k perdidos" },
      { tempo: "1:15–1:45", bloco: "Virada", descricao: '"Existe uma saída que a maioria não conhece"' },
      { tempo: "1:45–2:30", bloco: "Solução", descricao: "Produto como veículo. FGTS + MCMV" },
      { tempo: "2:30–3:00", bloco: "Prova", descricao: "Dado real + depoimento (Camila, 31 anos)" },
      { tempo: "3:00–3:30", bloco: "Oferta", descricao: "O que recebe ao preencher o formulário" },
      { tempo: "3:30–4:00", bloco: "CTA", descricao: "Chamada clara e urgente" },
    ],
  },
  {
    id: "vsl2",
    funil_id: "senior",
    nome: "VSL Sênior 50+",
    duracao: "3–5 min",
    tom: "Pausado e acolhedor",
    estrutura: [
      { tempo: "0:00–0:30", bloco: "Gancho", descricao: "Pergunta emocional sobre merecimento" },
      { tempo: "0:30–1:00", bloco: "História", descricao: "Narrativa de identificação (Seu José, 61 anos)" },
      { tempo: "1:00–1:30", bloco: "Dor", descricao: 'O peso de nunca ter tido "um canto seu"' },
      { tempo: "1:30–2:00", bloco: "Virada", descricao: "Ainda dá tempo — mais simples do que parece" },
      { tempo: "2:00–3:00", bloco: "Solução", descricao: "Produto como segurança, não investimento" },
      { tempo: "3:00–3:30", bloco: "Prova", descricao: "Dado real + depoimento (mesma faixa etária)" },
      { tempo: "3:30–4:30", bloco: "Oferta", descricao: "Simulação gratuita, sem compromisso" },
      { tempo: "4:30–5:00", bloco: "CTA", descricao: "Convite gentil, sem pressão" },
    ],
  },
  {
    id: "vsl3",
    funil_id: "fgts",
    nome: "VSL FGTS CLT",
    duracao: "2–3 min",
    tom: "Revelação de segredo",
    estrutura: [
      { tempo: "0:00–0:15", bloco: "Gancho", descricao: "Dinheiro parado perdendo valor todo mês" },
      { tempo: "0:15–0:40", bloco: "Agitação", descricao: "FGTS 3% vs inflação 4,8% — calculado ao vivo" },
      { tempo: "0:40–1:00", bloco: "Virada", descricao: "Esse dinheiro pode te dar um apartamento agora" },
      { tempo: "1:00–1:30", bloco: "Mecanismo", descricao: "FGTS + subsídio em 4 passos simples" },
      { tempo: "1:30–2:00", bloco: "Produto", descricao: "Parque Ilha Bela como destino desse dinheiro" },
      { tempo: "2:00–2:30", bloco: "Prova", descricao: "Dado real + simulação numérica ilustrativa" },
      { tempo: "2:30–3:00", bloco: "CTA", descricao: "Simulação gratuita do FGTS disponível" },
    ],
  },
  {
    id: "vsl4",
    funil_id: "urgencia",
    nome: "VSL Urgência",
    duracao: "2 min",
    tom: "Breaking news",
    estrutura: [
      { tempo: "0:00–0:10", bloco: "Gancho", descricao: "Mora em Campos e não fez isso? Está perdendo agora." },
      { tempo: "0:10–0:30", bloco: "Dado chocante", descricao: "27 contratos em 2 dias — maior lançamento de Campos" },
      { tempo: "0:30–0:50", bloco: "Em jogo", descricao: "Preço sobe, vagas acabam, condições somem" },
      { tempo: "0:50–1:20", bloco: "Produto", descricao: "Apresentação rápida com imagens reais" },
      { tempo: "1:20–1:40", bloco: "Prova social", descricao: "Dado + depoimento curto" },
      { tempo: "1:40–2:00", bloco: "CTA", descricao: "Chamada direta e urgente para o formulário" },
    ],
  },
];

// Gera o prompt completo combinando funil + ângulo
export function gerarPrompt({ funil, angulo, tipo = "copy", extras = "" }) {
  const ctx = PRODUTO.contexto_base;

  const instrucoes_angulo = {
    contrario: `Use o ângulo CONTRÁRIO. Quebre a crença mais forte que esse público tem.
O objetivo é gerar curiosidade ao contradizer o senso comum.
Exemplo de estrutura: headline que nega o óbvio → revelação da contradição → solução.`,

    historia: `Use o ângulo HISTÓRIA com punch emocional.
Protagonista: ${funil.protagonista}.
Estrutura obrigatória: cena de dor no cotidiano → desenvolvimento emocional (não financeiro) → cliffhanger → virada → epílogo de conquista → transição para o leitor ("e você?").`,

    curiosidade: `Use o ângulo CURIOSIDADE.
Parta de um dado real ou fato do cotidiano de Campos dos Goytacazes que aponte para a oportunidade.
Gancho sugerido: "1 a cada 30 moradores de Campos já mora em condomínio fechado com lazer — e provavelmente paga menos que você de aluguel hoje."
Desenvolvimento: gere curiosidade → não revele ainda → construa suspense → revele na próxima página.`,

    conspiracao: `Use o ângulo CONSPIRAÇÃO adaptado ao mercado imobiliário (sem teorias absurdas — baseado em fatos reais).
Conspiração: "O preço de lançamento é o ÚNICO momento em que o comprador tem poder de negociação. Depois disso, quem manda é o mercado."
Estrutura: revele o segredo → dados que confirmam → "nós (compradores inteligentes) vs eles (mercado)" → CTA urgente.`,

    paradoxal: `Use o ângulo IDEIA PARADOXAL.
Paradoxo central: "Pessoas sem dinheiro guardado estão comprando apartamento. Quem tem dinheiro está perdendo a oportunidade."
Explique o paradoxo (FGTS + subsídio + parcelamento = zero do bolso) → valide com dado real → resolva com ação.`,

    pop_quiz: `Use o ângulo POP QUIZ (estilo show do milhão).
Pergunta: "Qual dessas opções rende MENOS dinheiro para você todo mês?"
A) Deixar na poupança | B) Investir no Tesouro Direto | C) Deixar parado no FGTS | D) Aplicar em renda variável
A resposta correta é C — explore isso para revelar a perda e conduzir para a solução.
Desenvolva: introdução da pergunta → 4 alternativas com descrições → revelação com impacto → transição para o produto → CTA.`,

    truque: `Use o ângulo TRUQUE (facilidade de aplicação + mistério).
O "truque": usar o FGTS como entrada sem tirar nada do próprio bolso, combinado com o subsídio do governo.
Parece complicado mas é simples — essa sensação deve guiar o copy.
Headline sugerida: "O truque legal que trabalhadores CLT usam para comprar apartamento sem dar entrada do próprio bolso."`,

    nova_descoberta: `Use o ângulo NOVA DESCOBERTA.
Âncora de autoridade: "27 contratos e R$5,6 milhões em 2 dias — o maior lançamento da história de Campos dos Goytacazes."
Estrutura: anuncie como descoberta urgente → por que esse dado importa para o leitor → o que ele perde se não agir → CTA agressivo mas honesto.`,

    problema_solucao: `Use o ângulo PROBLEMA/SOLUÇÃO.
Problema central: "Você paga aluguel todo mês e no final do ano não tem nada seu."
Dado para amplificar: um brasileiro gasta em média R$120.000 em aluguel ao longo de 10 anos sem construir patrimônio.
Estrutura: amplifique o problema com emoção → promessa de saída → solução (produto como veículo, não como herói) → consolide com prova social.`,
  };

  const instrucoes_tipo = {
    copy: `Escreva o copy completo para as páginas do funil.
Páginas: ${funil.paginas.join(" | ")}

Para cada página entregue:
- [HEADLINE] — headline principal
- [SUBHEADLINE] — complemento da headline  
- [BULLETS] — 3 bullets de dor ou benefício
- [CORPO] — texto principal da seção
- [CTA] — chamada para ação com texto do botão
- [FAQ] — na última página: 5 perguntas e respostas reais

Formato: copy pronto para colar diretamente nas páginas, indicando onde cada texto vai.`,

    vsl: `Escreva o script completo de VSL (${funil.id === "urgencia" ? "2 min" : funil.id === "fgts" ? "2–3 min" : funil.id === "senior" ? "3–5 min" : "3–4 min"}).
Tom: ${funil.tom}.

Para cada bloco do script entregue:
- [TEMPO] — ex: 0:00–0:20
- [TELA] — o que aparece visualmente (texto na tela, imagem, b-roll)
- [LOCUÇÃO] — o que o locutor fala
- [B-ROLL] — sugestão de imagem ou vídeo de fundo

Inclua sugestões de imagens para cada bloco. Script pronto para teleprompter e locução.`,

    social: `Escreva roteiros de conteúdo para redes sociais.
Entregue:
1. REELS (30–60s): script completo com hook nos primeiros 3s, desenvolvimento e CTA
2. STORIES (sequência de 5): texto de cada story + sugestão visual
3. CARROSSEL: título + 6 slides com texto de cada slide + legenda
4. LEGENDA: texto completo para feed com hashtags

Tom: ${funil.tom}
Formato: roteiros prontos para gravar ou adaptar.`,

    modelagem: `Vou te enviar uma copy existente para você modelar e melhorar.

ETAPA 1 — MODELAGEM:
1. Preserve a essência e mensagem original
2. Reformule frases para ser único (sem plágio)
3. Use linguagem clara e acessível para locução
4. Melhore a fluidez e ritmo
5. Adicione gatilhos emocionais: medos, desejos, aspirações do público
6. Adapte referências para a cultura de Campos dos Goytacazes
7. Aplique: Open Loops, Prova Social, Benefícios Transformadores

ETAPA 2 — REVISÃO (após modelagem aprovada):
1. Correção ortográfica e gramatical
2. Pontuação para ritmo fluido
3. Fluidez e coerência entre parágrafos
4. Clareza e simplicidade
5. Consistência de tom para o público ${funil.subtitulo}
6. Eliminar redundâncias
7. Verificar fatos e dados

Para cada alteração explique: O que mudou | Por que mudou | Como melhora a copy.
Entrega final: copy pronto para locução e conversão.`,
  };

  const prompt = `${ctx}

---

FUNIL: ${funil.nome} (${funil.slug})
PÚBLICO: ${funil.subtitulo}
VISUAL: ${funil.visual}
TOM: ${funil.tom}
${funil.instrucao_extra ? `CONTEXTO ADICIONAL: ${funil.instrucao_extra}` : ""}

---

ÂNGULO A USAR:
${instrucoes_angulo[angulo.id]}

---

TIPO DE ENTREGA:
${instrucoes_tipo[tipo]}

${extras ? `---\nOBSERVAÇÕES ADICIONAIS:\n${extras}` : ""}`;

  return prompt;
}

export const METRICAS_INFO = {
  hook: {
    nome: "Hook Rate",
    formula: "Visualizações 3s ÷ Reproduções totais",
    descricao: "Mede o poder do seu clickbait/gancho",
    meta: "> 50%",
    cor: "blue",
  },
  retencao: {
    nome: "Retenção Body",
    formula: "Reprodução 75% ÷ Reproduções totais",
    descricao: "Mede o quanto o corpo do anúncio está convertendo",
    meta: "> 25%",
    cor: "green",
  },
  conversao: {
    nome: "Conversão Body",
    formula: "Compras ÷ Reprodução 75%",
    descricao: "Taxa de conversão do corpo para compra",
    meta: "> 3%",
    cor: "purple",
  },
};

export const TIPOS_TESTE = {
  horizontal: {
    nome: "Teste Horizontal",
    uso: "Ads validados — para lateralização e escala",
    elementos: ["Clickbait", "Hook (primeiros segundos)", "Hypnotic Visual", "Banner Copy", "Headline", "Thumbnail", "Dimensões"],
    descricao: "Valide um ad → teste variações dos primeiros segundos. Gaste mais nos vencedores.",
  },
  vertical: {
    nome: "Teste Vertical",
    uso: "Criativos perdendo performance — aumentar tempo de vida útil",
    elementos: ["Interlocutor/ator", "CTA", "Prova social/depoimento", "Autoridade", "Video react flutuante", "Música/som", "Teste visual (cenário, takes)", "Narração", "Duração", "Dimensão"],
    descricao: "Criativo antigo saturando → teste elementos internos para renovar sem criar do zero.",
  },
};
