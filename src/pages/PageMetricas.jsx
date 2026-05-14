import { useState } from "react";
import { FUNIS, METRICAS_INFO, TIPOS_TESTE } from "../data";

export default function PageMetricas() {
  const [ads, setAds] = useState([
    { id: 1, nome: "AD 2.3", funil: "v1", hook: 55.88, roas: 1.39, gasto: 2896.30, status: "ativo" },
    { id: 2, nome: "AD 6.3", funil: "v1", hook: 55.79, roas: 1.39, gasto: 3613.87, status: "ativo" },
    { id: 3, nome: "AD 4.4", funil: "v1", hook: 51.90, roas: 1.49, gasto: 2249.60, status: "ativo" },
  ]);

  const [form, setForm] = useState({ nome: "", funil: "v1", hook: "", roas: "", gasto: "" });

  function adicionarAd() {
    if (!form.nome || !form.hook) return;
    setAds([...ads, {
      id: Date.now(),
      nome: form.nome,
      funil: form.funil,
      hook: parseFloat(form.hook),
      roas: parseFloat(form.roas) || 0,
      gasto: parseFloat(form.gasto) || 0,
      status: "teste",
    }]);
    setForm({ nome: "", funil: "v1", hook: "", roas: "", gasto: "" });
  }

  const topHooks = [...ads].sort((a, b) => b.hook - a.hook).slice(0, 5);

  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Métricas & Testes</h1>
        <p style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
          Banco de dados de criativos, top hooks e referência de tipos de teste.
        </p>
      </div>

      {/* 3 Métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {Object.entries(METRICAS_INFO).map(([k, m]) => (
          <div key={k} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{m.nome}</div>
            <div style={{ fontSize: 12, color: "#888", fontFamily: "monospace", background: "#0d0d0d", padding: "6px 10px", borderRadius: 6, marginBottom: 8 }}>
              {m.formula}
            </div>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>{m.descricao}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#22c55e" }}>Meta: {m.meta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Banco de dados */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
            Banco de Dados de Criativos
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <input
                placeholder="Nome (ex: AD 2.3)"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                style={inputStyle}
              />
              <select
                value={form.funil}
                onChange={(e) => setForm({ ...form, funil: e.target.value })}
                style={{ ...inputStyle, width: 100 }}
              >
                {FUNIS.map((f) => <option key={f.id} value={f.id}>{f.id.toUpperCase()}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <input placeholder="Hook %" value={form.hook} onChange={(e) => setForm({ ...form, hook: e.target.value })} style={inputStyle} type="number" />
              <input placeholder="ROAS" value={form.roas} onChange={(e) => setForm({ ...form, roas: e.target.value })} style={inputStyle} type="number" />
              <input placeholder="Gasto R$" value={form.gasto} onChange={(e) => setForm({ ...form, gasto: e.target.value })} style={inputStyle} type="number" />
            </div>
            <button onClick={adicionarAd} style={{ padding: "8px", borderRadius: 8, border: "none", background: "#22c55e", color: "#000", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
              + Adicionar
            </button>
          </div>

          {/* Tabela */}
          <div style={{ fontSize: 10, color: "#444", marginBottom: 8, fontWeight: 600 }}>
            {ads.length} criativos · ordenados por Hook
          </div>
          {[...ads].sort((a, b) => b.hook - a.hook).map((ad) => (
            <div key={ad.id} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #1a1a1a", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#ddd", minWidth: 60 }}>{ad.nome}</span>
              <span style={{
                fontSize: 10, padding: "1px 6px", borderRadius: 4,
                background: ad.hook >= 55 ? "#22c55e22" : ad.hook >= 50 ? "#f59e0b22" : "#1a1a1a",
                color: ad.hook >= 55 ? "#22c55e" : ad.hook >= 50 ? "#f59e0b" : "#666",
              }}>
                Hook: {ad.hook}%
              </span>
              <span style={{ fontSize: 10, color: "#888" }}>ROAS: {ad.roas}</span>
              <span style={{ fontSize: 10, color: "#555", marginLeft: "auto" }}>
                R${ad.gasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>

        {/* Top Hooks */}
        <div>
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
              🏆 Top Hooks
            </div>
            {topHooks.map((ad, i) => (
              <div key={ad.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < topHooks.length - 1 ? "1px solid #1a1a1a" : "none" }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: i === 0 ? "#f59e0b" : "#333", minWidth: 20 }}>
                  {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd" }}>{ad.nome}</div>
                  <div style={{ fontSize: 10, color: "#555" }}>ROAS {ad.roas} · R${ad.gasto.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: ad.hook >= 55 ? "#22c55e" : "#f59e0b" }}>
                  {ad.hook}%
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: "10px 12px", background: "#0d0d0d", borderRadius: 8, fontSize: 11, color: "#555", lineHeight: 1.7 }}>
              💡 <strong style={{ color: "#666" }}>Quebre-cabeça:</strong> pegue os melhores Hooks e conecte com os melhores Bodys para novos criativos.
            </div>
          </div>
        </div>
      </div>

      {/* Tipos de Teste */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {Object.entries(TIPOS_TESTE).map(([k, t]) => (
          <div key={k} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.nome}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{t.uso}</div>
              </div>
              <span style={{
                fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 700,
                background: k === "horizontal" ? "#3b82f622" : "#22c55e22",
                color: k === "horizontal" ? "#3b82f6" : "#22c55e",
              }}>
                {k === "horizontal" ? "ESCALA" : "VIDA ÚTIL"}
              </span>
            </div>
            <div style={{ fontSize: 11, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>{t.descricao}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {t.elementos.map((el, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#888" }}>
                  <span style={{ fontSize: 9, color: "#555" }}>{i + 1}.</span>
                  {el}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  padding: "7px 10px",
  background: "#0d0d0d",
  border: "1px solid #1e1e1e",
  borderRadius: 6,
  color: "#ccc",
  fontSize: 12,
  fontFamily: "inherit",
};
