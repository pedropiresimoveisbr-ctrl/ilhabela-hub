import { FUNIS } from "../data";

const COR_MAP = {
  green: "#22c55e",
  amber: "#f59e0b",
  blue: "#3b82f6",
  red: "#ef4444",
};

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "gerador", label: "Gerar Prompt", icon: "✦", destaque: true },
  { id: "roteiros", label: "Roteiros Salvos", icon: "📄" },
  { id: "metricas", label: "Métricas & Testes", icon: "📊" },
];

export default function Sidebar({ page, navegar }) {
  return (
    <aside style={{
      width: 220,
      minWidth: 220,
      background: "#111",
      borderRight: "1px solid #1e1e1e",
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #1e1e1e", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>
          🌿 Parque Ilha Bela
        </div>
        <div style={{ fontSize: 10, color: "#555", marginTop: 3 }}>
          Hub de Conteúdo · Pedro MRV
        </div>
      </div>

      {/* Nav principal */}
      <div style={{ padding: "0 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map((item) => {
          const ativo = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navegar(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 8,
                border: item.destaque ? "1px solid #22c55e33" : "none",
                background: ativo ? "#1a1a1a" : item.destaque ? "#22c55e11" : "transparent",
                color: ativo ? "#fff" : item.destaque ? "#22c55e" : "#888",
                fontSize: 12,
                fontWeight: ativo ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Funis */}
      <div style={{ padding: "20px 10px 8px 20px", fontSize: 9, color: "#444", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Sites de Captura
      </div>
      <div style={{ padding: "0 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {FUNIS.map((f) => (
          <button
            key={f.id}
            onClick={() => navegar("funil", { funil: f })}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              background: "transparent",
              color: "#888",
              fontSize: 11,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span>{f.nome}</span>
            <span style={{
              fontSize: 9,
              padding: "2px 6px",
              borderRadius: 4,
              background: COR_MAP[f.cor] + "22",
              color: COR_MAP[f.cor],
              fontWeight: 600,
            }}>
              {f.id === "v1" ? "S1" : f.id === "senior" ? "S2" : f.id === "fgts" ? "S3" : "S4"}
            </span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: "auto", padding: "16px 20px 0", borderTop: "1px solid #1e1e1e" }}>
        <div style={{ fontSize: 10, color: "#333", lineHeight: 1.6 }}>
          27 contratos<br />R$ 5,6mi em 2 dias
        </div>
      </div>
    </aside>
  );
}
