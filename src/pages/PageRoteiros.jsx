import { useState, useEffect } from "react";

export default function PageRoteiros() {
  const [roteiros, setRoteiros] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("roteiros") || "[]");
    setRoteiros(s);
  }, []);

  function excluir(id) {
    const novos = roteiros.filter((r) => r.id !== id);
    setRoteiros(novos);
    localStorage.setItem("roteiros", JSON.stringify(novos));
    if (selecionado?.id === id) setSelecionado(null);
  }

  function copiar(prompt) {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Roteiros Salvos</h1>
        <p style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
          Prompts gerados e salvos para reutilizar ou comparar.
        </p>
      </div>

      {roteiros.length === 0 && (
        <div style={{ padding: 60, textAlign: "center", color: "#333", background: "#111", borderRadius: 12, border: "1px solid #1e1e1e" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
          <div style={{ fontSize: 14, marginBottom: 6 }}>Nenhum roteiro salvo ainda</div>
          <div style={{ fontSize: 12, color: "#444" }}>
            Gere um prompt no Gerador e clique em "Salvar"
          </div>
        </div>
      )}

      {roteiros.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
          {/* Lista */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {roteiros.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelecionado(r)}
                style={{
                  padding: "12px 14px",
                  background: selecionado?.id === r.id ? "#1a1a1a" : "#111",
                  border: selecionado?.id === r.id ? "1px solid #333" : "1px solid #1e1e1e",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd", marginBottom: 4 }}>
                  {r.funil}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, padding: "1px 6px", background: "#222", borderRadius: 4, color: "#888" }}>{r.angulo}</span>
                  <span style={{ fontSize: 10, padding: "1px 6px", background: "#222", borderRadius: 4, color: "#888" }}>{r.tipo}</span>
                </div>
                <div style={{ fontSize: 10, color: "#444", marginTop: 6 }}>{r.data}</div>
              </div>
            ))}
          </div>

          {/* Detalhe */}
          {selecionado ? (
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "12px 18px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{selecionado.funil} · {selecionado.angulo}</div>
                  <div style={{ fontSize: 10, color: "#555" }}>{selecionado.tipo} · {selecionado.data}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => excluir(selecionado.id)}
                    style={{ fontSize: 11, padding: "6px 12px", borderRadius: 6, border: "1px solid #2a1515", background: "#1a0d0d", color: "#ef4444", cursor: "pointer" }}
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => copiar(selecionado.prompt)}
                    style={{ fontSize: 11, padding: "6px 16px", borderRadius: 6, border: "none", background: copiado ? "#16a34a" : "#22c55e", color: "#000", fontWeight: 700, cursor: "pointer" }}
                  >
                    {copiado ? "✓ Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>
              <pre style={{
                margin: 0, padding: 20, fontSize: 11, lineHeight: 1.8, color: "#888",
                fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word",
                maxHeight: 600, overflowY: "auto", background: "#0d0d0d",
              }}>
                {selecionado.prompt}
              </pre>
            </div>
          ) : (
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 40, textAlign: "center", color: "#333" }}>
              Selecione um roteiro para visualizar
            </div>
          )}
        </div>
      )}
    </div>
  );
}
