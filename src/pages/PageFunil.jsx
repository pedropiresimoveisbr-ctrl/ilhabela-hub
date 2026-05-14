import { ANGULOS, VSLS, gerarPrompt } from "../data";
import { useState } from "react";

const COR_MAP = { green: "#22c55e", amber: "#f59e0b", blue: "#3b82f6", red: "#ef4444" };

export default function PageFunil({ funil, navegar }) {
  const [copiado, setCopiado] = useState(null);
  if (!funil) return (
    <div style={{ padding: 40, color: "#555" }}>Selecione um funil no menu lateral.</div>
  );

  const cor = COR_MAP[funil.cor];
  const vsl = VSLS.find((v) => v.funil_id === funil.id);
  const angulos = ANGULOS.filter((a) => funil.angulos_recomendados.includes(a.id));

  function copiarPrompt(anguloId, tipo) {
    const a = ANGULOS.find((x) => x.id === anguloId);
    const p = gerarPrompt({ funil, angulo: a, tipo });
    navigator.clipboard.writeText(p).then(() => {
      setCopiado(`${anguloId}-${tipo}`);
      setTimeout(() => setCopiado(null), 2000);
    });
  }

  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => navegar("dashboard")} style={{ fontSize: 11, color: "#555", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 12 }}>
          ← Voltar
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 4, height: 36, borderRadius: 2, background: cor }} />
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>{funil.nome}</h1>
            <div style={{ fontSize: 12, color: "#555" }}>{funil.subtitulo} · <code style={{ color: "#444" }}>{funil.slug}</code></div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20, marginTop: 20 }}>
        {/* Info do funil */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Especificações</div>
          {[
            { l: "Visual", v: funil.visual },
            { l: "Tom", v: funil.tom },
            { l: "Protagonista", v: funil.protagonista },
          ].map((row) => (
            <div key={row.l} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid #1a1a1a", fontSize: 12 }}>
              <span style={{ color: "#444", minWidth: 90, flexShrink: 0 }}>{row.l}</span>
              <span style={{ color: "#bbb", lineHeight: 1.5 }}>{row.v}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, padding: "10px 14px", background: "#0d0d0d", borderRadius: 8, borderLeft: `3px solid ${cor}`, fontSize: 11, color: "#666", lineHeight: 1.7, fontStyle: "italic" }}>
            {funil.instrucao_extra}
          </div>
        </div>

        {/* Páginas do funil */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
            Estrutura ({funil.paginas.length === 1 ? "1 página" : `${funil.paginas.length} páginas`})
          </div>
          {funil.paginas.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < funil.paginas.length - 1 ? "1px solid #1a1a1a" : "none" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: cor, background: cor + "22", padding: "2px 7px", borderRadius: 4, flexShrink: 0 }}>
                P{i + 1}
              </span>
              <span style={{ fontSize: 12, color: "#bbb" }}>{p}</span>
            </div>
          ))}

          <button
            onClick={() => navegar("gerador")}
            style={{
              marginTop: 16,
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "none",
              background: cor,
              color: cor === "#f59e0b" ? "#000" : "#000",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ✦ Gerar prompt para este funil
          </button>
        </div>
      </div>

      {/* Ângulos com botão copiar direto */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "#555", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
          Ângulos Disponíveis — copie direto para o ChatGPT
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {angulos.map((a) => {
            const rec = a.id === funil.inicio_recomendado;
            return (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  background: "#0d0d0d",
                  border: rec ? `1px solid ${cor}44` : "1px solid #1a1a1a",
                  borderRadius: 10,
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{a.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{a.nome}</span>
                    {rec && (
                      <span style={{ fontSize: 9, color: cor, background: cor + "22", padding: "1px 6px", borderRadius: 4 }}>
                        Começar por aqui
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "#555" }}>{a.exemplo}</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {["copy", "vsl", "social"].map((t) => {
                    const c = copiado === `${a.id}-${t}`;
                    return (
                      <button
                        key={t}
                        onClick={() => copiarPrompt(a.id, t)}
                        style={{
                          fontSize: 10,
                          padding: "5px 10px",
                          borderRadius: 6,
                          border: c ? "1px solid #22c55e55" : "1px solid #222",
                          background: c ? "#22c55e22" : "#1a1a1a",
                          color: c ? "#22c55e" : "#666",
                          cursor: "pointer",
                          fontWeight: c ? 700 : 400,
                        }}
                      >
                        {c ? "✓" : { copy: "📝 Copy", vsl: "🎬 VSL", social: "📱 Social" }[t]}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VSL estrutura */}
      {vsl && (
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{vsl.nome}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{vsl.duracao} · {vsl.tom}</div>
            </div>
            <button
              onClick={() => copiarPrompt(funil.angulos_recomendados[0], "vsl")}
              style={{
                fontSize: 11,
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid #222",
                background: "#1a1a1a",
                color: "#888",
                cursor: "pointer",
              }}
            >
              🎬 Copiar prompt VSL
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {vsl.estrutura.map((bloco, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "10px 12px",
                  background: i % 2 === 0 ? "#0d0d0d" : "transparent",
                  borderRadius: 6,
                }}
              >
                <span style={{ fontSize: 10, color: "#444", minWidth: 70, flexShrink: 0, fontFamily: "monospace" }}>{bloco.tempo}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: cor, minWidth: 80, flexShrink: 0 }}>{bloco.bloco}</span>
                <span style={{ fontSize: 11, color: "#777" }}>{bloco.descricao}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
