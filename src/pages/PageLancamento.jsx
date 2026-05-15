import { useState } from "react";
import { FUNIS_BASE } from "../data";

const SB_URL = "https://okwqamdrgwbfyncqcide.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd3FhbWRyZ3diZnluY3FjaWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTg4NjksImV4cCI6MjA5NDE5NDg2OX0.g31os5TAoLaEPHyGGTg67r6BmxnoSxemMRklkO3d9zM";
const SB_HEADERS = { "Content-Type": "application/json", apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };

// ── Etapas do Modo Engenharia ─────────────────────────────────────────────────
const ETAPAS = [
  {
    num: 1, icon: "⚡", cor: "#6366f1",
    titulo: "Hook que funciona sem contexto",
    desc: "Crie hooks que façam sentido para quem NUNCA viu o perfil. Geram curiosidade imediata em 0–2s, não dependem de autoridade prévia e prometam algo específico e observável.",
    regra: "Proibido: hooks que pressupõem que a pessoa já conhece o produto ou o consultor.",
  },
  {
    num: 2, icon: "📊", cor: "#f59e0b",
    titulo: "Retenção acima da média",
    desc: "Estruture o conteúdo para evitar pausas mortas, criar micro-curiosidades, manter ritmo visual e incentivar replays naturais.",
    regra: "Conteúdo linear morre rápido. Cada 5s precisa de um motivo para continuar assistindo.",
  },
  {
    num: 3, icon: "🔄", cor: "#22c55e",
    titulo: "Sinais que escalam a entrega",
    desc: "Otimize para gerar: tempo de permanência, salvamentos, compartilhamentos e comentários simples.",
    regra: "Cada conteúdo deve ter uma mecânica clara de engajamento — ex: 'Salve pra lembrar' ou 'Qual é a sua faixa?'",
  },
  {
    num: 4, icon: "🧠", cor: "#a855f7",
    titulo: "Linguagem para desconhecidos",
    desc: "Adapte para quem não confia ainda, decide rápido se fica ou sai, e não entende jargão imobiliário.",
    regra: "Clareza vence autoridade inicial. Zero jargão: sem 'FGTS como garantia fiduciária' — use 'seu dinheiro do trabalho vira a entrada'.",
  },
  {
    num: 5, icon: "🚀", cor: "#ef4444",
    titulo: "Sequência de ataque (perfil zero)",
    desc: "5 a 10 conteúdos iniciais com objetivo algorítmico claro. Progressão do simples ao mais ousado. A ordem importa tanto quanto o conteúdo.",
    regra: "Não poste aleatório. Cada publicação tem um objetivo algorítmico específico.",
  },
];

// ── Formatos de conteúdo para a sequência ────────────────────────────────────
const FORMATOS = [
  { id: "reels_curiosidade", label: "Reels · Curiosidade",     objetivo: "Alcance inicial — aparecer para não seguidores" },
  { id: "reels_contrario",   label: "Reels · Contrário",       objetivo: "Retenção alta — quebrar crença gera replay" },
  { id: "carrossel_edu",     label: "Carrossel · Educativo",   objetivo: "Salvamentos — conteúdo que as pessoas guardam" },
  { id: "reels_prova",       label: "Reels · Prova social",    objetivo: "Comentários — 27 contratos gera discussão" },
  { id: "stories_interacao", label: "Stories · Interação",     objetivo: "Respostas — enquete sobre renda/aluguel" },
  { id: "reels_mecanismo",   label: "Reels · Teaser mecanismo", objetivo: "Compartilhamentos — 'manda pra quem paga aluguel'" },
  { id: "carrossel_quiz",    label: "Carrossel · Pop Quiz",    objetivo: "Comentários — quiz sobre FGTS" },
  { id: "reels_historia",    label: "Reels · História",        objetivo: "Replays — storytelling emocional" },
];

