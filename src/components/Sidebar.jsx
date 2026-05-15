const COR_MAP = {
  green: "#22c55e", amber: "#f59e0b", blue: "#3b82f6",
  red: "#ef4444", purple: "#a855f7", teal: "#14b8a6",
  orange: "#f97316", indigo: "#6366f1", slate: "#94a3b8",
  yellow: "#eab308", rose: "#f43f5e",
};

const NAV = [
  { id: "dashboard",  label: "Dashboard",    icon: "⊞" },
  { id: "gerador",    label: "Gerar Prompt", icon: "✦", destaque: true },
  { id: "kanban",     label: "Criativos",    icon: "▤" },
  { id: "lancamento", label: "Lançamento",   icon: "🚀" },
  { id: "metricas",   label: "Métricas",     icon: "📊" },
];

export default function Sidebar({ page, navegar, funis = [] }) {
  return (
    <aside style={{
      width: 220, minWidth: 220,
      background: "#111",
      borderRight: "1px solid #1e1e1e",
      display: "flex", flexDirection: "column",
      padding: "20px 0",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 20px 18px", borderBottom: "1px solid #1e1e1e", marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>🌿 Parque Ilha Bela</div>
        <div style={{ fontSize: 10, color: "#444", marginTop: 3 }}>Hub de Conteúdo · Pedro MRV</div>
      </div>

      {/* Nav principal */}
      <div style={{ padding: "0 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map((item) => {
          const ativo = page === item.id;
          return (
            <button key={item.id} onClick={() => navegar(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 8,
              border: item.destaque ? "1px solid #22c55e33" : "none",
              background: ativo ? "#1a1a1a" : item.destaque ? "#22c55e11" : "transparent",
              color: ativo ? "#fff" : item.destaque ? "#22c55e" : "#666",
              fontSize: 12, fontWeight: ativo ? 600 : 400,
              cursor: "pointer", textAlign: "left",
            }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Funis */}
      <div style={{ padding: "18px 10px 4px 20px", fontSize: 9, color: "#333", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Páginas / Funis
      </div>
      <div style={{ padding: "0 10px", display: "flex", flexDirection: "column", gap: 1, flex: 1, overflowY: "auto" }}>
        {funis.map((f) => {
          const cor = COR_MAP[f.cor] || "#666";
          return (
            <button key={f.id} onClick={() => navegar("funil", { funil: f })} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "7px 12px", borderRadius: 8, border: "none",
              background: "transparent", color: "#666",
              fontSize: 11, cursor: "pointer", textAlign: "left",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: cor, flexShrink: 0 }} />
                {f.nome}
              </span>
              {f.custom && <span style={{ fontSize: 8, color: "#333" }}>custom</span>}
            </button>
          );
        })}

        {/* Botão Nova Página */}
        <button onClick={() => navegar("funil", { funil: null })} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "7px 12px", borderRadius: 8,
          border: "1px dashed #1e1e1e", background: "transparent",
          color: "#333", fontSize: 11, cursor: "pointer",
          marginTop: 6,
        }}>
          <span>＋</span> Nova página
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 20px 0", borderTop: "1px solid #1e1e1e" }}>
        <div style={{ fontSize: 10, color: "#2a2a2a", lineHeight: 1.7 }}>
          27 contratos<br />R$ 5,6mi em 2 dias
        </div>
      </div>
    </aside>
  );
}