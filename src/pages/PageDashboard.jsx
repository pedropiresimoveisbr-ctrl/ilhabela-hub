import { useMemo } from "react";
import { ANGULOS } from "../data";

const COR_MAP = { green: "#22c55e", amber: "#f59e0b", blue: "#3b82f6", red: "#ef4444", purple: "#a855f7", teal: "#14b8a6", orange: "#f97316", indigo: "#6366f1", slate: "#94a3b8" };

const COLUNAS = [
  { id: "a_testar",  label: "A Testar",  cor: "#6366f1" },
  { id: "ativo",     label: "Ativo",     cor: "#f59e0b" },
  { id: "validado",  label: "Validado",  cor: "#22c55e" },
  { id: "melhorar",  label: "Melhorar",  cor: "#ef4444" },
];

function loadCards() {
  try { return JSON.parse(localStorage.getItem("kanban_cards") || "[]"); }
  catch { return []; }
}

export default function PageDashboard({ navegar, funis = [] }) {
  const cards = useMemo(loadCards, []);

  // Conta criativos por funil e coluna
  function countFunilCol(funilId, colId) {
    return cards.filter(c => c.funil_id === funilId && c.coluna === colId).length;
  }
  function totalFunil(funilId) {
    return cards.filter(c => c.funil_id === funilId).length;
  }
  const totalCards = cards.length;
  const validados = cards.filter(c => c.coluna === "validado").length;
  const ativos = cards.filter(c => c.coluna === "ativo").length;

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#444", marginBottom: 4 }}>Campos dos Goytacazes · MRV · MCMV</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Dashboard</h1>
      </div>

      {/* Ações principais */}
      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        <button onClick={() => navegar("gerador")} style={{
          flex: 1, padding: "14px", borderRadius: 10, border: "none",
          background: "#22c55e", color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}>
          ✦ Gerar Prompt
        </button>
        <button onClick={() => navegar("kanban")} style={{
          flex: 1, padding: "14px", borderRadius: 10, border: "1px solid #1e1e1e",
          background: "#111", color: "#bbb", fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>
          ▤ Ver Criativos
        </button>
        <button onClick={() => navegar("funil", { funil: null })} style={{
          padding: "14px 18px", borderRadius: 10, border: "1px dashed #1e1e1e",
          background: "transparent", color: "#444", fontSize: 13, cursor: "pointer",
        }}>
          ＋ Nova página
        </button>
      </div>

      {/* Stats globais */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
        {[
          { label: "Páginas / Funis",  valor: funis.length,  cor: "#fff" },
          { label: "Criativos total",  valor: totalCards,    cor: "#888" },
          { label: "Ativos agora",     valor: ativos,        cor: "#f59e0b" },
          { label: "Validados",        valor: validados,     cor: "#22c55e" },
        ].map(s => (
          <div key={s.label} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 10, color: "#444", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.cor }}>{s.valor}</div>
          </div>
        ))}
      </div>

      {/* Prova social */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "14px 20px", marginBottom: 28, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#22c55e" }}>27</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>contratos em 2 dias de pré-venda</div>
          <div style={{ fontSize: 11, color: "#444" }}>R$ 5,6 milhões · Maior lançamento da história de Campos</div>
        </div>
      </div>

      {/* Funis com mini kanban */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, marginBottom: 14 }}>
          Páginas / Funis — status dos criativos
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {funis.map(f => {
            const cor = COR_MAP[f.cor] || "#666";
            const total = totalFunil(f.id);
            return (
              <div
                key={f.id}
                style={{ background: "#111", border: "1px solid #1e1e1e", borderLeft: `3px solid ${cor}`, borderRadius: 12, padding: "16px 18px", cursor: "pointer" }}
                onClick={() => navegar("funil", { funil: f })}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#ddd" }}>{f.nome}</span>
                      {f.custom && <span style={{ fontSize: 9, color: "#444", background: "#1a1a1a", padding: "1px 5px", borderRadius: 3 }}>custom</span>}
                    </div>
                    <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{f.subtitulo}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#444" }}>{total} criativo{total !== 1 ? "s" : ""}</span>
                    <button
                      onClick={e => { e.stopPropagation(); navegar("gerador"); }}
                      style={{ fontSize: 10, padding: "5px 10px", borderRadius: 6, border: "none", background: cor + "22", color: cor, cursor: "pointer", fontWeight: 600 }}
                    >
                      ✦ Gerar
                    </button>
                  </div>
                </div>

                {/* Mini kanban */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                  {COLUNAS.map(col => {
                    const n = countFunilCol(f.id, col.id);
                    return (
                      <div key={col.id} style={{
                        padding: "7px 10px", background: "#0d0d0d",
                        border: `1px solid ${n > 0 ? col.cor + "33" : "#1a1a1a"}`,
                        borderRadius: 8,
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                      }}>
                        <span style={{ fontSize: 10, color: n > 0 ? col.cor : "#333" }}>{col.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: n > 0 ? col.cor : "#2a2a2a" }}>{n}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Ângulos recomendados (badges) */}
                {f.angulos_recomendados?.length > 0 && (
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
                    {f.angulos_recomendados.slice(0, 3).map(aid => {
                      const a = ANGULOS.find(x => x.id === aid);
                      return a ? (
                        <span key={aid} style={{ fontSize: 9, padding: "1px 7px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 4, color: "#555" }}>
                          {a.emoji} {a.nome}
                        </span>
                      ) : null;
                    })}
                    {f.paginas.length > 0 && (
                      <span style={{ fontSize: 9, padding: "1px 7px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 4, color: "#444" }}>
                        {f.paginas.length}p
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Card "Nova página" */}
          <div
            onClick={() => navegar("funil", { funil: null })}
            style={{ background: "transparent", border: "1px dashed #1e1e1e", borderRadius: 12, padding: "18px", cursor: "pointer", textAlign: "center", color: "#2a2a2a", fontSize: 12 }}
          >
            ＋ Adicionar nova página ou funil
          </div>
        </div>
      </div>
    </div>
  );
}

