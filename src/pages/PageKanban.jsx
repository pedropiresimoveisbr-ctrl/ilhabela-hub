import { useState, useEffect, useCallback } from "react";
import { ANGULOS, TIPOS } from "../data";

// ── Supabase config ───────────────────────────────────────────────────────────
const SB_URL = "https://okwqamdrgwbfyncqcide.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd3FhbWRyZ3diZnluY3FjaWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTg4NjksImV4cCI6MjA5NDE5NDg2OX0.g31os5TAoLaEPHyGGTg67r6BmxnoSxemMRklkO3d9zM";
const HEADERS = { "Content-Type": "application/json", apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };

async function sbGet() {
  const r = await fetch(`${SB_URL}/rest/v1/kanban_cards?order=criado_em.desc`, { headers: HEADERS });
  return r.ok ? r.json() : [];
}
async function sbInsert(card) {
  const r = await fetch(`${SB_URL}/rest/v1/kanban_cards`, {
    method: "POST", headers: { ...HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(card),
  });
  const data = await r.json();
  return Array.isArray(data) ? data[0] : data;
}
async function sbUpdate(id, patch) {
  await fetch(`${SB_URL}/rest/v1/kanban_cards?id=eq.${id}`, {
    method: "PATCH", headers: HEADERS, body: JSON.stringify(patch),
  });
}
async function sbDelete(id) {
  await fetch(`${SB_URL}/rest/v1/kanban_cards?id=eq.${id}`, {
    method: "DELETE", headers: HEADERS,
  });
}

// ── Constantes ────────────────────────────────────────────────────────────────
const COLUNAS = [
  { id: "a_testar", label: "A Testar",  cor: "#6366f1", desc: "Aguardando rodar" },
  { id: "ativo",    label: "Ativo",     cor: "#f59e0b", desc: "Rodando agora"    },
  { id: "validado", label: "Validado",  cor: "#22c55e", desc: "Performou bem"    },
  { id: "melhorar", label: "Melhorar",  cor: "#ef4444", desc: "Precisa ajuste"   },
];

const COR_MAP = {
  green:"#22c55e", amber:"#f59e0b", blue:"#3b82f6", red:"#ef4444",
  purple:"#a855f7", teal:"#14b8a6", orange:"#f97316", indigo:"#6366f1",
  slate:"#94a3b8", yellow:"#eab308", rose:"#f43f5e",
};

// ── Componente principal ──────────────────────────────────────────────────────
export default function PageKanban({ funis = [] }) {
  const [cards, setCards]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [dragging, setDragging]       = useState(null);
  const [dragOver, setDragOver]       = useState(null);
  const [showForm, setShowForm]       = useState(false);
  const [detalhe, setDetalhe]         = useState(null);
  const [filtroFunil, setFiltroFunil] = useState("todos");
  const [showPrompt, setShowPrompt]   = useState(false); // dropdown do prompt no detalhe

  // Campos editáveis no painel lateral
  const [editNarracao,  setEditNarracao]  = useState("");
  const [editLegenda,   setEditLegenda]   = useState("");
  const [editNotas,     setEditNotas]     = useState("");
  const [editHook,      setEditHook]      = useState("");
  const [editRoas,      setEditRoas]      = useState("");
  const [editLinkVideo, setEditLinkVideo] = useState("");

  const ANGULO_MAP = Object.fromEntries(ANGULOS.map(a => [a.id, a]));
  const TIPO_MAP   = Object.fromEntries(TIPOS.map(t => [t.id, t]));

  const [form, setForm] = useState({
    titulo: "", funil_id: funis[0]?.id || "v1",
    angulo_id: "historia", tipo_id: "copy",
    hook: "", roas: "", narracao: "", legenda: "", notas: "",
    link_video: "", coluna: "a_testar",
  });

  // Carrega do Supabase ao montar
  const carregar = useCallback(async () => {
    setLoading(true);
    const data = await sbGet();
    setCards(data);
    setLoading(false);
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  // Abre detalhe e carrega campos
  function abrirDetalhe(card) {
    setDetalhe(card);
    setShowPrompt(false);
    setEditNarracao(card.narracao  || "");
    setEditLegenda(card.legenda    || "");
    setEditNotas(card.notas        || "");
    setEditHook(card.hook          || "");
    setEditRoas(card.roas          || "");
    setEditLinkVideo(card.link_video || "");
  }

  function fecharDetalhe() { setDetalhe(null); setShowPrompt(false); }

  // Salva edições no Supabase
  async function salvarDetalhe() {
    if (!detalhe) return;
    setSaving(true);
    const patch = {
      narracao: editNarracao, legenda: editLegenda,
      notas: editNotas, hook: editHook,
      roas: editRoas, link_video: editLinkVideo,
    };
    await sbUpdate(detalhe.id, patch);
    setCards(prev => prev.map(c => c.id === detalhe.id ? { ...c, ...patch } : c));
    setDetalhe(prev => ({ ...prev, ...patch }));
    setSaving(false);
  }

  // Move coluna
  async function moverCard(cardId, novaColuna) {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, coluna: novaColuna } : c));
    if (detalhe?.id === cardId) setDetalhe(prev => ({ ...prev, coluna: novaColuna }));
    await sbUpdate(cardId, { coluna: novaColuna });
  }

  // Exclui
  async function excluirCard(id) {
    setCards(prev => prev.filter(c => c.id !== id));
    if (detalhe?.id === id) setDetalhe(null);
    await sbDelete(id);
  }

  // Adiciona
  async function adicionarCard() {
    const funil  = funis.find(f => f.id === form.funil_id);
    const angulo = ANGULO_MAP[form.angulo_id];
    const tipo   = TIPO_MAP[form.tipo_id];
    const titulo = form.titulo.trim() ||
      `${funil?.nome || form.funil_id} · ${angulo?.nome || ""} · ${tipo?.label || ""}`;

    setSaving(true);
    const novo = await sbInsert({
      titulo,
      funil_id: form.funil_id, funil_nome: funil?.nome, funil_cor: funil?.cor,
      angulo_id: form.angulo_id, angulo_nome: angulo?.nome, angulo_emoji: angulo?.emoji,
      tipo_id: form.tipo_id, tipo_label: tipo?.label, tipo_icon: tipo?.icon,
      hook: form.hook, roas: form.roas,
      narracao: form.narracao, legenda: form.legenda,
      notas: form.notas, link_video: form.link_video,
      coluna: form.coluna,
    });
    if (novo) setCards(prev => [novo, ...prev]);
    setForm(f => ({ ...f, titulo: "", hook: "", roas: "", narracao: "", legenda: "", notas: "", link_video: "" }));
    setShowForm(false);
    setSaving(false);
  }

  function onDragStart(e, id) { setDragging(id); e.dataTransfer.effectAllowed = "move"; }
  function onDrop(e, col) {
    e.preventDefault();
    if (dragging != null) moverCard(dragging, col);
    setDragging(null); setDragOver(null);
  }

  const filtered = filtroFunil === "todos" ? cards : cards.filter(c => c.funil_id === filtroFunil);
  const stats = COLUNAS.reduce((a, c) => { a[c.id] = filtered.filter(x => x.coluna === c.id).length; return a; }, {});

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ padding: 28, minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>▤ Criativos</h1>
          <p style={{ fontSize: 11, color: "#555", marginTop: 3 }}>
            {loading ? "Carregando..." : `${cards.length} criativos · arraste para mover · clique para abrir`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select value={filtroFunil} onChange={e => setFiltroFunil(e.target.value)} style={selSt}>
            <option value="todos">Todos os funis</option>
            {funis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
          </select>
          <button onClick={() => setShowForm(true)} style={btnPri}>+ Novo</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {COLUNAS.map(col => (
          <div key={col.id} style={{
            flex: 1, background: "#111", border: `1px solid ${col.cor}22`,
            borderRadius: 10, padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 10, color: "#555" }}>{col.label}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: col.cor }}>{stats[col.id] ?? 0}</span>
          </div>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: "center", padding: 60, color: "#444", fontSize: 13 }}>
          Carregando criativos...
        </div>
      )}

      {/* Board */}
      {!loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, alignItems: "start" }}>
          {COLUNAS.map(col => {
            const colCards = filtered.filter(c => c.coluna === col.id);
            const over = dragOver === col.id;
            return (
              <div key={col.id}
                onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
                onDragLeave={() => setDragOver(null)}
                onDrop={e => onDrop(e, col.id)}
                style={{
                  background: over ? col.cor + "08" : "#0d0d0d",
                  border: `1px solid ${over ? col.cor + "44" : "#1a1a1a"}`,
                  borderTop: `3px solid ${col.cor}`,
                  borderRadius: 12, padding: 10, minHeight: 160,
                  transition: "all 0.15s",
                }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: col.cor }}>{col.label}</div>
                    <div style={{ fontSize: 9, color: "#333" }}>{col.desc}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: col.cor, background: col.cor + "22", padding: "1px 7px", borderRadius: 10 }}>
                    {colCards.length}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {colCards.map(card => (
                    <MiniCard key={card.id} card={card}
                      onAbrir={() => abrirDetalhe(card)}
                      onDragStart={e => onDragStart(e, card.id)} />
                  ))}
                  {colCards.length === 0 && (
                    <div style={{ padding: "16px 0", textAlign: "center", color: "#1e1e1e", fontSize: 11 }}>Solte aqui</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Novo */}
      {showForm && (
        <ModalOverlay onClose={() => setShowForm(false)}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 18px" }}>Novo criativo</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            <FRow label="Título (vazio = automático)">
              <input
                placeholder={`${funis.find(f=>f.id===form.funil_id)?.nome||""} · ${ANGULO_MAP[form.angulo_id]?.nome||""} · ${TIPO_MAP[form.tipo_id]?.label||""}`}
                value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})}
                style={inp} autoFocus />
            </FRow>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <FRow label="Funil">
                <select value={form.funil_id} onChange={e => setForm({...form, funil_id: e.target.value})} style={inp}>
                  {funis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                </select>
              </FRow>
              <FRow label="Coluna">
                <select value={form.coluna} onChange={e => setForm({...form, coluna: e.target.value})} style={inp}>
                  {COLUNAS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </FRow>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <FRow label="Ângulo">
                <select value={form.angulo_id} onChange={e => setForm({...form, angulo_id: e.target.value})} style={inp}>
                  {ANGULOS.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.nome}</option>)}
                </select>
              </FRow>
              <FRow label="Tipo">
                <select value={form.tipo_id} onChange={e => setForm({...form, tipo_id: e.target.value})} style={inp}>
                  {TIPOS.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
                </select>
              </FRow>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <FRow label="Hook %"><input type="number" placeholder="ex: 52.3" value={form.hook} onChange={e => setForm({...form, hook: e.target.value})} style={inp} /></FRow>
              <FRow label="ROAS"><input type="number" step="0.01" placeholder="ex: 1.4" value={form.roas} onChange={e => setForm({...form, roas: e.target.value})} style={inp} /></FRow>
            </div>

            <FRow label="🔗 Link (YouTube / Instagram)">
              <input placeholder="https://..." value={form.link_video} onChange={e => setForm({...form, link_video: e.target.value})} style={inp} />
            </FRow>

            <FRow label="🎙 Narração / Roteiro / Copy">
              <textarea placeholder="Cole o roteiro, script ou copy..." value={form.narracao} onChange={e => setForm({...form, narracao: e.target.value})} style={{ ...inp, minHeight: 80, resize: "vertical" }} />
            </FRow>

            <FRow label="✍️ Legenda">
              <textarea placeholder="Cole a legenda..." value={form.legenda} onChange={e => setForm({...form, legenda: e.target.value})} style={{ ...inp, minHeight: 60, resize: "vertical" }} />
            </FRow>

            <FRow label="Notas">
              <textarea placeholder="Observações, ajustes..." value={form.notas} onChange={e => setForm({...form, notas: e.target.value})} style={{ ...inp, minHeight: 50, resize: "vertical" }} />
            </FRow>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>
            <button onClick={() => setShowForm(false)} style={btnSec}>Cancelar</button>
            <button onClick={adicionarCard} disabled={saving} style={btnPri}>
              {saving ? "Salvando..." : "Adicionar"}
            </button>
          </div>
        </ModalOverlay>
      )}

      {/* Painel lateral de detalhe */}
      {detalhe && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", justifyContent: "flex-end", zIndex: 200 }}
          onClick={fecharDetalhe}>
          <div onClick={e => e.stopPropagation()} style={{
            width: 580, maxWidth: "95vw", height: "100vh",
            background: "#0d0d0d", borderLeft: "1px solid #222",
            display: "flex", flexDirection: "column", overflowY: "auto",
          }}>

            {/* Header */}
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexShrink: 0 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 8 }}>{detalhe.titulo}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Tag cor={COR_MAP[detalhe.funil_cor]}>{detalhe.funil_nome}</Tag>
                  <Tag>{detalhe.angulo_emoji} {detalhe.angulo_nome}</Tag>
                  <Tag>{detalhe.tipo_icon} {detalhe.tipo_label}</Tag>
                  <Tag cor={COLUNAS.find(c=>c.id===detalhe.coluna)?.cor}>{COLUNAS.find(c=>c.id===detalhe.coluna)?.label}</Tag>
                </div>
              </div>
              <button onClick={fecharDetalhe} style={{ fontSize: 18, color: "#444", background: "none", border: "none", cursor: "pointer" }}>✕</button>
            </div>

            {/* Mover para */}
            <div style={{ padding: "12px 20px", borderBottom: "1px solid #1a1a1a", flexShrink: 0 }}>
              <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 7 }}>Mover para</div>
              <div style={{ display: "flex", gap: 6 }}>
                {COLUNAS.filter(c => c.id !== detalhe.coluna).map(c => (
                  <button key={c.id} onClick={() => moverCard(detalhe.id, c.id)}
                    style={{ fontSize: 10, padding: "5px 12px", borderRadius: 6, border: `1px solid ${c.cor}44`, background: c.cor + "11", color: c.cor, cursor: "pointer" }}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Métricas + link */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #1a1a1a", flexShrink: 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Hook %</div>
                  <input type="number" value={editHook} onChange={e => setEditHook(e.target.value)} placeholder="—"
                    style={{ ...inp, padding: "6px 8px", fontSize: 13, fontWeight: 700, color: "#22c55e", background: "#111" }} />
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>ROAS</div>
                  <input type="number" step="0.01" value={editRoas} onChange={e => setEditRoas(e.target.value)} placeholder="—"
                    style={{ ...inp, padding: "6px 8px", fontSize: 13, fontWeight: 700, color: "#f59e0b", background: "#111" }} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>🔗 Link (YouTube / Instagram)</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={editLinkVideo} onChange={e => setEditLinkVideo(e.target.value)} placeholder="https://..."
                    style={{ ...inp, background: "#111", flex: 1 }} />
                  {editLinkVideo && (
                    <a href={editLinkVideo} target="_blank" rel="noopener" style={{
                      fontSize: 11, padding: "7px 12px", borderRadius: 8,
                      background: "#1a1a1a", border: "1px solid #222", color: "#888",
                      textDecoration: "none", display: "flex", alignItems: "center", whiteSpace: "nowrap",
                    }}>Abrir ↗</a>
                  )}
                </div>
              </div>
            </div>

            {/* Prompt gerado — dropdown */}
            {detalhe.narracao && (
              <div style={{ padding: "12px 20px", borderBottom: "1px solid #1a1a1a", flexShrink: 0 }}>
                <button onClick={() => setShowPrompt(p => !p)} style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "#111", border: "1px solid #1e1e1e", borderRadius: 8,
                  padding: "9px 14px", cursor: "pointer", color: "#888", fontSize: 11,
                }}>
                  <span>📋 Ver prompt gerado</span>
                  <span style={{ color: "#444" }}>{showPrompt ? "▲" : "▼"}</span>
                </button>
                {showPrompt && (
                  <pre style={{
                    margin: "8px 0 0", padding: 14,
                    background: "#111", border: "1px solid #1e1e1e", borderRadius: 8,
                    fontSize: 10, lineHeight: 1.7, color: "#666",
                    whiteSpace: "pre-wrap", wordBreak: "break-word",
                    maxHeight: 260, overflowY: "auto",
                    fontFamily: "monospace",
                  }}>
                    {detalhe.narracao}
                  </pre>
                )}
              </div>
            )}

            {/* Narração / Roteiro */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>🎙 Narração / Roteiro / Copy</div>
              <textarea value={editNarracao} onChange={e => setEditNarracao(e.target.value)}
                placeholder="Cole aqui o roteiro, script ou copy gerada pelo ChatGPT..."
                style={{ ...inp, minHeight: 200, resize: "vertical", background: "#111", lineHeight: 1.7, fontSize: 12 }} />
            </div>

            {/* Legenda */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>✍️ Legenda (feed / stories)</div>
              <textarea value={editLegenda} onChange={e => setEditLegenda(e.target.value)}
                placeholder="Cole aqui a legenda gerada..."
                style={{ ...inp, minHeight: 100, resize: "vertical", background: "#111", lineHeight: 1.7, fontSize: 12 }} />
            </div>

            {/* Notas */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Notas</div>
              <textarea value={editNotas} onChange={e => setEditNotas(e.target.value)}
                placeholder="Observações, ajustes, links..."
                style={{ ...inp, minHeight: 72, resize: "vertical", background: "#111", lineHeight: 1.6, fontSize: 12 }} />
            </div>

            {/* Footer */}
            <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: "#2a2a2a" }}>{detalhe.criado_em ? new Date(detalhe.criado_em).toLocaleDateString("pt-BR") : ""}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => excluirCard(detalhe.id)}
                  style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                  Excluir
                </button>
                <button onClick={salvarDetalhe} disabled={saving} style={btnPri}>
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// ── MiniCard ──────────────────────────────────────────────────────────────────
function MiniCard({ card, onAbrir, onDragStart }) {
  const cor = COR_MAP[card.funil_cor] || "#22c55e";
  const temNarracao = !!(card.narracao || "").trim();
  const temLegenda  = !!(card.legenda  || "").trim();
  const temLink     = !!(card.link_video || "").trim();

  return (
    <div draggable onDragStart={onDragStart} onClick={onAbrir}
      style={{
        background: "#111", border: "1px solid #1e1e1e",
        borderLeft: `3px solid ${cor}`, borderRadius: 10,
        padding: "10px 12px", cursor: "pointer", userSelect: "none",
      }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd", lineHeight: 1.4, marginBottom: 7 }}>
        {card.titulo}
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 7 }}>
        <Tag cor={cor}>{card.funil_nome}</Tag>
        {card.angulo_nome && <Tag>{card.angulo_emoji} {card.angulo_nome}</Tag>}
        {card.tipo_label  && <Tag>{card.tipo_icon} {card.tipo_label}</Tag>}
      </div>
      <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
        <StatusDot ativo={temNarracao} label="Narração" />
        <StatusDot ativo={temLegenda}  label="Legenda"  />
        {temLink && <StatusDot ativo cor="#3b82f6" label="Link" />}
        {card.hook && <span style={{ fontSize: 9, color: "#22c55e", marginLeft: "auto" }}>{card.hook}%</span>}
        {card.roas && <span style={{ fontSize: 9, color: "#f59e0b" }}>ROAS {card.roas}</span>}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function StatusDot({ ativo, label, cor }) {
  const c = cor || (ativo ? "#22c55e" : null);
  return (
    <span style={{
      fontSize: 9, padding: "2px 7px", borderRadius: 4,
      background: c ? c + "22" : "#1a1a1a",
      color: c || "#333",
      border: `1px solid ${c ? c + "44" : "#1e1e1e"}`,
    }}>
      {ativo ? "✓" : "·"} {label}
    </span>
  );
}

function Tag({ children, cor }) {
  return (
    <span style={{
      fontSize: 9, padding: "1px 6px", borderRadius: 4,
      background: cor ? cor + "22" : "#1a1a1a",
      color: cor || "#666",
      border: `1px solid ${cor ? cor + "44" : "#222"}`,
    }}>
      {children}
    </span>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#111", border: "1px solid #222", borderRadius: 16, padding: 26, width: 500, maxWidth: "92vw", maxHeight: "90vh", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

function FRow({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 10, color: "#555", display: "block", marginBottom: 4 }}>{label}</label>
      {children}
    </div>
  );
}

const inp    = { width: "100%", padding: "8px 10px", background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 8, color: "#ccc", fontSize: 12, fontFamily: "inherit" };
const selSt  = { fontSize: 11, padding: "7px 10px", background: "#111", border: "1px solid #1e1e1e", borderRadius: 8, color: "#888" };
const btnPri = { fontSize: 11, padding: "8px 18px", borderRadius: 8, border: "none", background: "#22c55e", color: "#000", fontWeight: 700, cursor: "pointer" };
const btnSec = { fontSize: 11, padding: "8px 14px", borderRadius: 8, border: "1px solid #222", background: "#1a1a1a", color: "#888", cursor: "pointer" };