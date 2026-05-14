import { useState } from "react";
import { ANGULOS, VSLS, gerarPrompt, saveFunilCustom, deleteFunilCustom } from "../data";

const COR_MAP = { green: "#22c55e", amber: "#f59e0b", blue: "#3b82f6", red: "#ef4444", purple: "#a855f7", teal: "#14b8a6", orange: "#f97316", indigo: "#6366f1", slate: "#94a3b8" };
const CORES_OPT = Object.keys(COR_MAP);

// ── Formulário para criar nova página ──────────────────────────────────────
function FormNovaPage({ onSalvar, onCancelar }) {
  const [f, setF] = useState({
    id: "", nome: "", subtitulo: "", slug: "",
    paginas: [""], visual: "", tom: "", protagonista: "",
    instrucao_extra: "", cor: "green", inicio_recomendado: "historia",
  });

  function addPagina() { setF(p => ({ ...p, paginas: [...p.paginas, ""] })); }
  function setPagina(i, v) { const ps = [...f.paginas]; ps[i] = v; setF(p => ({ ...p, paginas: ps })); }
  function removePagina(i) { setF(p => ({ ...p, paginas: p.paginas.filter((_, idx) => idx !== i) })); }

  function salvar() {
    if (!f.nome.trim()) return;
    const id = f.id.trim() || f.nome.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    saveFunilCustom({ ...f, id, slug: f.slug || `parque-ilhabela-${id}`, angulos_recomendados: [] });
    onSalvar();
  }

  return (
    <div style={{ padding: 32, maxWidth: 640, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <button onClick={onCancelar} style={linkBtn}>← Cancelar</button>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "8px 0 4px" }}>Nova Página / Funil</h1>
        <p style={{ fontSize: 12, color: "#555" }}>Cria um novo funil personalizado. Ficará disponível no menu e no Gerador.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Row label="Nome *"><input placeholder="Ex: Funil Investidor" value={f.nome} onChange={e => setF(p => ({ ...p, nome: e.target.value }))} style={inp} /></Row>
        <Row label="Subtítulo"><input placeholder="Ex: Público 35–55 · Alta renda" value={f.subtitulo} onChange={e => setF(p => ({ ...p, subtitulo: e.target.value }))} style={inp} /></Row>
        <Row label="ID (auto se vazio)"><input placeholder="Ex: investidor" value={f.id} onChange={e => setF(p => ({ ...p, id: e.target.value }))} style={inp} /></Row>
        <Row label="Slug da URL"><input placeholder="Ex: parque-ilhabela-investidor" value={f.slug} onChange={e => setF(p => ({ ...p, slug: e.target.value }))} style={inp} /></Row>

        <div>
          <div style={labelSt}>Páginas</div>
          {f.paginas.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <input placeholder={`Página ${i + 1}`} value={p} onChange={e => setPagina(i, e.target.value)} style={{ ...inp, flex: 1 }} />
              {f.paginas.length > 1 && (
                <button onClick={() => removePagina(i)} style={{ fontSize: 12, color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>✕</button>
              )}
            </div>
          ))}
          <button onClick={addPagina} style={{ fontSize: 11, color: "#555", background: "none", border: "1px dashed #222", borderRadius: 6, padding: "5px 12px", cursor: "pointer" }}>
            + Página
          </button>
        </div>

        <Row label="Visual"><input placeholder="Ex: Claro, minimalista, tons de azul" value={f.visual} onChange={e => setF(p => ({ ...p, visual: e.target.value }))} style={inp} /></Row>
        <Row label="Tom de voz"><input placeholder="Ex: Técnico, direto, sem clichês" value={f.tom} onChange={e => setF(p => ({ ...p, tom: e.target.value }))} style={inp} /></Row>
        <Row label="Protagonista"><input placeholder="Ex: Paulo, 40 anos, empresário" value={f.protagonista} onChange={e => setF(p => ({ ...p, protagonista: e.target.value }))} style={inp} /></Row>
        <Row label="Contexto adicional">
          <textarea placeholder="Informações extras para o gerador de prompts..." value={f.instrucao_extra} onChange={e => setF(p => ({ ...p, instrucao_extra: e.target.value }))} style={{ ...inp, minHeight: 72, resize: "vertical" }} />
        </Row>

        <Row label="Cor">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CORES_OPT.map(c => (
              <button key={c} onClick={() => setF(p => ({ ...p, cor: c }))} style={{
                width: 24, height: 24, borderRadius: "50%", border: f.cor === c ? "2px solid #fff" : "2px solid transparent",
                background: COR_MAP[c], cursor: "pointer",
              }} />
            ))}
          </div>
        </Row>

        <Row label="Ângulo de início recomendado">
          <select value={f.inicio_recomendado} onChange={e => setF(p => ({ ...p, inicio_recomendado: e.target.value }))} style={inp}>
            {ANGULOS.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.nome}</option>)}
          </select>
        </Row>

        <button onClick={salvar} style={{ padding: "11px", borderRadius: 10, border: "none", background: "#22c55e", color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
          Criar Funil
        </button>
      </div>
    </div>
  );
}

