import { FUNIS, ANGULOS } from "../data";

const COR_MAP = {
  green: "#22c55e",
  amber: "#f59e0b",
  blue: "#3b82f6",
  red: "#ef4444",
};

export default function PageDashboard({ navegar }) {
  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>Campos dos Goytacazes · MRV · MCMV</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>Parque Ilha Bela</h1>
        <p style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
          Hub de conteúdo, roteiros e gerador de prompts para os 4 funis de captura.
        </p>
      </div>

      {/* Prova social destaque */}
      <div style={{
        background: "#111",
        border: "1px solid #1e1e1e",
        borderRadius: 12,
        padding: "16px 20px",
        marginBottom: 28,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#22c55e" }}>27</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>contratos em 2 dias de pré-venda</div>
          <div style={{ fontSize: 11, color: "#555" }}>R$ 5,6 milhões · Maior lançamento da história de Campos</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => navegar("gerador")}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              background: "#22c55e",
              color: "#000",
              border: "none",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ✦ Gerar Prompt Agora
          </button>
        </div>
      </div>

      {/* 4 Funis */}
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Sites de Captura
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {FUNIS.map((f) => {
            const cor = COR_MAP[f.cor];
            return (
              <div
                key={f.id}
                onClick={() => navegar("funil", { funil: f })}
                style={{
                  background: "#111",
                  border: `1px solid #1e1e1e`,
                  borderTop: `3px solid ${cor}`,
                  borderRadius: 12,
                  padding: 18,
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{f.nome}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{f.subtitulo}</div>
                  </div>
                  <span style={{
                    fontSize: 9,
                    padding: "2px 7px",
                    borderRadius: 4,
                    background: cor + "22",
                    color: cor,
                    fontWeight: 700,
                  }}>
                    {f.paginas.length === 1 ? "1 página" : `${f.paginas.length} páginas`}
                  </span>
                </div>

                <div style={{ fontSize: 11, color: "#444", lineHeight: 1.5, marginBottom: 10 }}>
                  {f.tom}
                </div>

                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {f.angulos_recomendados.slice(0, 3).map((aid) => {
                    const a = ANGULOS.find((x) => x.id === aid);
                    return (
                      <span key={aid} style={{
                        fontSize: 9,
                        padding: "2px 7px",
                        background: "#1a1a1a",
                        border: "1px solid #222",
                        borderRadius: 4,
                        color: "#666",
                      }}>
                        {a?.emoji} {a?.nome}
                      </span>
                    );
                  })}
                  {f.angulos_recomendados.length > 3 && (
                    <span style={{ fontSize: 9, color: "#444", padding: "2px 4px" }}>
                      +{f.angulos_recomendados.length - 3}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1a1a1a", display: "flex", gap: 8 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); navegar("gerador"); }}
                    style={{
                      fontSize: 10,
                      padding: "5px 10px",
                      borderRadius: 6,
                      background: cor + "15",
                      border: `1px solid ${cor}33`,
                      color: cor,
                      cursor: "pointer",
                    }}
                  >
                    ✦ Gerar prompt
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); navegar("funil", { funil: f }); }}
                    style={{
                      fontSize: 10,
                      padding: "5px 10px",
                      borderRadius: 6,
                      background: "#1a1a1a",
                      border: "1px solid #222",
                      color: "#666",
                      cursor: "pointer",
                    }}
                  >
                    Ver detalhes →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ângulos rápidos */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Ângulos Disponíveis
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {ANGULOS.map((a) => (
            <div
              key={a.id}
              onClick={() => navegar("gerador")}
              style={{
                background: "#111",
                border: "1px solid #1e1e1e",
                borderRadius: 10,
                padding: "12px 14px",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 16, marginBottom: 4 }}>{a.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd", marginBottom: 3 }}>{a.nome}</div>
              <div style={{ fontSize: 10, color: "#555", lineHeight: 1.5 }}>{a.descricao}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
