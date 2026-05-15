import { useState, useEffect } from "react";
import { ANGULOS, TIPOS } from "../data";

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

function loadCards() {
  try { return JSON.parse(localStorage.getItem("kanban_cards") || "[]"); }
  catch { return []; }
}

export default function PageKanban({ funis = [] }) {
  const [cards, setCards]           = useState(loadCards);
  const [dragging, setDragging]     = useState(null);
  const [dragOver, setDragOver]     = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [detalhe, setDetalhe]       = useState(null);
  const [filtroFunil, setFiltroFunil] = useState("todos");

  // campos editáveis no painel lateral
  const [editNarracao, setEditNarracao] = useState("");
  const [editLegenda,  setEditLegenda]  = useState("");
  const [editNotas,    setEditNotas]    = useState("");
  const [editHook,     setEditHook]     = useState("");
  const [editRoas,     setEditRoas]     = useState("");

  const ANGULO_MAP = Object.fromEntries(ANGULOS.map(a => [a.id, a]));
  const TIPO_MAP   = Object.fromEntries(TIPOS.map(t => [t.id, t]));

  const [form, setForm] = useState({
    titulo: "",
    funil_id:  funis[0]?.id || "v1",
    angulo_id: "historia",
    tipo_id:   "copy",
    hook: "", roas: "",
    narracao: "", legenda: "", notas: "",
    coluna: "a_testar",
  });

  // Persiste sempre que cards muda
  useEffect(() => {
    localStorage.setItem("kanban_cards", JSON.stringify(cards));
  }, [cards]);

  // Carrega campos do card ao abrir detalhe
  function abrirDetalhe(card) {
    setDetalhe(card);
    setEditNarracao(card.narracao || card.roteiro || ""); // retrocompatível com roteiro antigo
    setEditLegenda(card.legenda   || "");
    setEditNotas(card.notas       || "");
    setEditHook(card.hook         || "");
    setEditRoas(card.roas         || "");
  }

  function fecharDetalhe() { setDetalhe(null); }

  function salvarDetalhe() {
    setCards(prev => prev.map(c =>
      c.id === detalhe.id
        ? { ...c, narracao: editNarracao, legenda: editLegenda, notas: editNotas, hook: editHook, roas: editRoas }
        : c
    ));
    setDetalhe(prev => ({ ...prev, narracao: editNarracao, legenda: editLegenda, notas: editNotas, hook: editHook, roas: editRoas }));
  }

  function moverCard(cardId, novaColuna) {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, coluna: novaColuna } : c));
    if (detalhe?.id === cardId) setDetalhe(prev => ({ ...prev, coluna: novaColuna }));
  }

  function excluirCard(id) {
    setCards(prev => prev.filter(c => c.id !== id));
    if (detalhe?.id === id) setDetalhe(null);
  }

  function adicionarCard() {
    const funil  = funis.find(f => f.id === form.funil_id);
    const angulo = ANGULO_MAP[form.angulo_id];
    const tipo   = TIPO_MAP[form.tipo_id];
    // Nome automático se título vazio
    const titulo = form.titulo.trim() ||
      `${funil?.nome || form.funil_id} · ${angulo?.nome || form.angulo_id} · ${tipo?.label || form.tipo_id}`;

    const novo = {
      id: Date.now(),
      titulo,
      funil_id:    form.funil_id,
      funil_nome:  funil?.nome || form.funil_id,
      funil_cor:   funil?.cor  || "green",
      angulo_id:   form.angulo_id,
      angulo_nome: angulo?.nome  || "",
      angulo_emoji:angulo?.emoji || "",
      tipo_id:     form.tipo_id,
      tipo_label:  tipo?.label || form.tipo_id,
      tipo_icon:   tipo?.icon  || "📄",
      hook:     form.hook,
      roas:     form.roas,
      narracao: form.narracao,
      legenda:  form.legenda,
      notas:    form.notas,
      coluna:   form.coluna,
      criado:   new Date().toLocaleDateString("pt-BR"),
    };

    setCards(prev => [novo, ...prev]);
    setForm(f => ({ ...f, titulo: "", hook: "", roas: "", narracao: "", legenda: "", notas: "" }));
    setShowForm(false);
  }

  function onDragStart(e, id) { setDragging(id); e.dataTransfer.effectAllowed = "move"; }
  function onDrop(e, col) {
    e.preventDefault();
    if (dragging != null) moverCard(dragging, col);
    setDragging(null); setDragOver(null);
  }

  const filtered = filtroFunil === "todos" ? cards : cards.filter(c => c.funil_id === filtroFunil);
  const stats = COLUNAS.reduce((a, c) => { a[c.id] = filtered.filter(x => x.coluna === c.id).length; return a; }, {});

  return (
    <div style={{ padding: 28, minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>▤ Criativos</h1>
          <p style={{ fontSize: 11, color: "#555", marginTop: 3 }}>{cards.length} criativos · arraste para mover · clique para abrir</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select value={filtroFunil} onChange={e => setFiltroFunil(e.target.value)}
            style={selSt}>
            <option value="todos">Todos os funis</option>
            {funis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
          </select>
          <button onClick={() => setShowForm(true)} style={btnPriSt}>+ Novo</button>
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
            <span style={{ fontSize: 18, fontWeight: 700, color: col.cor }}>{stats[col.id]}</span>
          </div>
        ))}
      </div>

      {/* Board */}
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
                  <div style={{ fontSize: 9, color: "#333", marginTop: 1 }}>{col.desc}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: col.cor, background: col.cor + "22", padding: "1px 7px", borderRadius: 10 }}>
                  {colCards.length}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {colCards.map(card => (
                  <MiniCard key={card.id} card={card}
                    onAbrir={() => abrirDetalhe(card)}
                    onMover={c => moverCard(card.id, c)}
                    onDragStart={e => onDragStart(e, card.id)}
                    colunas={COLUNAS} />
                ))}
                {colCards.length === 0 && (
                  <div style={{ padding: "16px 0", textAlign: "center", color: "#1e1e1e", fontSize: 11 }}>Solte aqui</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Novo */}
      {showForm && (
        <ModalOverlay onClose={() => setShowForm(false)}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 18px" }}>Novo criativo</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            <FormRow label="Título (vazio = automático)">
              <input
                placeholder={`${funis.find(f=>f.id===form.funil_id)?.nome||""} · ${ANGULO_MAP[form.angulo_id]?.nome||""} · ${TIPO_MAP[form.tipo_id]?.label||""}`}
                value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})}
                style={inp} autoFocus />
            </FormRow>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <FormRow label="Funil">
                <select value={form.funil_id} onChange={e => setForm({...form, funil_id: e.target.value})} style={inp}>
                  {funis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                </select>
              </FormRow>
              <FormRow label="Coluna inicial">
                <select value={form.coluna} onChange={e => setForm({...form, coluna: e.target.value})} style={inp}>
                  {COLUNAS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </FormRow>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <FormRow label="Ângulo">
                <select value={form.angulo_id} onChange={e => setForm({...form, angulo_id: e.target.value})} style={inp}>
                  {ANGULOS.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.nome}</option>)}
                </select>
              </FormRow>
              <FormRow label="Tipo">
                <select value={form.tipo_id} onChange={e => setForm({...form, tipo_id: e.target.value})} style={inp}>
                  {TIPOS.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
                </select>
              </FormRow>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <FormRow label="Hook % (se já rodou)">
                <input type="number" placeholder="ex: 52.3" value={form.hook} onChange={e => setForm({...form, hook: e.target.value})} style={inp} />
              </FormRow>
              <FormRow label="ROAS (se já rodou)">
                <input type="number" step="0.01" placeholder="ex: 1.4" value={form.roas} onChange={e => setForm({...form, roas: e.target.value})} style={inp} />
              </FormRow>
            </div>

            <FormRow label="🎙 Narração / Roteiro / Copy">
              <textarea placeholder="Cole o roteiro, script ou copy gerada..."
                value={form.narracao} onChange={e => setForm({...form, narracao: e.target.value})}
                style={{ ...inp, minHeight: 90, resize: "vertical" }} />
            </FormRow>

            <FormRow label="✍️ Legenda (feed / stories)">
              <textarea placeholder="Cole a legenda gerada..."
                value={form.legenda} onChange={e => setForm({...form, legenda: e.target.value})}
                style={{ ...inp, minHeight: 60, resize: "vertical" }} />
            </FormRow>

            <FormRow label="Notas">
              <textarea placeholder="Observações, ajustes, links..."
                value={form.notas} onChange={e => setForm({...form, notas: e.target.value})}
                style={{ ...inp, minHeight: 50, resize: "vertical" }} />
            </FormRow>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>
            <button onClick={() => setShowForm(false)} style={btnSecSt}>Cancelar</button>
            <button onClick={adicionarCard} style={btnPriSt}>Adicionar</button>
          </div>
        </ModalOverlay>
      )}

      {/* Painel lateral de detalhe */}
      {detalhe && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
          display: "flex", justifyContent: "flex-end", zIndex: 200,
        }} onClick={fecharDetalhe}>
          <div onClick={e => e.stopPropagation()} style={{
            width: 580, maxWidth: "95vw", height: "100vh",
            background: "#0d0d0d", borderLeft: "1px solid #222",
            display: "flex", flexDirection: "column", overflowY: "auto",
          }}>

            {/* Header */}
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexShrink: 0 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 8 }}>
                  {detalhe.titulo}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Tag cor={COR_MAP[detalhe.funil_cor]}>{detalhe.funil_nome}</Tag>
                  <Tag>{detalhe.angulo_emoji} {detalhe.angulo_nome}</Tag>
                  <Tag>{detalhe.tipo_icon} {detalhe.tipo_label}</Tag>
                  <Tag cor={COLUNAS.find(c=>c.id===detalhe.coluna)?.cor}>
                    {COLUNAS.find(c=>c.id===detalhe.coluna)?.label}
                  </Tag>
                </div>
              </div>
              <button onClick={fecharDetalhe} style={{ fontSize: 18, color: "#444", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>✕</button>
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

            {/* Métricas editáveis */}
            <div style={{ padding: "12px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", gap: 14, flexShrink: 0 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Hook %</div>
                <input type="number" value={editHook} onChange={e => setEditHook(e.target.value)}
                  placeholder="—"
                  style={{ ...inp, padding: "6px 8px", fontSize: 13, fontWeight: 700, color: "#22c55e", background: "#111" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>ROAS</div>
                <input type="number" step="0.01" value={editRoas} onChange={e => setEditRoas(e.target.value)}
                  placeholder="—"
                  style={{ ...inp, padding: "6px 8px", fontSize: 13, fontWeight: 700, color: "#f59e0b", background: "#111" }} />
              </div>
            </div>

            {/* Narração / Roteiro / Copy */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
                🎙 Narração / Roteiro / Copy
              </div>
              <textarea
                value={editNarracao}
                onChange={e => setEditNarracao(e.target.value)}
                placeholder="Cole aqui o roteiro, script ou copy gerada pelo ChatGPT..."
                style={{ ...inp, minHeight: 220, resize: "vertical", background: "#111", lineHeight: 1.7, fontSize: 12 }}
              />
            </div>

            {/* Legenda */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
                ✍️ Legenda (feed / stories)
              </div>
              <textarea
                value={editLegenda}
                onChange={e => setEditLegenda(e.target.value)}
                placeholder="Cole aqui a legenda gerada..."
                style={{ ...inp, minHeight: 120, resize: "vertical", background: "#111", lineHeight: 1.7, fontSize: 12 }}
              />
            </div>

            {/* Notas */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Notas</div>
              <textarea
                value={editNotas}
                onChange={e => setEditNotas(e.target.value)}
                placeholder="Observações, ajustes, links..."
                style={{ ...inp, minHeight: 72, resize: "vertical", background: "#111", lineHeight: 1.6, fontSize: 12 }}
              />
            </div>

            {/* Footer */}
            <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: "#2a2a2a" }}>Criado em {detalhe.criado}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => excluirCard(detalhe.id)}
                  style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                  Excluir
                </button>
                <button onClick={salvarDetalhe} style={btnPriSt}>Salvar</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// ── MiniCard ─────────────────────────────────────────────────────────────────
function MiniCard({ card, onAbrir, onDragStart, colunas }) {
  const cor = COR_MAP[card.funil_cor] || "#22c55e";
  const temNarracao = !!(card.narracao || card.roteiro || "").trim();
  const temLegenda  = !!(card.legenda  || "").trim();

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
        <Tag>{card.angulo_emoji} {card.angulo_nome}</Tag>
        <Tag>{card.tipo_icon} {card.tipo_label}</Tag>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <StatusDot ativo={temNarracao} label="Narração" />
        <StatusDot ativo={temLegenda}  label="Legenda"  />
        {card.hook && <span style={{ fontSize: 9, color: "#22c55e", marginLeft: "auto" }}>{card.hook}%</span>}
        {card.roas && <span style={{ fontSize: 9, color: "#f59e0b" }}>ROAS {card.roas}</span>}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function StatusDot({ ativo, label }) {
  return (
    <span style={{
      fontSize: 9, padding: "2px 7px", borderRadius: 4,
      background: ativo ? "#22c55e22" : "#1a1a1a",
      color: ativo ? "#22c55e" : "#333",
      border: `1px solid ${ativo ? "#22c55e44" : "#1e1e1e"}`,
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

function FormRow({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 10, color: "#555", display: "block", marginBottom: 4 }}>{label}</label>
      {children}
    </div>
  );
}

const inp     = { width: "100%", padding: "8px 10px", background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 8, color: "#ccc", fontSize: 12, fontFamily: "inherit" };
const selSt   = { fontSize: 11, padding: "7px 10px", background: "#111", border: "1px solid #1e1e1e", borderRadius: 8, color: "#888" };
const btnPriSt = { fontSize: 11, padding: "8px 18px", borderRadius: 8, border: "none", background: "#22c55e", color: "#000", fontWeight: 700, cursor: "pointer" };
const btnSecSt = { fontSize: 11, padding: "8px 14px", borderRadius: 8, border: "1px solid #222", background: "#1a1a1a", color: "#888", cursor: "pointer" };
