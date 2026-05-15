import { useState } from "react";

const SB_URL = "https://okwqamdrgwbfyncqcide.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd3FhbWRyZ3diZnluY3FjaWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTg4NjksImV4cCI6MjA5NDE5NDg2OX0.g31os5TAoLaEPHyGGTg67r6BmxnoSxemMRklkO3d9zM";
const SB_HEADERS = { "Content-Type": "application/json", apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };

// ── Etapas do Modo Engenharia ─────────────────────────────────────────────────
const ETAPAS = [
  {
    id: "hooks", icon: "⚡", cor: "#6366f1", label: "Etapa 1 — Hooks sem contexto",
    resumo: "Hooks que funcionam para quem NUNCA viu o perfil. Curiosidade em 0–2s.",
    conteudo: `A lógica aqui é interromper o scroll de alguém que não te conhece. O hook precisa competir com memes, notícias e vídeos de cachorro. Se precisar de contexto prévio, morreu.

HOOK A — Dado chocante local:
"Em Campos dos Goytacazes, tem gente pagando aluguel com um dinheiro que já era dela. E não sabe."
→ Por que funciona: cria injustiça percebida imediata. O cérebro quer resolver a contradição.

HOOK B — Pergunta que dói:
"Você paga aluguel há mais de 2 anos? Então você provavelmente já tinha o suficiente pra ter saído."
→ Por que funciona: acusa sem culpar. Ativa vergonha e curiosidade ao mesmo tempo.

HOOK C — Número específico local:
"27 famílias em Campos fecharam contrato de apartamento em 48 horas. A maioria não sabia que podia."
→ Por que funciona: prova social hiperlocal sem depender de autoridade do perfil.`,
  },
  {
    id: "retencao", icon: "📊", cor: "#f59e0b", label: "Etapa 2 — Retenção acima da média",
    resumo: "Estrutura de tensão crescente, não de explicação linear. Cada 5s precisa de motivo.",
    conteudo: `Modelo de estrutura para Reels curtos (30–45s):

0–2s   → Hook (promessa ou dor)
2–8s   → Aprofundamento da tensão ("e o pior é que...")
8–20s  → Revelação em camadas (não tudo de uma vez)
20–30s → Virada / solução parcial
30–45s → CTA simples + micro-cliffhanger para salvar

TÉCNICAS DE MICRO-CURIOSIDADE:
• Cortes rápidos a cada 3–4s no Reel (evita drop)
• Texto na tela diferente do áudio (obriga atenção nos dois)
• Revelar a informação principal quase no final, nunca no meio
• Terminar com pergunta que convida comentário

O QUE MATA RETENÇÃO (proibido):
• Apresentação pessoal nos primeiros 5s ("Olá, sou o Pedro...")
• Logo de empresa na abertura
• Música alta demais cobrindo a voz
• Slide estático sem movimento por mais de 3s`,
  },
  {
    id: "sinais", icon: "🔄", cor: "#22c55e", label: "Etapa 3 — Sinais que escalam",
    resumo: "O Instagram testa em lotes pequenos e amplifica com base em sinais específicos.",
    conteudo: `SINAIS POR PESO:
🔥🔥🔥 Tempo de permanência → conteúdo com revelação tardia
🔥🔥🔥 Replay → informação densa que precisa ser revista
🔥🔥🔥 Salvamento → conteúdo utilitário ("guarda pra usar depois")
🔥🔥    Compartilhamento → conteúdo que o usuário quer mandar pra alguém
🔥🔥    Comentário simples → pergunta de sim/não no final
🔥      Clique no perfil → curiosidade sobre quem fez

PARA O PERFIL DO PEDRO, OS 3 MAIS FÁCEIS:
1. Salvamento — "guarda isso antes de pagar aluguel de novo"
2. Compartilhamento — conteúdo que alguém manda para o cônjuge ou familiar
3. Comentário simples — CTA tipo "comenta FGTS que eu te mando o cálculo"

O algoritmo interpreta esses sinais como: "esse conteúdo importa para as pessoas" e amplia progressivamente.`,
  },
  {
    id: "linguagem", icon: "🧠", cor: "#a855f7", label: "Etapa 4 — Linguagem para desconhecidos",
    resumo: "Falar como descoberta, não como venda. Clareza vence autoridade inicial.",
    conteudo: `Quem não te conhece aplica o filtro de desconfiança padrão. Qualquer coisa que soe como propaganda é ignorada em menos de 1 segundo.

PRINCÍPIO CENTRAL: falar como descoberta, não como venda.

❌ EVITAR → ✅ USAR:
"Realize o sonho da casa própria"
→ "Você provavelmente não sabe quanto do seu FGTS acumulou"

"Condições imperdíveis"
→ "Em 48 horas, 27 famílias saíram do aluguel. Aqui está o que elas usaram."

"Entre em contato para saber mais"
→ "Comenta FGTS que eu te mando uma simulação grátis"

"Apartamentos a partir de R$X"
→ "Calcula comigo: quanto você já pagou de aluguel nos últimos 3 anos?"

"Sou consultor especializado"
→ "Encontrei um dado aqui de Campos que me surpreendeu"

TOM GERAL DO PERFIL: Vizinho que descobriu algo importante e está contando pra você, não vendedor.`,
  },
  {
    id: "config", icon: "⚙️", cor: "#ef4444", label: "Config técnica do perfil",
    resumo: "Antes do post 1. Esses elementos afetam diretamente o alcance inicial.",
    conteudo: `Esses elementos não são opcionais — afetam diretamente o alcance inicial:

BIO: Sem "consultor imobiliário".
→ Usar: "Ajudo quem paga aluguel em Campos a descobrir se pode sair disso. 👇 Simulação grátis"

USERNAME: @pedroconsultor.campos ou similar
→ Cidade no nome ajuda no alcance geolocalizado

FOTO DE PERFIL: Rosto claro, fundo neutro. Sem logo.
→ Algoritmo e humanos confiam mais em rosto.

LINK NA BIO: WhatsApp com mensagem pré-preenchida
→ "Quero minha simulação grátis"

PRIMEIRO STORY: Enquete simples antes do post 1
→ "Você paga aluguel em Campos?" (Sim / Não)
→ Ativa algoritmo de stories no dia 1`,
  },
];

