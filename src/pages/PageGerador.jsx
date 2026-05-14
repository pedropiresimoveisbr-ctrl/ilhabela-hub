import { useState, useRef } from "react";
import { FUNIS, ANGULOS, VSLS, gerarPrompt } from "../data";

const COR_MAP = {
  green: "#22c55e",
  amber: "#f59e0b",
  blue: "#3b82f6",
  red: "#ef4444",
};

const TIPOS = [
  { id: "copy", label: "Copy do Site", desc: "Texto completo das páginas do funil", icon: "📝" },
  { id: "vsl", label: "Script VSL", desc: "Roteiro de vídeo com tempo, tela e locução", icon: "🎬" },
  { id: "social", label: "Redes Sociais", desc: "Reels, Stories, Carrossel e legenda", icon: "📱" },
  { id: "modelagem", label: "Modelar Copy", desc: "Melhore uma copy existente com IA", icon: "✏️" },
];

export default function PageGerador() {
  const [funilId, setFunilId] = useState("");
  const [anguloId, setAnguloId] = useState("");
  const [tipo, setTipo] = useState("copy");
  const [extras, setExtras] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [copyExistente, setCopyExistente] = useState("");
  const promptRef = useRef(null);

  const funil = FUNIS.find((f) => f.id === funilId);
  const angulo = ANGULOS.find((a) => a.id === anguloId);
  const vslInfo = VSLS.find((v) => v.funil_id === funilId);

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

  function salvar() {
    if (!promptGerado || !funil || !angulo) return;
    const salvos = JSON.parse(localStorage.getItem("roteiros") || "[]");
    salvos.push({
      id: Date.now(),
      funil: funil.nome,
      angulo: angulo.nome,
      tipo,
      prompt: promptGerado,
      data: new Date().toLocaleDateString("pt-BR"),
    });
    localStorage.setItem("roteiros", JSON.stringify(salvos));
    alert("Salvo em Roteiros!");
  }

  const podeGerar = funilId && anguloId;
  const angulosDisponiveis = funil ? ANGULOS.filter((a) => funil.angulos_recomendados.includes(a.id)) : ANGULOS;

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
              {FUNIS.map((f) => {
                const cor = COR_MAP[f.cor];
                const sel = funilId === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => { setFunilId(f.id); setAnguloId(""); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: sel ? `1px solid ${cor}55` : "1px solid #1a1a1a",
                      background: sel ? cor + "15" : "#0d0d0d",
                      color: sel ? "#fff" : "#666",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: cor, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{f.nome}</div>
                      <div style={{ fontSize: 10, color: sel ? cor + "aa" : "#444" }}>{f.subtitulo}</div>
                    </div>
                    {f.id === f.id && funil?.inicio_recomendado && sel && (
                      <span style={{ marginLeft: "auto", fontSize: 9, color: cor, background: cor + "22", padding: "1px 6px", borderRadius: 4 }}>
                        ativo
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASSO 2: Ângulo */}
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
                    💡 Recomendado para começar: <strong style={{ color: "#888" }}>
                      {ANGULOS.find(a => a.id === funil.inicio_recomendado)?.nome}
                    </strong>
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {angulosDisponiveis.map((a) => {
                    const sel = anguloId === a.id;
                    const recomendado = a.id === funil?.inicio_recomendado;
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
                        {recomendado && (
                          <span style={{ fontSize: 9, color: "#22c55e", background: "#22c55e22", padding: "1px 5px", borderRadius: 4, flexShrink: 0 }}>
                            ★
                          </span>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {TIPOS.map((t) => {
                const sel = tipo === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTipo(t.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 12px",
                      borderRadius: 8,
                      border: sel ? "1px solid #3b82f655" : "1px solid #1a1a1a",
                      background: sel ? "#3b82f615" : "#0d0d0d",
                      color: sel ? "#fff" : "#666",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{t.label}</div>
                      <div style={{ fontSize: 10, color: sel ? "#3b82f688" : "#333" }}>{t.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
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
              {vslInfo && tipo === "vsl" && (
                <>
                  <div style={{ color: "#222" }}>·</div>
                  <div>
                    <div style={{ fontSize: 10, color: "#555" }}>Duração</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>{vslInfo.duracao}</div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Prompt */}
          <div style={{
            background: "#111",
            border: "1px solid #1e1e1e",
            borderRadius: 12,
            overflow: "hidden",
          }}>
            <div style={{
              padding: "12px 18px",
              borderBottom: "1px solid #1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>
                {promptGerado ? "✓ Prompt gerado — cole no ChatGPT" : "Selecione funil + ângulo para gerar"}
              </div>
              {promptGerado && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={salvar}
                    style={{
                      fontSize: 11,
                      padding: "6px 12px",
                      borderRadius: 6,
                      border: "1px solid #222",
                      background: "#1a1a1a",
                      color: "#888",
                      cursor: "pointer",
                    }}
                  >
                    💾 Salvar
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
