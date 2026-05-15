// ─────────────────────────────────────────────────────────────────────────────
// PRODUTO
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// 11 ÂNGULOS — ordem original, adaptados para imóvel
// ─────────────────────────────────────────────────────────────────────────────
export const ANGULOS = [
  {
    id: "contrario",
    numero: 1,
    nome: "Contrário",
    emoji: "⚡",
    objetivo: "Quebrar o senso comum que o prospect já tem, gerando curiosidade dentro dele.",
    descricao: "Contradiz a crença mais forte do público. A headline nega o óbvio e força a pessoa a querer entender por quê.",
    exemplo_original: "Sabe o que a maioria dos especialistas nunca falam? Que usar metformina não é só ultrapassado — é potencialmente perigoso.",
    exemplo_imovel: "Sabe o que a maioria dos corretores nunca conta? Que esperar 'ter mais dinheiro guardado' é exatamente o que faz você nunca sair do aluguel.",
    cor: "green",
  },
  {
    id: "paradoxal",
    numero: 2,
    nome: "Ideia Paradoxal",
    emoji: "🔄",
    objetivo: "Pegar uma ideia que o prospect já tem e trazer essa ideia para o hook de forma inesperada.",
    descricao: "O hook usa a própria lógica do prospect contra ele — criando uma contradição que prende a atenção.",
    exemplo_original: "Como atrizes de Hollywood conseguem perder peso tão rápido para filmes… (E VOCÊ NÃO)",
    exemplo_imovel: "Como pessoas sem dinheiro guardado estão comprando apartamento em Campos… (E QUEM TEM ESTÁ PERDENDO A OPORTUNIDADE)",
    cor: "orange",
  },
  {
    id: "pop_quiz",
    numero: 3,
    nome: "Pop Quiz",
    emoji: "❓",
    objetivo: "Copiar um quiz estilo show do milhão. A resposta correta deve usar o ângulo contrário para quebrar uma crença comum.",
    descricao: "Engaja pelo formato de quiz. A resposta inesperada gera impacto e abre espaço para a solução.",
    exemplo_original: "Qual desses alimentos não pode estar na dieta do diabético? A) Frutas  B) Doces  C) Carnes gordurosas  D) Frituras",
    exemplo_imovel: "Qual dessas opções deixa seu dinheiro encolhendo mais todo mês? A) Poupança  B) Tesouro  C) FGTS parado  D) Aluguel",
    cor: "yellow",
  },
  {
    id: "curiosidade",
    numero: 4,
    nome: "Curiosidade",
    emoji: "🔍",
    objetivo: "Pegar algo do cotidiano da pessoa e apontar como uma 'coisa nova', reivindicando uma nova funcionalidade ou um novo risco.",
    descricao: "Usa o familiar para criar estranhamento. A pessoa olha para algo que já conhece com outros olhos.",
    exemplo_original: "Essa fruta que você compra todo mês está 'alimentando' sua diabetes.",
    exemplo_imovel: "Esse boleto de aluguel que você paga todo mês está financiando o apartamento de outra pessoa — não o seu.",
    cor: "purple",
  },
  {
    id: "conspiracao",
    numero: 5,
    nome: "Conspiração",
    emoji: "🕵️",
    objetivo: "Reivindicar um ângulo de conspiração que puxe muito a ideia de 'nós contra eles'.",
    descricao: "Cria um inimigo (mercado, sistema) e posiciona o prospect do lado dos que sabem a verdade.",
    exemplo_original: "Esse homem foi assassinado pela indústria farmacêutica por descobrir uma cura natural.",
    exemplo_imovel: "O que construtoras e corretores nunca contam: o preço de lançamento é o único momento em que o comprador tem poder. Depois disso, quem manda é o mercado.",
    cor: "red",
  },
  {
    id: "teaser_mecanismo",
    numero: 6,
    nome: "Teaser do Mecanismo",
    emoji: "🔬",
    objetivo: "Reivindicar o teaser do mecanismo único acompanhado de um benefício muito forte.",
    descricao: "Apresenta o 'como funciona' de forma parcial — suficiente para despertar curiosidade, insuficiente para satisfazê-la.",
    exemplo_original: "O 'extrato da abóbora' pode secar até 7kg se usado todos os dias antes de dormir.",
    exemplo_imovel: "A combinação de FGTS + subsídio do governo pode zerar sua entrada — e a parcela sair menor do que você paga de aluguel hoje.",
    cor: "teal",
  },
  {
    id: "truque",
    numero: 7,
    nome: "Truque",
    emoji: "🎯",
    objetivo: "Reivindicar um truque pela facilidade de aplicação e mistério como solução para uma dor comum.",
    descricao: "A palavra 'truque' carrega leveza e acessibilidade. Parece simples, parece exclusivo — um atalho que poucos conhecem.",
    exemplo_original: "O 'truque da cevada' queima gordura sem você precisar deixar de tomar aquela gelada.",
    exemplo_imovel: "O truque legal que trabalhadores CLT usam para comprar apartamento sem tirar um centavo do próprio bolso.",
    cor: "blue",
  },
  {
    id: "receita_estranha",
    numero: 8,
    nome: "Receita Estranha",
    emoji: "🧪",
    objetivo: "Usar de uma 'receita estranha' para gerar curiosidade no prospect.",
    descricao: "O estranhamento é o gatilho. Uma combinação incomum de elementos que juntos geram um resultado surpreendente.",
    exemplo_original: "Essa 'mistura estranha' tirada do extrato da abóbora ativa seu metabolismo.",
    exemplo_imovel: "Essa 'combinação estranha' de FGTS + subsídio + financiamento está transformando o salário mínimo na entrada de um apartamento com prainha em Campos.",
    cor: "indigo",
  },
  {
    id: "nova_descoberta",
    numero: 9,
    nome: "Nova Descoberta",
    emoji: "🚀",
    objetivo: "Usar de autoridade e credibilidade para reivindicar nova descoberta, gerando atenção e principalmente esperança nova.",
    descricao: "Anuncia algo como urgente e inédito. Usa dados reais para validar. O prospect sente que chegou na hora certa.",
    exemplo_original: "Uma mensagem urgente para qualquer pessoa com diabetes tipo 2. Essa descoberta pode salvar sua vida.",
    exemplo_imovel: "Uma mensagem urgente para quem mora de aluguel em Campos: 27 contratos em 2 dias — o maior lançamento da história da cidade acabou de abrir novas vagas.",
    cor: "amber",
  },
  {
    id: "historia",
    numero: 10,
    nome: "História",
    emoji: "📖",
    objetivo: "Seguir uma linha de storytelling com uma afirmação de punch emocional.",
    descricao: "O protagonista espelha o público. A dor é emocional, não técnica. Cliffhanger prende. Virada inspira. Transição convida.",
    exemplo_original: "Riram de mim quando falei que pesaria 53kg…",
    exemplo_imovel: "Riram de mim quando falei que ia sair do aluguel esse ano. Não tinha dinheiro, não tinha fiador, não tinha nada.",
    cor: "slate",
  },
  {
    id: "problema_solucao",
    numero: 11,
    nome: "Problema / Solução",
    emoji: "🔧",
    objetivo: "Fazer uma chamada direta de um problema comum e reivindicar uma solução.",
    descricao: "O mais direto de todos. Nomeia o problema sem rodeios, amplifica a dor e apresenta a solução como caminho natural.",
    exemplo_original: "O seu 'amigão' falha na hora H. Tome esse VIAGRA NATURAL.",
    exemplo_imovel: "Você paga aluguel todo mês e no final do ano não tem nada seu. Existe uma saída — e ela usa dinheiro que já é seu.",
    cor: "rose",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 7 TIPOS DE CONTEÚDO — separados por grupo
// ─────────────────────────────────────────────────────────────────────────────
export const TIPOS = [
  { id: "copy",             label: "Copy do Site",    icon: "📝", desc: "Texto completo das páginas do funil",          grupo: "Site"       },
  { id: "vsl",              label: "Script VSL",      icon: "🎬", desc: "Roteiro com tempo, tela e locução",            grupo: "Vídeo"      },
  { id: "reels",            label: "Reels",           icon: "📱", desc: "Script 30–60s · hook nos primeiros 3s",        grupo: "Social"     },
  { id: "stories",          label: "Stories",         icon: "◻️", desc: "Sequência de 5 stories com texto e visual",    grupo: "Social"     },
  { id: "carrossel",        label: "Carrossel",       icon: "🗂️", desc: "Capa + 6 slides + encerramento com CTA",       grupo: "Social"     },
  { id: "legenda",          label: "Legenda",         icon: "✍️", desc: "3 variações de legenda para feed + hashtags",  grupo: "Social"     },
  { id: "modelagem",        label: "Modelar Copy",    icon: "✏️", desc: "Melhore uma copy existente · 2 etapas",        grupo: "Ferramenta" },
];

// ─────────────────────────────────────────────────────────────────────────────
// FUNIS BASE
// ─────────────────────────────────────────────────────────────────────────────
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
    angulos_recomendados: ["contrario", "truque", "teaser_mecanismo", "receita_estranha", "pop_quiz"],
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
  {
    id: "mcmv",
    nome: "Ilhabela MCMV",
    subtitulo: "Público geral · Faixas 1–4 MCMV",
    slug: "parque-ilhabela-mcmv",
    url: "https://ilhabela-mcmv.vercel.app/",
    paginas: [
      "P1 — Calculadora de faixa MCMV (renda → descobre subsídio + faixa)",
      "P2 — Simulador de parcela (renda + FGTS → parcela real) + 4 passos visuais",
      "P3 — Galeria + FAQ MCMV + formulário de simulação gratuita",
    ],
    visual: "Azul/índigo escuro na P1 (governo, seriedade), branco limpo na P2, azul institucional na P3. Fonte Syne. Tom educativo e oficial.",
    tom: "Educativo e acessível — como um despachante de confiança que explica o que você tem direito e como usar",
    protagonista: "Qualquer pessoa com renda de até R$13.000 que nunca soube que o governo pode pagar parte do seu apê",
    angulos_recomendados: ["nova_descoberta", "contrario", "teaser_mecanismo", "problema_solucao", "pop_quiz"],
    cor: "indigo",
    inicio_recomendado: "nova_descoberta",
    instrucao_extra: `Funil MCMV — 3 páginas gamificadas.
P1: Calculadora de faixa (renda familiar → descobre faixa 1/2/3/4 e benefício). Faixas: F1 até R$3.200 (subsídio 95%, parcela ~R$80/mês), F2 até R$5.000 (subsídio parcial), F3 até R$9.600 (juros 8,16% a.a.), F4 até R$13.000 (juros 9,5% a.a.). Imóvel R$185.000.
P2: Simulador de parcela com renda + FGTS. Fórmula real da Caixa. 4 passos: (1) Governo entra com subsídio → (2) FGTS cobre entrada → (3) financia restante pela Caixa → (4) chaves na mão. Atualização abril/2026: limites de faixa reajustados.
P3: Galeria completa do empreendimento (fachada, piscina, salão, playground, quarto, área privativa). FAQ MCMV: primeiro imóvel, composição de renda, nome sujo, prazo 420 meses, FGTS a cada 2 anos. Formulário CTA para simulação real com Pedro via WhatsApp.
Tom: educativo, acessível, institucional mas humano. Nunca alarmista. O inimigo é a desinformação, não o governo.`,
    custom: false,
  },
];

export function getFunis() {
  try {
    const custom = JSON.parse(localStorage.getItem("funis_custom") || "[]");
    return [...FUNIS_BASE, ...custom];
  } catch { return FUNIS_BASE; }
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

export const FUNIS = FUNIS_BASE;

// ─────────────────────────────────────────────────────────────────────────────
// VSLs
// ─────────────────────────────────────────────────────────────────────────────
export const VSLS = [
  {
    id: "vsl1", funil_id: "v1", nome: "VSL Funil Geral", duracao: "3–4 min", tom: "Amigo empolgado",
    estrutura: [
      { tempo: "0:00–0:20", bloco: "Gancho",   descricao: "Frase que para o scroll imediatamente" },
      { tempo: "0:20–0:45", bloco: "Dor",      descricao: "Amplificar o problema do aluguel com emoção" },
      { tempo: "0:45–1:15", bloco: "Agitação", descricao: "10 anos de aluguel = R$120k perdidos" },
      { tempo: "1:15–1:45", bloco: "Virada",   descricao: "Existe uma saída que a maioria não conhece" },
      { tempo: "1:45–2:30", bloco: "Solução",  descricao: "Produto como veículo. FGTS + MCMV" },
      { tempo: "2:30–3:00", bloco: "Prova",    descricao: "27 contratos + depoimento Camila 31 anos" },
      { tempo: "3:00–3:30", bloco: "Oferta",   descricao: "O que recebe ao preencher o formulário" },
      { tempo: "3:30–4:00", bloco: "CTA",      descricao: "Chamada clara e urgente" },
    ],
  },
  {
    id: "vsl2", funil_id: "senior", nome: "VSL Sênior 50+", duracao: "3–5 min", tom: "Pausado e acolhedor",
    estrutura: [
      { tempo: "0:00–0:30", bloco: "Gancho",   descricao: "Pergunta emocional sobre merecimento" },
      { tempo: "0:30–1:00", bloco: "História", descricao: "Narrativa Seu José, 61 anos" },
      { tempo: "1:00–1:30", bloco: "Dor",      descricao: "O peso de nunca ter tido um canto seu" },
      { tempo: "1:30–2:00", bloco: "Virada",   descricao: "Ainda dá tempo — mais simples do que parece" },
      { tempo: "2:00–3:00", bloco: "Solução",  descricao: "Produto como segurança, não investimento" },
      { tempo: "3:00–3:30", bloco: "Prova",    descricao: "Dado real + depoimento mesma faixa etária" },
      { tempo: "3:30–4:30", bloco: "Oferta",   descricao: "Simulação gratuita, sem compromisso" },
      { tempo: "4:30–5:00", bloco: "CTA",      descricao: "Convite gentil, sem pressão" },
    ],
  },
  {
    id: "vsl3", funil_id: "fgts", nome: "VSL FGTS CLT", duracao: "2–3 min", tom: "Revelação de segredo",
    estrutura: [
      { tempo: "0:00–0:15", bloco: "Gancho",    descricao: "Dinheiro parado perdendo valor todo mês" },
      { tempo: "0:15–0:40", bloco: "Agitação",  descricao: "FGTS 3% vs inflação 4,8% — calculado ao vivo" },
      { tempo: "0:40–1:00", bloco: "Virada",    descricao: "Esse dinheiro pode te dar um apartamento agora" },
      { tempo: "1:00–1:30", bloco: "Mecanismo", descricao: "FGTS + subsídio em 4 passos simples" },
      { tempo: "1:30–2:00", bloco: "Produto",   descricao: "Parque Ilha Bela como destino desse dinheiro" },
      { tempo: "2:00–2:30", bloco: "Prova",     descricao: "Dado real + simulação numérica ilustrativa" },
      { tempo: "2:30–3:00", bloco: "CTA",       descricao: "Simulação gratuita do FGTS disponível" },
    ],
  },
  {
    id: "vsl4", funil_id: "urgencia", nome: "VSL Urgência", duracao: "2 min", tom: "Breaking news",
    estrutura: [
      { tempo: "0:00–0:10", bloco: "Gancho",        descricao: "Mora em Campos e não fez isso? Está perdendo agora." },
      { tempo: "0:10–0:30", bloco: "Dado chocante", descricao: "27 contratos em 2 dias — maior lançamento de Campos" },
      { tempo: "0:30–0:50", bloco: "Em jogo",       descricao: "Preço sobe, vagas acabam, condições somem" },
      { tempo: "0:50–1:20", bloco: "Produto",       descricao: "Apresentação rápida com imagens reais" },
      { tempo: "1:20–1:40", bloco: "Prova social",  descricao: "Dado + depoimento curto" },
      { tempo: "1:40–2:00", bloco: "CTA",           descricao: "Chamada direta e urgente para o formulário" },
    ],
  },
  {
    id: "vsl5", funil_id: "mcmv", nome: "VSL MCMV", duracao: "2–3 min", tom: "Educativo e acessível",
    estrutura: [
      { tempo: "0:00–0:15", bloco: "Gancho",     descricao: "O governo pode pagar parte do seu apê — você sabe quanto?" },
      { tempo: "0:15–0:35", bloco: "Revelação",  descricao: "Apresenta o MCMV como programa real com faixas de renda" },
      { tempo: "0:35–1:00", bloco: "Mecanismo",  descricao: "4 passos: subsídio → FGTS → financiamento Caixa → chaves" },
      { tempo: "1:00–1:30", bloco: "Simulação",  descricao: "Exemplo numérico real: renda R$3.500 → parcela ~R$80/mês" },
      { tempo: "1:30–2:00", bloco: "Produto",    descricao: "Parque Ilha Bela como destino elegível para todas as faixas" },
      { tempo: "2:00–2:30", bloco: "Prova",      descricao: "27 contratos em 2 dias + depoimento de comprador via MCMV" },
      { tempo: "2:30–3:00", bloco: "CTA",        descricao: "Simulação gratuita com Pedro via WhatsApp" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GERADOR DE PROMPT
// ─────────────────────────────────────────────────────────────────────────────
export function gerarPrompt({ funil, angulo, tipo = "copy", extras = "" }) {
  const ctx = PRODUTO.contexto_base;

  const instrucoes_angulo = {
    contrario: `ÂNGULO ${angulo.numero}: CONTRÁRIO
OBJETIVO: ${angulo.objetivo}
COMO USAR: Quebre a crença mais forte desse público (${funil.subtitulo}).
A headline deve negar algo óbvio que eles acreditam. A revelação contradiz o senso comum com dado real.
Estrutura: headline que nega o óbvio → revelação da contradição → solução.
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    paradoxal: `ÂNGULO ${angulo.numero}: IDEIA PARADOXAL
OBJETIVO: ${angulo.objetivo}
COMO USAR: Pegue a lógica que o público (${funil.subtitulo}) já usa e vire contra ela.
O hook cria uma contradição que prende a atenção imediatamente.
Estrutura: paradoxo no hook → explicação (FGTS + subsídio = zero do bolso) → validação com dado real → ação.
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    pop_quiz: `ÂNGULO ${angulo.numero}: POP QUIZ
OBJETIVO: ${angulo.objetivo}
COMO USAR: Crie um quiz estilo show do milhão para o público (${funil.subtitulo}).
A resposta correta quebra uma crença comum — use o ângulo contrário na revelação.
Estrutura obrigatória:
1. Contexto de por que essa pergunta importa
2. A pergunta com 4 alternativas (A, B, C, D)
3. Instrução para escolher antes de revelar
4. Revelação da resposta com impacto emocional
5. Por que essa resposta importa para o leitor
6. Transição para a solução
7. CTA
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    curiosidade: `ÂNGULO ${angulo.numero}: CURIOSIDADE
OBJETIVO: ${angulo.objetivo}
COMO USAR: Pegue algo do cotidiano do público (${funil.subtitulo}) e reapresente como ameaça ou oportunidade nova.
O gancho deve ser familiar o suficiente para reconhecerem, surpreendente o suficiente para parar o scroll.
Estrutura: elemento familiar no gancho → revelação do novo risco ou oportunidade → suspense → solução na próxima página.
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    conspiracao: `ÂNGULO ${angulo.numero}: CONSPIRAÇÃO
OBJETIVO: ${angulo.objetivo}
COMO USAR: Crie um "nós contra eles" baseado em fatos reais do mercado imobiliário — sem teorias absurdas.
O inimigo é o sistema (mercado, inflação, timing). O prospect está do lado dos que sabem agir.
Estrutura: revelação do segredo → dados que confirmam → "quem sabe age primeiro" → CTA urgente.
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    teaser_mecanismo: `ÂNGULO ${angulo.numero}: TEASER DO MECANISMO
OBJETIVO: ${angulo.objetivo}
COMO USAR: Apresente o mecanismo único (FGTS + subsídio + financiamento MCMV) de forma parcial.
Suficiente para despertar curiosidade, insuficiente para satisfazê-la completamente.
O benefício final deve ser concreto e forte.
Estrutura: benefício forte no hook → introdução do mecanismo com nome específico → revelação parcial → promessa de explicação completa → CTA.
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    truque: `ÂNGULO ${angulo.numero}: TRUQUE
OBJETIVO: ${angulo.objetivo}
COMO USAR: Apresente a solução como um "truque" — fácil de aplicar, com toque de mistério, que resolve uma dor real do público (${funil.subtitulo}).
Parece simples, parece exclusivo, como se a pessoa descobrisse um atalho que poucos conhecem.
Estrutura: headline com "truque" + dor resolvida → mistério do como → revelação em passos simples → prova → CTA.
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    receita_estranha: `ÂNGULO ${angulo.numero}: RECEITA ESTRANHA
OBJETIVO: ${angulo.objetivo}
COMO USAR: Apresente a combinação FGTS + subsídio + financiamento como uma "receita estranha" — mistura incomum que gera resultado surpreendente.
O estranhamento é o gatilho. A combinação deve soar quase improvável até ser explicada.
Estrutura: headline com a "receita" + resultado surpreendente → os "ingredientes" → como a combinação funciona → resultado concreto → CTA.
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    nova_descoberta: `ÂNGULO ${angulo.numero}: NOVA DESCOBERTA
OBJETIVO: ${angulo.objetivo}
COMO USAR: Anuncie como urgente e recente usando o dado real de prova social como âncora de autoridade.
O prospect deve sentir que chegou na hora certa — essa descoberta é para ele agora.
Estrutura: anúncio urgente com dado real (27 contratos, R$5,6mi em 2 dias) → por que esse dado importa para esse público → o que perde se não agir → CTA.
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    historia: `ÂNGULO ${angulo.numero}: HISTÓRIA
OBJETIVO: ${angulo.objetivo}
COMO USAR: Storytelling com punch emocional. Protagonista: ${funil.protagonista}.
A dor deve ser emocional (vergonha, cansaço, insegurança) — não técnica.
Estrutura obrigatória:
1. Cena de abertura: momento específico de dor no cotidiano
2. Desenvolvimento emocional (não financeiro)
3. Cliffhanger que interrompe a narrativa
4. Virada: a descoberta que mudou tudo
5. Epílogo: o depois (concreto, visual, emocional)
6. Transição para o leitor: "e você?"
Exemplo adaptado: "${angulo.exemplo_imovel}"`,

    problema_solucao: `ÂNGULO ${angulo.numero}: PROBLEMA / SOLUÇÃO
OBJETIVO: ${angulo.objetivo}
COMO USAR: Nomeie o problema direto, sem rodeios. Amplifique com dado real. Apresente a solução como caminho natural.
O produto é o veículo, não o herói. O herói é o cliente tomando a decisão.
Dado para amplificar: um brasileiro gasta em média R$120.000 em aluguel ao longo de 10 anos sem construir patrimônio.
Estrutura: headline com o problema central → amplificação com dado → promessa de saída → solução → prova social → CTA.
Exemplo adaptado: "${angulo.exemplo_imovel}"`,
  };

  const instrucoes_tipo = {
    copy: `TIPO: COPY DO SITE
Páginas: ${funil.paginas.join(" | ")}

Para cada página entregue nessa estrutura exata:
[HEADLINE] — máx 12 palavras, direto ao ponto
[SUBHEADLINE] — 1–2 linhas complementando a headline
[BULLETS] — 3 bullets de dor ou benefício (máx 15 palavras cada)
[CORPO] — texto principal em parágrafos curtos, linguagem oral
[CTA] — texto do botão de ação
[FAQ] — SOMENTE na última página: 5 perguntas reais com respostas diretas

Indique sempre de qual página é cada bloco. Copy pronto para colar diretamente nas páginas.`,

    vsl: `TIPO: SCRIPT VSL
Duração: ${funil.id === "urgencia" ? "2 minutos" : funil.id === "fgts" ? "2–3 minutos" : funil.id === "senior" ? "3–5 minutos" : "3–4 minutos"}
Tom: ${funil.tom}

Para cada bloco entregue:
[TEMPO] — ex: 0:00–0:20
[TELA] — o que aparece visualmente (texto sobreposto, imagem, animação)
[LOCUÇÃO] — exatamente o que o locutor fala (escrito para ser falado)
[B-ROLL] — sugestão de imagem ou vídeo de fundo

Ao final entregue também:
[THUMBNAIL] — sugestão de imagem de capa
[LEGENDA CURTA] — 1 linha para descrição do vídeo

Script pronto para teleprompter e locução direta.`,

    reels: `TIPO: SCRIPT DE REELS (30–60 segundos)
Tom: ${funil.tom}
Público: ${funil.subtitulo}

Entregue o script completo:
[HOOK 0–3s] — frase ou ação que segura o scroll nos primeiros 3 segundos (visual + verbal)
[DESENVOLVIMENTO 3–45s] — blocos curtos de 5–8 segundos cada
[CTA FINAL] — chamada para ação nos últimos 5 segundos
[TEXTO NA TELA] — lista de todos os textos sobrepostos ao vídeo
[LEGENDA] — texto completo para a legenda do post com hashtags
[SUGESTÃO DE TRILHA] — estilo de música ou som sugerido

Cada linha deve corresponder a uma fala ou ação de câmera.`,

    stories: `TIPO: SEQUÊNCIA DE STORIES (5 stories)
Tom: ${funil.tom}
Público: ${funil.subtitulo}

Para cada story:
[STORY X de 5]
[VISUAL] — o que aparece na tela (foto, vídeo, cor de fundo, sticker sugerido)
[TEXTO PRINCIPAL] — texto sobreposto (máx 3 linhas)
[ELEMENTO INTERATIVO] — enquete, caixa de pergunta, contagem regressiva, link (quando aplicável)
[TRANSIÇÃO] — como conecta com o próximo story

O story 5 deve ter CTA claro para formulário ou WhatsApp.
Progressão obrigatória: gancho → desenvolvimento → revelação → prova → ação.`,

    carrossel: `TIPO: CARROSSEL (capa + 6 slides + encerramento)
Tom: ${funil.tom}
Público: ${funil.subtitulo}

Para cada slide:
[CAPA] — título principal que para o scroll + subtítulo
[SLIDE 1 ao 6] — título do slide + texto (máx 4 linhas) + sugestão visual (cor, ícone, imagem)
[ENCERRAMENTO] — CTA + texto do botão + o que a pessoa deve fazer agora

Entregue também a legenda completa do post com hashtags.`,

    legenda: `TIPO: LEGENDA PARA FEED
Tom: ${funil.tom}
Público: ${funil.subtitulo}

Entregue 3 variações:

[VARIAÇÃO 1 — CURTA]
Até 3 linhas + hashtags. Primeira linha como hook (antes do "ver mais").

[VARIAÇÃO 2 — MÉDIA]
5–10 linhas + hashtags. Emojis estratégicos. CTA no final.

[VARIAÇÃO 3 — LONGA]
15–25 linhas em storytelling + hashtags. Hook forte na primeira linha. CTA para WhatsApp ou link na bio.

Para todas as variações: 10–15 hashtags (mix de volume alto, médio e específico de Campos/imóvel).`,

    modelagem: `TIPO: MODELAGEM E REVISÃO DE COPY
Público alvo da copy: ${funil.subtitulo}
Tom desejado: ${funil.tom}

ETAPA 1 — MODELAGEM (envie a copy e peça isso primeiro):
1. Preserve a essência e mensagem original
2. Reformule frases para garantir originalidade
3. Use linguagem clara e acessível para locução
4. Melhore fluidez e ritmo entre parágrafos
5. Adicione gatilhos emocionais do público (${funil.subtitulo}): medos, desejos, aspirações
6. Adapte referências para a realidade de Campos dos Goytacazes
7. Aplique: Open Loops, Prova Social, Benefícios Transformadores

ETAPA 2 — REVISÃO (somente após modelagem aprovada):
1. Correção ortográfica e gramatical
2. Pontuação para ritmo fluido de leitura e locução
3. Fluidez e coerência entre parágrafos
4. Clareza — elimine jargões desnecessários
5. Consistência de tom para o público (${funil.subtitulo})
6. Eliminação de redundâncias
7. Verificação de fatos e dados

Para cada alteração explique: O que mudou | Por que mudou | Como melhora a copy.
Entrega final: copy revisada, pronta para locução e conversão.`,
  };

  return `${ctx}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FUNIL: ${funil.nome}
ID: ${funil.slug}
PÚBLICO: ${funil.subtitulo}
VISUAL: ${funil.visual}
TOM: ${funil.tom}${funil.instrucao_extra ? `\nCONTEXTO: ${funil.instrucao_extra}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${instrucoes_angulo[angulo.id] || `ÂNGULO: ${angulo.nome}\nOBJETIVO: ${angulo.objetivo}`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${instrucoes_tipo[tipo] || `TIPO: ${tipo}`}
${extras ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nOBSERVAÇÕES ADICIONAIS:\n${extras}` : ""}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// MÉTRICAS E TESTES
// ─────────────────────────────────────────────────────────────────────────────
export const METRICAS_INFO = {
  hook:      { nome: "Hook Rate",        formula: "Visualizações 3s ÷ Reproduções totais", descricao: "Mede o poder do seu clickbait/gancho",             meta: "> 50%", cor: "blue"   },
  retencao:  { nome: "Retenção Body",    formula: "Reprodução 75% ÷ Reproduções totais",   descricao: "Quanto o corpo do anúncio está retendo",           meta: "> 25%", cor: "green"  },
  conversao: { nome: "Conversão Body",   formula: "Compras ÷ Reprodução 75%",              descricao: "Taxa de conversão do corpo para compra",           meta: "> 3%",  cor: "purple" },
};

export const TIPOS_TESTE = {
  horizontal: {
    nome: "Teste Horizontal",
    uso: "Ads validados — lateralização e escala",
    elementos: ["Clickbait", "Hook (primeiros segundos)", "Hypnotic Visual", "Banner Copy", "Headline", "Thumbnail", "Dimensões"],
    descricao: "Valide um ad → teste variações dos primeiros segundos. Gaste mais nos vencedores.",
  },
  vertical: {
    nome: "Teste Vertical",
    uso: "Criativos perdendo performance — aumentar vida útil",
    elementos: ["Interlocutor/ator", "CTA", "Prova social/depoimento", "Autoridade", "Video react flutuante", "Música/som", "Teste visual (cenário, takes)", "Narração", "Duração", "Dimensão"],
    descricao: "Criativo saturando → teste elementos internos para renovar sem criar do zero.",
  },
};
