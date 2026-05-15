import { useState, useRef } from "react";
import { ANGULOS, TIPOS, gerarPrompt } from "../data";

const SB_URL = "https://okwqamdrgwbfyncqcide.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd3FhbWRyZ3diZnluY3FjaWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTg4NjksImV4cCI6MjA5NDE5NDg2OX0.g31os5TAoLaEPHyGGTg67r6BmxnoSxemMRklkO3d9zM";
const SB_HEADERS = { "Content-Type": "application/json", apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };

const COR_MAP = {
  green: "#22c55e", amber: "#f59e0b", blue: "#3b82f6", red: "#ef4444",
  purple: "#a855f7", teal: "#14b8a6", orange: "#f97316", indigo: "#6366f1",
  slate: "#94a3b8", yellow: "#eab308", rose: "#f43f5e",
};

export default function PageGerador({ funis = [] }) {
  const [funilId, setFunilId] = useState("");
  const [anguloId, setAnguloId] = useState("");
  const [tipo, setTipo] = useState("copy");
  const [extras, setExtras] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copyExistente, setCopyExistente] = useState("");
  const promptRef = useRef(null);

  const funil = funis.find((f) => f.id === funilId);
  const angulo = ANGULOS.find((a) => a.id === anguloId);

  const promptGerado = funil && angulo
    ? gerarPrompt({
        funil,
        angulo,
        tipo,
        extras: tipo === "modelagem" && copyExistente
          ? `Copy para modelar:\n---\n${copyExistente}\n---\n${extras}`
          : extras,
      })
    : null;

  function copiar() {
    if (!promptGerado) return;
    navigator.clipboard.writeText(promptGerado).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    });
  }

  async function gerarTituloIA(prompt) {
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 60,
          messages: [{
            role: "user",
            content: `Crie um título curto e descritivo (máx 6 palavras) para identificar este criativo de marketing imobiliário. Responda APENAS o título, sem aspas, sem pontuação final.\n\nContexto do criativo:\n${prompt.slice(0, 400)}`,
          }],
        }),
      });
      const data = await r.json();
      return data?.content?.[0]?.text?.trim() || null;
    } catch { return null; }
  }

  async function salvarKanban() {
    if (!funil || !angulo || saving) return;
    const tipoObj = TIPOS.find(t => t.id === tipo);
    setSaving(true);
    try {
      // Gera título com IA baseado no prompt
      const tituloIA = promptGerado ? await gerarTituloIA(promptGerado) : null;
      const titulo = tituloIA || `${funil.nome} · ${angulo.nome} · ${tipoObj?.label || tipo}`;

      await fetch(`${SB_URL}/rest/v1/kanban_cards`, {
        method: "POST",
        headers: { ...SB_HEADERS, Prefer: "return=minimal" },
        body: JSON.stringify({
          titulo,
          funil_id: funil.id,
          funil_nome: funil.nome,
          funil_cor: funil.cor,
          angulo_id: angulo.id,
          angulo_nome: angulo.nome,
          angulo_emoji: angulo.emoji,
          tipo_id: tipo,
          tipo_label: tipoObj?.label || tipo,
          tipo_icon: tipoObj?.icon || "📄",
          hook: "", roas: "", notas: "",
          narracao: promptGerado || "",
          legenda: "",
          link_video: "",
          coluna: "a_testar",
        }),
      });
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 2500);
    } catch (e) {
      console.error("Erro ao salvar no Kanban:", e);
    }
    setSaving(false);
  }

  const podeGerar = funilId && anguloId;
  // Todos os ângulos disponíveis — sem restrição por funil

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>✦ Gerador de Prompts</h1>
        <p style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
          Escolha o funil, o ângulo e o tipo de conteúdo. O prompt completo é gerado automaticamente para colar no ChatGPT.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 20, alignItems: "start" }}>

        {/* COLUNA ESQUERDA — Controles */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* PASSO 1: Funil */}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              1 · Qual funil?
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {funis.map((f) => {
                const cor = COR_MAP[f.cor] || "#22c55e";
                const sel = funilId === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => { setFunilId(f.id); setAnguloId(""); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px", borderRadius: 8,
                      border: sel ? `1px solid ${cor}55` : "1px solid #1a1a1a",
                      background: sel ? cor + "15" : "#0d0d0d",
                      color: sel ? "#fff" : "#666",
                      cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: cor, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{f.nome}</div>
                      <div style={{ fontSize: 10, color: sel ? cor + "aa" : "#444" }}>{f.subtitulo}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASSO 2: Ângulo — todos disponíveis */}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              2 · Qual ângulo?
            </div>
            {!funilId && (
              <div style={{ fontSize: 12, color: "#333", fontStyle: "italic" }}>Selecione o funil primeiro</div>
            )}
            {funilId && (
              <>
                {funil?.inicio_recomendado && (
                  <div style={{ fontSize: 10, color: "#555", marginBottom: 8 }}>
                    💡 Começar por: <strong style={{ color: "#888" }}>
                      {ANGULOS.find(a => a.id === funil.inicio_recomendado)?.nome}
                    </strong>
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {ANGULOS.map((a) => {
                    const sel = anguloId === a.id;
                    const recomendado = (funil?.angulos_recomendados || []).includes(a.id);
                    const inicio = a.id === funil?.inicio_recomendado;
                    return (
                      <button
                        key={a.id}
                        onClick={() => setAnguloId(a.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "9px 12px",
                          borderRadius: 8,
                          border: sel ? "1px solid #22c55e55" : "1px solid #1a1a1a",
                          background: sel ? "#22c55e15" : "#0d0d0d",
                          color: sel ? "#fff" : "#666",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: 14 }}>{a.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 600 }}>{a.nome}</div>
                          <div style={{ fontSize: 10, color: sel ? "#22c55e88" : "#333", lineHeight: 1.4 }}>{a.descricao}</div>
                        </div>
                        {inicio && (
                          <span style={{ fontSize: 9, color: "#fff", background: "#22c55e", padding: "1px 5px", borderRadius: 4, flexShrink: 0 }}>★ início</span>
                        )}
                        {recomendado && !inicio && (
                          <span style={{ fontSize: 9, color: "#22c55e", background: "#22c55e22", padding: "1px 5px", borderRadius: 4, flexShrink: 0 }}>rec.</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* PASSO 3: Tipo */}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              3 · Tipo de conteúdo
            </div>
            {["Site", "Vídeo", "Social", "Ferramenta"].map(grupo => {
              const itens = TIPOS.filter(t => t.grupo === grupo);
              return (
                <div key={grupo} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 9, color: "#333", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{grupo}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {itens.map(t => {
                      const sel = tipo === t.id;
                      return (
                        <button key={t.id} onClick={() => setTipo(t.id)} style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "8px 12px", borderRadius: 8,
                          border: sel ? "1px solid #3b82f655" : "1px solid #1a1a1a",
                          background: sel ? "#3b82f615" : "#0d0d0d",
                          color: sel ? "#fff" : "#555", cursor: "pointer", textAlign: "left",
                        }}>
                          <span style={{ fontSize: 14, flexShrink: 0 }}>{t.icon}</span>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600 }}>{t.label}</div>
                            <div style={{ fontSize: 10, color: sel ? "#3b82f688" : "#333" }}>{t.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Copy para modelar (só aparece se tipo = modelagem) */}
          {tipo === "modelagem" && (
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Cole a copy a modelar
              </div>
              <textarea
                value={copyExistente}
                onChange={(e) => setCopyExistente(e.target.value)}
                placeholder="Cole aqui o texto que você quer modelar e melhorar..."
                style={{
                  width: "100%",
                  minHeight: 120,
                  background: "#0d0d0d",
                  border: "1px solid #1e1e1e",
                  borderRadius: 8,
                  padding: 12,
                  color: "#ccc",
                  fontSize: 12,
                  lineHeight: 1.6,
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>
          )}

          {/* Extras */}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#555", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Observações extras (opcional)
            </div>
            <textarea
              value={extras}
              onChange={(e) => setExtras(e.target.value)}
              placeholder="Ex: Foque mais no aspecto da prainha exclusiva. Torne o headline mais agressivo. Adapte para WhatsApp..."
              style={{
                width: "100%",
                minHeight: 80,
                background: "#0d0d0d",
                border: "1px solid #1e1e1e",
                borderRadius: 8,
                padding: 12,
                color: "#ccc",
                fontSize: 12,
                lineHeight: 1.6,
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* COLUNA DIREITA — Prompt gerado */}
        <div style={{ position: "sticky", top: 20 }}>
          {/* Info do que foi selecionado */}
          {podeGerar && (
            <div style={{
              background: "#111",
              border: "1px solid #1e1e1e",
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}>
              <div>
                <div style={{ fontSize: 10, color: "#555" }}>Funil</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{funil?.nome}</div>
              </div>
              <div style={{ color: "#222" }}>+</div>
              <div>
                <div style={{ fontSize: 10, color: "#555" }}>Ângulo</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{angulo?.emoji} {angulo?.nome}</div>
              </div>
              <div style={{ color: "#222" }}>+</div>
              <div>
                <div style={{ fontSize: 10, color: "#555" }}>Tipo</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{TIPOS.find(t => t.id === tipo)?.label}</div>
              </div>
            </div>
          )}

          {/* Prompt */}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 18px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>
                {promptGerado ? "✓ Prompt pronto — cole no ChatGPT" : "Selecione funil + ângulo para gerar"}
              </div>
              {promptGerado && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={salvarKanban}
                    style={{
                      fontSize: 11, padding: "6px 12px", borderRadius: 6,
                      border: savedOk ? "1px solid #22c55e55" : "1px solid #222",
                      background: savedOk ? "#22c55e22" : "#1a1a1a",
                      color: savedOk ? "#22c55e" : "#888", cursor: "pointer",
                    }}
                  >
                    {saving ? "Salvando..." : savedOk ? "✓ Salvo!" : "▤ Salvar no Kanban"}
                  </button>
                  <button
                    onClick={copiar}
                    style={{
                      fontSize: 11,
                      padding: "6px 16px",
                      borderRadius: 6,
                      border: "none",
                      background: copiado ? "#16a34a" : "#22c55e",
                      color: "#000",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {copiado ? "✓ Copiado!" : "Copiar"}
                  </button>
                </div>
              )}
            </div>

            {!promptGerado && (
              <div style={{
                padding: 40,
                textAlign: "center",
                color: "#333",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
                <div style={{ fontSize: 13 }}>
                  Selecione um funil e um ângulo<br />para gerar o prompt completo
                </div>
              </div>
            )}

            {promptGerado && (
              <pre
                ref={promptRef}
                style={{
                  margin: 0,
                  padding: 20,
                  fontSize: 11,
                  lineHeight: 1.8,
                  color: "#aaa",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  maxHeight: 600,
                  overflowY: "auto",
                  background: "#0d0d0d",
                }}
              >
                {promptGerado}
              </pre>
            )}
          </div>

          {/* Dica de uso */}
          {promptGerado && (
            <div style={{
              marginTop: 12,
              padding: "12px 16px",
              background: "#111",
              border: "1px solid #1e1e1e",
              borderRadius: 10,
              fontSize: 11,
              color: "#444",
              lineHeight: 1.7,
            }}>
              <strong style={{ color: "#666" }}>Como usar:</strong> Copie o prompt acima → abra uma conversa nova no ChatGPT → cole e envie.
              Após receber, peça: <em style={{ color: "#555" }}>"Torne o headline mais agressivo"</em> /
              <em style={{ color: "#555" }}> "Adapte para WhatsApp"</em> /
              <em style={{ color: "#555" }}> "Gere em formato de teleprompter"</em>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}