// ── 7 Posts da sequência de ataque ───────────────────────────────────────────
const POSTS = [
  {
    num: 1, formato: "Carrossel", cor: "#6366f1",
    dia: "Segunda · 19h",
    titulo: "Carrossel FGTS — Dinheiro parado",
    hook: '"Você sabia que tem um dinheiro parado no seu nome agora mesmo? A maioria das pessoas em Campos não sabe."',
    objetivo: "Tempo de permanência (arrastar slides) + salvamento + comentário simples",
    posicao: "Primeiro. O algoritmo testa carrossel com mais clemência para perfis novos. Conteúdo utilitário gera salvamento imediato.",
    estrutura: `SLIDE 1: Hook (texto grande, fundo limpo)
SLIDE 2: "O que é esse dinheiro?" → FGTS explicado em 1 frase
SLIDE 3: "Quanto você tem?" → tabela simples por tempo de carteira
SLIDE 4: "Para que serve?" → entrada de imóvel, explicado simplesmente
SLIDE 5: "Quer saber o seu saldo agora?" → CTA comentar "FGTS"`,
    fala: `[SLIDE 1] Você sabia que tem um dinheiro parado no seu nome agora mesmo?

[SLIDE 2] É o FGTS. Todo mês a empresa deposita 8% do seu salário numa conta que só você pode acessar.

[SLIDE 3] Quem tem 2 anos de carteira assinada geralmente tem entre R$3.000 e R$8.000 parado.

[SLIDE 4] E esse dinheiro pode virar a entrada de um apartamento em Campos. Sem tirar nada do bolso agora.

[SLIDE 5] Comenta "FGTS" aqui que eu te mando o cálculo do seu caso grátis.`,
  },
  {
    num: 2, formato: "Reel 30s", cor: "#f59e0b",
    dia: "Quarta · 12h",
    titulo: "Reel — Cálculo do aluguel perdido",
    hook: '"Eu calculei quanto uma família em Campos paga de aluguel em 5 anos. O número me deixou mal."',
    objetivo: "Retenção + replay (número chocante faz rever) + comentário",
    posicao: "Segundo. Apresenta o rosto do Pedro sem se apresentar formalmente. O algoritmo começa a associar pessoa + conteúdo.",
    estrutura: `0–3s:  Hook falado + número na tela (R$78.000)
3–15s: "E o pior: parte desse valor já estava disponível como entrada de um apartamento"
15–25s: Explicação rápida de como o FGTS cobre a entrada
25–30s: "Comenta SIMULAR que eu te mando os números do seu caso"`,
    fala: `[0–3s] 🎙 FALA: "Eu calculei quanto uma família em Campos paga de aluguel em 5 anos."
📱 TELA: R$ 78.000 em texto grande

[3–15s] 🎙 FALA: "E o pior — parte desse dinheiro já estava disponível como entrada de um apartamento. No FGTS dela."
📱 TELA: "Parte desse valor já era DELA"

[15–25s] 🎙 FALA: "Quem tem carteira assinada acumula FGTS todo mês. E esse saldo pode cobrir a entrada."
📱 TELA: FGTS → entrada → apartamento (seta simples)

[25–30s] 🎙 FALA: "Comenta SIMULAR aqui que eu te mando os números do seu caso."
📱 TELA: "Comenta SIMULAR 👇"`,
  },
  {
    num: 3, formato: "Carrossel", cor: "#22c55e",
    dia: "Sexta · 18h",
    titulo: "Carrossel — Calculadora visual FGTS",
    hook: '"Guarda esse carrossel. Qualquer pessoa com carteira assinada em Campos pode fazer essa conta."',
    objetivo: "Salvamento + compartilhamento (CTA explícito para mandar para alguém)",
    posicao: "Terceiro. Primeiro conteúdo com alto potencial de compartilhamento. O 'manda pra alguém' é o primeiro gatilho de efeito rede.",
    estrutura: `SLIDE 1: Hook
SLIDE 2: "Passo 1 — Descubra seu FGTS" (como acessar pelo app)
SLIDE 3: "Passo 2 — Some com sua renda mensal"
SLIDE 4: "Passo 3 — Veja qual faixa de imóvel você pode financiar"
SLIDE 5: Tabela simples (renda × valor do imóvel)
SLIDE 6: "Manda pra alguém que paga aluguel em Campos"`,
    fala: `[SLIDE 1] Guarda esse carrossel. Se você tem carteira assinada em Campos, essa conta é sua.

[SLIDE 2] Passo 1: Baixe o app FGTS e veja seu saldo atual. Simples assim.

[SLIDE 3] Passo 2: Some esse valor com sua renda mensal bruta.

[SLIDE 4] Passo 3: Com essa informação, dá pra calcular exatamente qual imóvel você consegue financiar.

[SLIDE 5] [TABELA: Renda R$2k → até R$130k | Renda R$3k → até R$160k | Renda R$4k → até R$185k]

[SLIDE 6] Manda pra alguém que paga aluguel em Campos. Pode ser a virada que ela precisa.`,
  },
  {
    num: 4, formato: "Reel 45s", cor: "#ef4444",
    dia: "Domingo · 11h",
    titulo: "Reel — Prova social 27 contratos",
    hook: '"Em 2 dias em Campos, 27 famílias assinaram contrato de apartamento. Isso foi real."',
    objetivo: "Retenção alta + comentários + clique no perfil",
    posicao: "Quarto. Primeiro uso da prova social dos 27 contratos. Só funciona aqui porque o algoritmo já tem dados de retenção dos posts anteriores.",
    estrutura: `0–3s:  Hook + número na tela
3–15s: "A maioria usou o FGTS como entrada. Muitos nem sabiam que tinham esse valor."
15–30s: Perfil de quem comprou (sem nome): "CLT, 32 anos, pagava R$900 de aluguel..."
30–40s: "O condomínio tem prainha exclusiva, piscinas, portaria 24h — em Campos"
40–45s: "Comenta QUERO que eu te explico como funciona"`,
    fala: `[0–3s] 🎙 FALA: "Em 2 dias em Campos, 27 famílias assinaram contrato de apartamento."
📱 TELA: "27 famílias · 48 horas · Campos"

[3–15s] 🎙 FALA: "A maioria usou o FGTS como entrada. Muitos nem sabiam que tinham esse valor acumulado."
📱 TELA: "A maioria não sabia que podia"

[15–30s] 🎙 FALA: "Uma delas: CLT, 32 anos, pagava R$900 de aluguel há 6 anos. Saiu com parcela menor que o aluguel."
📱 TELA: "Parcela < aluguel"

[30–40s] 🎙 FALA: "O condomínio tem prainha exclusiva, piscinas, salão gourmet, portaria 24h. Em Campos."
📱 TELA: fotos do empreendimento

[40–45s] 🎙 FALA: "Comenta QUERO aqui que eu te explico se você se encaixa."
📱 TELA: "Comenta QUERO 👇"`,
  },
  {
    num: 5, formato: "Carrossel", cor: "#a855f7",
    dia: "Terça · 19h",
    titulo: "Carrossel — 5 Mitos do FGTS",
    hook: '"5 coisas que as pessoas acreditam sobre FGTS que estão erradas. A número 3 surpreende."',
    objetivo: "Comentários segmentados (leads qualificados) + salvamento + tempo de permanência",
    posicao: "Quinto. Conteúdo de qualificação — separa quem tem FGTS disponível. Quem comenta é exatamente o público-alvo.",
    estrutura: `SLIDE 1: Hook
SLIDES 2–6: Um mito por slide
  → "Mito: só posso usar depois de ser demitido"
  → "Verdade: você pode usar para compra de imóvel mesmo empregado"
SLIDE 7: "Qual desses mitos você acreditava? Comenta o número"`,
    fala: `[SLIDE 1] 5 coisas que as pessoas acreditam sobre FGTS que estão completamente erradas.

[SLIDE 2] MITO 1: "Só posso usar se for demitido"
VERDADE: Você pode usar o FGTS para comprar um imóvel a qualquer momento, mesmo empregado.

[SLIDE 3] MITO 2: "Meu FGTS é pouco, não dá pra nada"
VERDADE: 2 anos de carteira já podem cobrir entrada + custos de transferência.

[SLIDE 4] MITO 3: "Tenho que ter muito dinheiro além do FGTS"
VERDADE: Pelo MCMV, o subsídio do governo cobre o que o FGTS não alcança.

[SLIDE 5] MITO 4: "Nome sujo impede de comprar"
VERDADE: Existem formas de usar o FGTS mesmo com restrições em alguns casos. Vale consultar.

[SLIDE 6] MITO 5: "A parcela vai ser maior que meu aluguel"
VERDADE: Para quem se encaixa no MCMV, a parcela costuma ser menor que o aluguel atual.

[SLIDE 7] Qual desses mitos você acreditava? Comenta o número aqui embaixo 👇`,
  },
  {
    num: 6, formato: "Reel 60s", cor: "#14b8a6",
    dia: "Quinta · 18h",
    titulo: "Reel — Tour pelo condomínio",
    hook: '"Esse condomínio fica em Campos e tem prainha. Deixa eu te mostrar."',
    objetivo: "Retenção + compartilhamento (conteúdo visual de impacto) + geração de leads via WhatsApp",
    posicao: "Sexto. Mostrar o produto cedo demais parece propaganda. Aqui o algoritmo já entregou para o público certo — quem chega está aquecido.",
    estrutura: `0–3s:  Hook + imagem impactante da prainha
3–20s: Tour rápido (piscinas, salão gourmet, portaria 24h) — cortes a cada 2–3s
20–40s: "E o valor cabe no FGTS de quem tem carteira assinada há mais de 2 anos"
40–55s: "Comenta TOUR que eu te mando o vídeo completo no WhatsApp"
55–60s: Endereço geral (Av. Presidente Vargas, Campos)`,
    fala: `[0–3s] 🎙 FALA: "Esse condomínio fica em Campos e tem prainha exclusiva."
📱 TELA: imagem da prainha/piscina
🎬 DIREÇÃO: câmera frontal próxima, corte seco para a imagem

[3–20s] 🎙 FALA: "Piscinas, salão gourmet, churrasqueira, playground, portaria 24 horas."
📱 TELA: cortes rápidos de cada área a cada 2–3s
🎬 DIREÇÃO: edição dinâmica, música de fundo suave

[20–40s] 🎙 FALA: "E o que poucos sabem: o valor do imóvel cabe no FGTS de quem tem carteira assinada há mais de 2 anos em Campos."
📱 TELA: "Cabe no FGTS" em texto grande

[40–55s] 🎙 FALA: "Comenta TOUR aqui que eu te mando o vídeo completo no WhatsApp."
📱 TELA: "Comenta TOUR 👇"

[55–60s] 📱 TELA: "Parque Ilha Bela · Av. Presidente Vargas · Campos/RJ"`,
  },
  {
    num: 7, formato: "Reel 30s", cor: "#ef4444",
    dia: "Sábado · 10h",
    titulo: "Reel — Urgência real, sem fake",
    hook: '"Ainda tem unidades. Mas os 27 contratos em 48 horas foram aviso."',
    objetivo: "Conversão direta + comentário como funil de entrada",
    posicao: "Sétimo. Urgência sem contexto é spam. Com 6 posts de valor acumulado, a urgência é percebida como informação. O lead que chega aqui já foi educado.",
    estrutura: `0–3s:  Hook + número na tela
3–15s: "Quem entrou na pré-venda garantiu condições que não voltam depois do lançamento oficial"
15–25s: "Se você tem carteira assinada e paga aluguel em Campos, você provavelmente se encaixa"
25–30s: "Link na bio → simulação grátis. Ou comenta SIMULAR aqui."`,
    fala: `[0–3s] 🎙 FALA: "Ainda tem unidades. Mas os 27 contratos em 48 horas foram aviso."
📱 TELA: "27 contratos · 48h" em vermelho

[3–15s] 🎙 FALA: "Quem entrou na pré-venda garantiu condições que não voltam depois do lançamento oficial. Preço, parcela, andar."
📱 TELA: "Preço de lançamento não volta"

[15–25s] 🎙 FALA: "Se você tem carteira assinada e paga aluguel em Campos, você provavelmente se encaixa."
📱 TELA: "Carteira assinada + aluguel em Campos = você se encaixa"

[25–30s] 🎙 FALA: "Link na bio pra simulação grátis. Ou comenta SIMULAR aqui."
📱 TELA: "👆 Link na bio · ou comenta SIMULAR"`,
  },
];