// ── Contexto base do Pedro ────────────────────────────────────────────────────
const CONTEXTO_PEDRO = `Perfil: consultor imobiliário Pedro, lançando perfil novo do zero no Instagram.
Produto: Parque Ilha Bela — apê 2 quartos em Campos dos Goytacazes/RJ. MRV + MCMV.
Diferencial: prainha exclusiva, piscinas, salão gourmet, condomínio fechado 24h.
Prova social: 27 contratos e R$5,6mi em 2 dias de pré-venda.
Públicos: trabalhadores 25–45 anos, CLT com FGTS, sênior 50+, procrastinadores.
Objetivo do perfil: gerar leads qualificados para os 4 funis de captura.
Regra absoluta: nunca mencionar a marca MRV diretamente no copy público.`;

export default function PageLancamento({ funis = [] }) {
  const [etapaAtiva, setEtapaAtiva]     = useState(null);
  const [sequencia, setSequencia]       = useState([]);
  const [gerando, setGerando]           = useState(false);
  const [promptGerado, setPromptGerado] = useState("");
  const [copiado, setCópiado]           = useState(false);
  const [savedOk, setSavedOk]           = useState(false);
  const [nicho, setNicho]               = useState("imóveis populares MCMV em Campos dos Goytacazes");
  const [publico, setPublico]           = useState("trabalhadores CLT 25–45 anos que pagam aluguel e não sabem que podem usar o FGTS");
  const [objetivo, setObjetivo]         = useState("leads qualificados para simulação gratuita via WhatsApp");
  const [estilo, setEstilo]             = useState("educativo com urgência sutil");

  function toggleSequencia(id) {
    setSequencia(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function gerarPromptModoEngenharia() {
    const seqSelecionada = FORMATOS.filter(f => sequencia.includes(f.id));
    return `${CONTEXTO_PEDRO}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 MODO ENGENHARIA: ALCANCE MASSIVO COM PERFIL ZERO

Você atua como um Especialista em Distribuição Algorítmica do Instagram com domínio em: alcance para não-seguidores, conteúdo testável, retenção extrema, efeito rede, Reels, Explorar e crescimento do zero.

OBJETIVO: Criar uma estratégia onde um perfil com 0 seguidores consiga ser exibido para dezenas de milhares de pessoas em Campos dos Goytacazes e região.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DADOS DO PERFIL:
Nicho: ${nicho}
Público que AINDA NÃO ME CONHECE: ${publico}
Objetivo do conteúdo inicial: ${objetivo}
Estilo desejado: ${estilo}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REGRA ZERO (OBRIGATÓRIA):
Antes de criar qualquer conteúdo, confirme:
1. O hook funciona para quem NUNCA viu o perfil?
2. O conteúdo gera curiosidade imediata em 0–2s?
3. Não depende de autoridade prévia?
4. Promete algo específico e observável?
5. Usa linguagem para desconhecidos (zero jargão imobiliário)?
⚠️ Não avance sem essas respostas confirmadas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LÓGICA DE TESTE DO ALGORITMO:
Todo conteúdo deve seguir esta cadeia:
Teste inicial → Retenção alta → Replays → Interações rápidas → Ampliação de alcance
Se o conteúdo não passa no teste inicial, ele é descartado.

⚡ ETAPA 1 — HOOK QUE FUNCIONA SEM CONTEXTO:
Hooks que façam sentido para quem nunca viu o perfil. Curiosidade imediata 0–2s. Sem dependência de autoridade. Promessa específica e observável.
Explique SEMPRE: por que esse hook funciona para não-seguidores.

📊 ETAPA 2 — RETENÇÃO ACIMA DA MÉDIA:
Evitar pausas mortas. Criar micro-curiosidades. Manter ritmo visual. Incentivar replays naturais.
Conteúdo linear morre rápido.

🔄 ETAPA 3 — SINAIS QUE ESCALAM A ENTREGA:
Otimize para: tempo de permanência, salvamentos, compartilhamentos, comentários simples.
Explique quais sinais estão sendo ativados e por que o Instagram amplia a entrega.

🧠 ETAPA 4 — LINGUAGEM PARA DESCONHECIDOS:
Adapte para: quem não confia ainda, quem decide rápido se fica ou sai, quem não entende jargão do nicho.
Clareza vence autoridade inicial.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 ETAPA 5 — SEQUÊNCIA DE ATAQUE:
${seqSelecionada.length > 0
  ? `Crie os ${seqSelecionada.length} conteúdos iniciais nesta ordem e formato:
${seqSelecionada.map((f, i) => `${i + 1}. ${f.label} → Objetivo: ${f.objetivo}`).join("\n")}

Para CADA conteúdo entregue no formato de tabela de produção:

━━ [CONTEÚDO X: título] ━━

🎙 FALA:
(exatamente o que será dito — linguagem oral, sem jargão)

📱 TELA:
(texto sobreposto, sticker, elemento visual — exatamente o que aparece)

🎬 DIREÇÃO:
(enquadramento, ritmo de corte, movimento de câmera)

🔘 OBJETIVO ALGORÍTMICO:
(qual sinal está sendo ativado e por quê o algoritmo vai amplificar)`
  : `Crie uma sequência de 7 conteúdos iniciais com objetivo algorítmico claro para o perfil do consultor Pedro.
Progressão: do simples ao mais ousado. Explique a lógica da ordem de postagem.
Para cada conteúdo: formato, hook, objetivo algorítmico e por que vem nessa posição.`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REGRAS ABSOLUTAS:
• Proibido depender de seguidores
• Proibido conteúdo genérico ("compre seu apê dos sonhos")
• Proibido trend sem lógica algorítmica
• Sempre explicar o PORQUÊ de cada escolha
• Pensar como o algoritmo pensa, não como um criador iniciante

RESULTADO ESPERADO:
Um perfil que ganha alcance mesmo zerado, é testado pelo algoritmo, aparece para milhares de pessoas em Campos e constrói base rápida e qualificada.

Execute como um engenheiro de alcance, não como um criador iniciante.`;
  }

  async function salvarNoKanban(prompt) {
    try {
      await fetch(`${SB_URL}/rest/v1/kanban_cards`, {
        method: "POST",
        headers: { ...SB_HEADERS, Prefer: "return=minimal" },
        body: JSON.stringify({
          titulo: "🚀 Lançamento · Modo Engenharia · Perfil Zero",
          funil_id: "v1", funil_nome: "Lançamento", funil_cor: "indigo",
          angulo_id: "nova_descoberta", angulo_nome: "Nova Descoberta", angulo_emoji: "🚀",
          tipo_id: "social", tipo_label: "Sequência de Lançamento", tipo_icon: "🚀",
          hook: "", roas: "", notas: "",
          narracao: prompt, legenda: "", link_video: "",
          coluna: "a_testar",
        }),
      });
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 2500);
    } catch (e) { console.error(e); }
  }

  function gerarECopiar() {
    const p = gerarPromptModoEngenharia();
    setPromptGerado(p);
  }

  function copiar() {
    navigator.clipboard.writeText(promptGerado).then(() => {
      setCópiado(true);
      setTimeout(() => setCópiado(false), 2500);
    });
  }

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>🚀 Lançamento do Perfil</h1>
        <p style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
          Modo Engenharia — estratégia de alcance massivo para perfil zero no Instagram.
        </p>
      </div>

      {/* Contexto do perfil */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={sectionLabel}>Contexto do perfil</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FRow label="Nicho">
            <input value={nicho} onChange={e => setNicho(e.target.value)} style={inp} />
          </FRow>
          <FRow label="Objetivo do conteúdo">
            <input value={objetivo} onChange={e => setObjetivo(e.target.value)} style={inp} />
          </FRow>
          <FRow label="Público que ainda não me conhece">
            <input value={publico} onChange={e => setPublico(e.target.value)} style={inp} />
          </FRow>
          <FRow label="Estilo desejado">
            <input value={estilo} onChange={e => setEstilo(e.target.value)} style={inp} />
          </FRow>
        </div>
      </div>

      {/* 5 Etapas */}
      <div style={{ marginBottom: 20 }}>
        <div style={sectionLabel}>As 5 etapas do Modo Engenharia</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ETAPAS.map(e => (
            <div
              key={e.num}
              onClick={() => setEtapaAtiva(etapaAtiva === e.num ? null : e.num)}
              style={{
                background: "#111", border: `1px solid ${etapaAtiva === e.num ? e.cor + "55" : "#1e1e1e"}`,
                borderLeft: `3px solid ${e.cor}`,
                borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{e.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#ddd" }}>Etapa {e.num} — {e.titulo}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{e.desc}</div>
                  </div>
                </div>
                <span style={{ color: "#333", fontSize: 12 }}>{etapaAtiva === e.num ? "▲" : "▼"}</span>
              </div>
              {etapaAtiva === e.num && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1a1a1a" }}>
                  <div style={{ fontSize: 11, color: e.cor, fontWeight: 600, marginBottom: 4 }}>⚠️ Regra:</div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{e.regra}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sequência de ataque */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={sectionLabel}>Montar sequência de ataque</div>
        <div style={{ fontSize: 11, color: "#555", marginBottom: 14 }}>
          Selecione os formatos que quer na sequência (a ordem selecionada é a ordem de postagem)
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {FORMATOS.map((f, i) => {
            const sel = sequencia.includes(f.id);
            const pos = sequencia.indexOf(f.id);
            return (
              <div
                key={f.id}
                onClick={() => toggleSequencia(f.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 14px", borderRadius: 9, cursor: "pointer",
                  background: sel ? "#22c55e11" : "#0d0d0d",
                  border: sel ? "1px solid #22c55e44" : "1px solid #1a1a1a",
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  background: sel ? "#22c55e" : "#1a1a1a",
                  border: sel ? "none" : "1px solid #333",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: sel ? "#000" : "#444",
                }}>
                  {sel ? pos + 1 : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: sel ? "#fff" : "#888" }}>{f.label}</div>
                  <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>{f.objetivo}</div>
                </div>
                {sel && <span style={{ fontSize: 9, color: "#22c55e", background: "#22c55e22", padding: "2px 7px", borderRadius: 4 }}>✓ selecionado</span>}
              </div>
            );
          })}
        </div>
        {sequencia.length > 0 && (
          <div style={{ marginTop: 12, fontSize: 11, color: "#555" }}>
            {sequencia.length} conteúdos na sequência · ordem de postagem selecionada
          </div>
        )}
      </div>

      {/* Gerar prompt */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>
            {promptGerado ? "✓ Prompt pronto — cole no ChatGPT" : "Configure acima e gere o prompt"}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {promptGerado && (
              <>
                <button
                  onClick={() => salvarNoKanban(promptGerado)}
                  style={{
                    fontSize: 11, padding: "6px 12px", borderRadius: 6,
                    border: savedOk ? "1px solid #22c55e55" : "1px solid #222",
                    background: savedOk ? "#22c55e22" : "#1a1a1a",
                    color: savedOk ? "#22c55e" : "#888", cursor: "pointer",
                  }}
                >
                  {savedOk ? "✓ Salvo!" : "▤ Salvar no Kanban"}
                </button>
                <button onClick={copiar} style={{
                  fontSize: 11, padding: "6px 16px", borderRadius: 6, border: "none",
                  background: copiado ? "#16a34a" : "#22c55e", color: "#000", fontWeight: 700, cursor: "pointer",
                }}>
                  {copiado ? "✓ Copiado!" : "Copiar"}
                </button>
              </>
            )}
            <button onClick={gerarECopiar} style={{
              fontSize: 11, padding: "6px 16px", borderRadius: 6, border: "none",
              background: "#6366f1", color: "#fff", fontWeight: 700, cursor: "pointer",
            }}>
              {promptGerado ? "Regenerar" : "🚀 Gerar Prompt"}
            </button>
          </div>
        </div>

        {!promptGerado && (
          <div style={{ padding: 40, textAlign: "center", color: "#333", fontSize: 13 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
            Configure o contexto e a sequência acima,<br />depois clique em Gerar Prompt
          </div>
        )}

        {promptGerado && (
          <pre style={{
            margin: 0, padding: 20,
            fontSize: 11, lineHeight: 1.8, color: "#aaa",
            fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word",
            maxHeight: 500, overflowY: "auto", background: "#0d0d0d",
          }}>
            {promptGerado}
          </pre>
        )}
      </div>

    </div>
  );
}

function FRow({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 10, color: "#555", display: "block", marginBottom: 4 }}>{label}</label>
      {children}
    </div>
  );
}

const inp = { width: "100%", padding: "8px 10px", background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 8, color: "#ccc", fontSize: 12, fontFamily: "inherit" };
const sectionLabel = { fontSize: 10, fontWeight: 600, color: "#444", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 };