// ── Detalhe de funil existente ──────────────────────────────────────────────
export default function PageFunil({ funil, navegar, recarregarFunis }) {
  const [copiado, setCopiado] = useState(null);
  const [criandoNova, setCriandoNova] = useState(!funil);

  // Modo criação de nova página
  if (criandoNova || !funil) {
    return (
      <FormNovaPage
        onSalvar={() => { recarregarFunis(); navegar("dashboard"); }}
        onCancelar={() => navegar("dashboard")}
      />
    );
  }

  const cor = COR_MAP[funil.cor] || "#22c55e";
  const vsl = VSLS.find(v => v.funil_id === funil.id);

  function copiarPrompt(anguloId, tipo) {
    const a = ANGULOS.find(x => x.id === anguloId);
    const p = gerarPrompt({ funil, angulo: a, tipo });
    navigator.clipboard.writeText(p).then(() => {
      setCopiado(`${anguloId}-${tipo}`);
      setTimeout(() => setCopiado(null), 2000);
    });
  }

  function excluirFunil() {
    if (!funil.custom) return;
    if (confirm(`Excluir "${funil.nome}"?`)) {
      deleteFunilCustom(funil.id);
      recarregarFunis();
      navegar("dashboard");
    }
  }

  // Todos os ângulos disponíveis + marca os recomendados
  const recomendados = new Set(funil.angulos_recomendados || []);

  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => navegar("dashboard")} style={linkBtn}>← Voltar</button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 4, height: 36, borderRadius: 2, background: cor }} />
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>{funil.nome}</h1>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
                {funil.subtitulo} · <code style={{ color: "#333", fontSize: 10 }}>{funil.slug}</code>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => navegar("gerador")} style={{ fontSize: 11, padding: "7px 14px", borderRadius: 8, border: "none", background: cor, color: "#000", fontWeight: 700, cursor: "pointer" }}>
              ✦ Abrir Gerador
            </button>
            {funil.custom && (
              <button onClick={excluirFunil} style={{ fontSize: 11, padding: "7px 14px", borderRadius: 8, border: "1px solid #2a1515", background: "#1a0d0d", color: "#ef4444", cursor: "pointer" }}>
                Excluir
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Especificações */}
        <div style={card}>
          <SectionLabel>Especificações</SectionLabel>
          {[
            { l: "Visual", v: funil.visual },
            { l: "Tom", v: funil.tom },
            { l: "Protagonista", v: funil.protagonista },
          ].map(r => r.v ? (
            <div key={r.l} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid #1a1a1a", fontSize: 12 }}>
              <span style={{ color: "#444", minWidth: 90, flexShrink: 0 }}>{r.l}</span>
              <span style={{ color: "#bbb", lineHeight: 1.5 }}>{r.v}</span>
            </div>
          ) : null)}
          {funil.instrucao_extra && (
            <div style={{ marginTop: 10, padding: "10px 14px", background: "#0d0d0d", borderRadius: 8, borderLeft: `3px solid ${cor}`, fontSize: 11, color: "#666", lineHeight: 1.7, fontStyle: "italic" }}>
              {funil.instrucao_extra}
            </div>
          )}
        </div>

        {/* Páginas */}
        <div style={card}>
          <SectionLabel>Estrutura · {funil.paginas.length} {funil.paginas.length === 1 ? "página" : "páginas"}</SectionLabel>
          {funil.paginas.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < funil.paginas.length - 1 ? "1px solid #1a1a1a" : "none" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: cor, background: cor + "22", padding: "2px 7px", borderRadius: 4, flexShrink: 0 }}>P{i + 1}</span>
              <span style={{ fontSize: 12, color: "#bbb" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TODOS os ângulos */}
      <div style={card}>
        <SectionLabel>Todos os ângulos — copie o prompt direto para o ChatGPT</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ANGULOS.map(a => {
            const rec = recomendados.has(a.id);
            return (
              <div key={a.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                background: "#0d0d0d",
                border: rec ? `1px solid ${cor}44` : "1px solid #1a1a1a",
                borderRadius: 10,
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{a.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{a.nome}</span>
                    {rec && <span style={{ fontSize: 9, color: cor, background: cor + "22", padding: "1px 6px", borderRadius: 4 }}>Recomendado</span>}
                    {a.id === funil.inicio_recomendado && <span style={{ fontSize: 9, color: "#fff", background: cor, padding: "1px 6px", borderRadius: 4 }}>Começar por aqui</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "#444" }}>{a.exemplo}</div>
                </div>
                <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                  {["copy", "vsl", "social"].map(t => {
                    const c = copiado === `${a.id}-${t}`;
                    return (
                      <button key={t} onClick={() => copiarPrompt(a.id, t)} style={{
                        fontSize: 10, padding: "5px 9px", borderRadius: 6,
                        border: c ? "1px solid #22c55e55" : "1px solid #222",
                        background: c ? "#22c55e22" : "#1a1a1a",
                        color: c ? "#22c55e" : "#555", cursor: "pointer",
                      }}>
                        {c ? "✓" : { copy: "📝", vsl: "🎬", social: "📱" }[t]}
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
        <div style={{ ...card, marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <SectionLabel>{vsl.nome}</SectionLabel>
              <div style={{ fontSize: 11, color: "#555" }}>{vsl.duracao} · {vsl.tom}</div>
            </div>
            <button onClick={() => copiarPrompt(funil.inicio_recomendado || ANGULOS[0].id, "vsl")} style={{ fontSize: 11, padding: "7px 13px", borderRadius: 8, border: "1px solid #222", background: "#1a1a1a", color: "#888", cursor: "pointer" }}>
              🎬 Copiar prompt VSL
            </button>
          </div>
          {vsl.estrutura.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "9px 10px", background: i % 2 === 0 ? "#0d0d0d" : "transparent", borderRadius: 6 }}>
              <span style={{ fontSize: 10, color: "#333", minWidth: 70, flexShrink: 0, fontFamily: "monospace" }}>{b.tempo}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: cor, minWidth: 80, flexShrink: 0 }}>{b.bloco}</span>
              <span style={{ fontSize: 11, color: "#666" }}>{b.descricao}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helpers
const card = { background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 18 };
const labelSt = { fontSize: 10, color: "#555", display: "block", marginBottom: 5 };
const inp = { width: "100%", padding: "8px 10px", background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 8, color: "#ccc", fontSize: 12, fontFamily: "inherit" };
const linkBtn = { fontSize: 11, color: "#444", background: "none", border: "none", cursor: "pointer", padding: 0 };

function SectionLabel({ children }) {
  return <div style={{ fontSize: 10, fontWeight: 600, color: "#444", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>{children}</div>;
}

function Row({ label, children }) {
  return (
    <div>
      <label style={labelSt}>{label}</label>
      {children}
    </div>
  );
}