// ── Calendário ────────────────────────────────────────────────────────────────
const CALENDARIO = [
  { dia: "Segunda",  horario: "19h", post: 1, tipo: "Carrossel FGTS" },
  { dia: "Quarta",   horario: "12h", post: 2, tipo: "Reel cálculo" },
  { dia: "Sexta",    horario: "18h", post: 3, tipo: "Calculadora visual" },
  { dia: "Domingo",  horario: "11h", post: 4, tipo: "Prova social" },
  { dia: "Terça",    horario: "19h", post: 5, tipo: "Mitos FGTS" },
  { dia: "Quinta",   horario: "18h", post: 6, tipo: "Tour condomínio" },
  { dia: "Sábado",   horario: "10h", post: 7, tipo: "Urgência + CTA" },
];

async function salvarNoKanban(post) {
  try {
    await fetch(`${SB_URL}/rest/v1/kanban_cards`, {
      method: "POST",
      headers: { ...SB_HEADERS, Prefer: "return=minimal" },
      body: JSON.stringify({
        titulo: `Post ${post.num} — ${post.titulo}`,
        funil_id: "v1", funil_nome: "Lançamento", funil_cor: "indigo",
        angulo_id: "nova_descoberta", angulo_nome: "Nova Descoberta", angulo_emoji: "🚀",
        tipo_id: post.formato.includes("Reel") ? "reels" : "carrossel",
        tipo_label: post.formato,
        tipo_icon: post.formato.includes("Reel") ? "📱" : "🗂️",
        hook: "", roas: "", notas: `Calendário: ${post.dia}`,
        narracao: `HOOK:\n${post.hook}\n\nESTRUTURA:\n${post.estrutura}\n\nFALA / TELA / DIREÇÃO:\n${post.fala}`,
        legenda: "", link_video: "",
        coluna: "a_testar",
      }),
    });
    return true;
  } catch { return false; }
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function PageLancamento() {
  const [aba, setAba]               = useState("sequencia"); // sequencia | etapas | calendario | gerador
  const [postAberto, setPostAberto] = useState(null);
  const [etapaAberta, setEtapaAberta] = useState(null);
  const [savedPosts, setSavedPosts] = useState({});
  const [copiados, setCopiados]     = useState({});
  const [tab, setTab]               = useState({}); // por post: fala|estrutura

  async function handleSalvar(post) {
    const ok = await salvarNoKanban(post);
    if (ok) setSavedPosts(p => ({ ...p, [post.num]: true }));
  }

  function copiar(key, texto) {
    navigator.clipboard.writeText(texto);
    setCopiados(p => ({ ...p, [key]: true }));
    setTimeout(() => setCopiados(p => ({ ...p, [key]: false })), 2000);
  }

  return (
    <div style={{ padding: 28, maxWidth: 1000, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>🚀 Lançamento do Perfil</h1>
        <p style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
          Modo Engenharia — estratégia de alcance massivo para perfil zero no Instagram.
        </p>
      </div>

      {/* Abas */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, borderBottom: "1px solid #1e1e1e", paddingBottom: 0 }}>
        {[
          { id: "sequencia", label: "📋 Sequência de 7 posts" },
          { id: "etapas",    label: "⚡ 5 Etapas" },
          { id: "calendario",label: "📅 Calendário" },
        ].map(a => (
          <button key={a.id} onClick={() => setAba(a.id)} style={{
            fontSize: 12, padding: "8px 16px",
            border: "none", borderBottom: aba === a.id ? "2px solid #22c55e" : "2px solid transparent",
            background: "transparent",
            color: aba === a.id ? "#22c55e" : "#555",
            fontWeight: aba === a.id ? 600 : 400,
            cursor: "pointer", marginBottom: -1,
          }}>{a.label}</button>
        ))}
      </div>

      {/* ABA: Sequência */}
      {aba === "sequencia" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {POSTS.map(post => {
            const aberto = postAberto === post.num;
            const tabAtiva = tab[post.num] || "fala";
            return (
              <div key={post.num} style={{
                background: "#111", border: `1px solid ${aberto ? post.cor + "55" : "#1e1e1e"}`,
                borderLeft: `3px solid ${post.cor}`,
                borderRadius: 12, overflow: "hidden",
              }}>
                {/* Header do post */}
                <div
                  onClick={() => setPostAberto(aberto ? null : post.num)}
                  style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: post.cor + "22", border: `1px solid ${post.cor}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: post.cor,
                  }}>{post.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{post.titulo}</span>
                      <span style={{ fontSize: 9, padding: "1px 7px", borderRadius: 4, background: post.cor + "22", color: post.cor }}>{post.formato}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{post.dia} · {post.objetivo.split("+")[0].trim()}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <button
                      onClick={e => { e.stopPropagation(); handleSalvar(post); }}
                      style={{
                        fontSize: 10, padding: "4px 10px", borderRadius: 6,
                        border: savedPosts[post.num] ? "1px solid #22c55e55" : "1px solid #222",
                        background: savedPosts[post.num] ? "#22c55e22" : "#1a1a1a",
                        color: savedPosts[post.num] ? "#22c55e" : "#666", cursor: "pointer",
                      }}
                    >{savedPosts[post.num] ? "✓ Salvo" : "▤ Kanban"}</button>
                    <span style={{ color: "#333", fontSize: 12 }}>{aberto ? "▲" : "▼"}</span>
                  </div>
                </div>

                {/* Corpo expandido */}
                {aberto && (
                  <div style={{ borderTop: "1px solid #1a1a1a" }}>
                    {/* Hook */}
                    <div style={{ padding: "14px 18px", borderBottom: "1px solid #1a1a1a" }}>
                      <div style={secLabel}>Hook</div>
                      <div style={{ fontSize: 13, color: "#ddd", lineHeight: 1.6, fontStyle: "italic" }}>{post.hook}</div>
                      <button onClick={() => copiar(`hook-${post.num}`, post.hook)}
                        style={copyBtn(copiados[`hook-${post.num}`])}>
                        {copiados[`hook-${post.num}`] ? "✓ Copiado" : "Copiar"}
                      </button>
                    </div>

                    {/* Objetivo + posição */}
                    <div style={{ padding: "12px 18px", borderBottom: "1px solid #1a1a1a", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div>
                        <div style={secLabel}>Objetivo algorítmico</div>
                        <div style={{ fontSize: 11, color: "#888", lineHeight: 1.6 }}>{post.objetivo}</div>
                      </div>
                      <div>
                        <div style={secLabel}>Por que nessa posição</div>
                        <div style={{ fontSize: 11, color: "#888", lineHeight: 1.6 }}>{post.posicao}</div>
                      </div>
                    </div>

                    {/* Tabs: Estrutura | Fala/Tela/Direção */}
                    <div style={{ padding: "0 18px", borderBottom: "1px solid #1a1a1a", display: "flex", gap: 0 }}>
                      {["fala", "estrutura"].map(t => (
                        <button key={t} onClick={() => setTab(p => ({ ...p, [post.num]: t }))}
                          style={{
                            fontSize: 11, padding: "8px 14px", border: "none",
                            borderBottom: tabAtiva === t ? "2px solid #22c55e" : "2px solid transparent",
                            background: "transparent",
                            color: tabAtiva === t ? "#22c55e" : "#555",
                            cursor: "pointer", marginBottom: -1,
                          }}>
                          {t === "fala" ? "🎙 Fala / Tela / Direção" : "📋 Estrutura dos slides"}
                        </button>
                      ))}
                    </div>

                    <div style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                        <button
                          onClick={() => copiar(`${tabAtiva}-${post.num}`, tabAtiva === "fala" ? post.fala : post.estrutura)}
                          style={copyBtn(copiados[`${tabAtiva}-${post.num}`])}>
                          {copiados[`${tabAtiva}-${post.num}`] ? "✓ Copiado" : "Copiar"}
                        </button>
                      </div>
                      <pre style={{
                        margin: 0, fontSize: 12, lineHeight: 1.8, color: "#bbb",
                        whiteSpace: "pre-wrap", wordBreak: "break-word",
                        fontFamily: "inherit",
                      }}>
                        {tabAtiva === "fala" ? post.fala : post.estrutura}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ABA: Etapas */}
      {aba === "etapas" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ETAPAS.map(e => {
            const aberto = etapaAberta === e.id;
            return (
              <div key={e.id} style={{
                background: "#111", border: `1px solid ${aberto ? e.cor + "55" : "#1e1e1e"}`,
                borderLeft: `3px solid ${e.cor}`, borderRadius: 12, overflow: "hidden",
              }}>
                <div onClick={() => setEtapaAberta(aberto ? null : e.id)}
                  style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{e.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{e.label}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{e.resumo}</div>
                  </div>
                  <span style={{ color: "#333", fontSize: 12 }}>{aberto ? "▲" : "▼"}</span>
                </div>
                {aberto && (
                  <div style={{ borderTop: "1px solid #1a1a1a", padding: "16px 18px" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                      <button onClick={() => copiar(`etapa-${e.id}`, e.conteudo)} style={copyBtn(copiados[`etapa-${e.id}`])}>
                        {copiados[`etapa-${e.id}`] ? "✓ Copiado" : "Copiar"}
                      </button>
                    </div>
                    <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: "#bbb", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "inherit" }}>
                      {e.conteudo}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ABA: Calendário */}
      {aba === "calendario" && (
        <div>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 16, lineHeight: 1.7 }}>
            Alternar carrossel e Reel evita que o algoritmo enjoe do formato. Horários seguem picos de uso para trabalhadores CLT em cidade do interior (almoço e fim do expediente).
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CALENDARIO.map((c, i) => {
              const post = POSTS.find(p => p.num === c.post);
              return (
                <div key={i} style={{
                  background: "#111", border: "1px solid #1e1e1e",
                  borderLeft: `3px solid ${post?.cor || "#555"}`,
                  borderRadius: 10, padding: "12px 18px",
                  display: "flex", alignItems: "center", gap: 16,
                }}>
                  <div style={{ minWidth: 80 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd" }}>{c.dia}</div>
                    <div style={{ fontSize: 11, color: "#555" }}>{c.horario}</div>
                  </div>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: post?.cor + "22", border: `1px solid ${post?.cor}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: post?.cor, flexShrink: 0,
                  }}>{c.post}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "#ccc" }}>{post?.titulo}</div>
                    <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>{post?.formato}</div>
                  </div>
                  <button
                    onClick={() => { setAba("sequencia"); setPostAberto(c.post); }}
                    style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, border: "1px solid #222", background: "#1a1a1a", color: "#666", cursor: "pointer" }}
                  >Ver post →</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

// ── Helpers de estilo ─────────────────────────────────────────────────────────
const secLabel = { fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6, fontWeight: 600 };
const copyBtn = (copiado) => ({
  fontSize: 10, padding: "3px 10px", borderRadius: 5, cursor: "pointer",
  border: copiado ? "1px solid #22c55e55" : "1px solid #222",
  background: copiado ? "#22c55e22" : "#1a1a1a",
  color: copiado ? "#22c55e" : "#555",
});