import { useState, useEffect } from "react";
import { ANGULOS } from "../data";

const COLUNAS = [
  { id: "a_testar",  label: "A Testar",  cor: "#6366f1", desc: "Prompts gerados, aguardando rodar" },
  { id: "ativo",     label: "Ativo",     cor: "#f59e0b", desc: "Rodando agora" },
  { id: "validado",  label: "Validado",  cor: "#22c55e", desc: "Performou bem, manter" },
  { id: "melhorar",  label: "Melhorar",  cor: "#ef4444", desc: "Rodou mas precisa ajuste" },
];

const COR_MAP = {
  green: "#22c55e", amber: "#f59e0b", blue: "#3b82f6",
  red: "#ef4444", purple: "#a855f7", teal: "#14b8a6",
  orange: "#f97316", indigo: "#6366f1", slate: "#94a3b8",
};

const TIPOS_LABEL = { copy: "📝 Copy", vsl: "🎬 VSL", social: "📱 Social", modelagem: "✏️ Modelagem" };

function loadCards() {
  try { return JSON.parse(localStorage.getItem("kanban_cards") || "[]"); }
  catch { return []; }
}
function saveCards(cards) {
  localStorage.setItem("kanban_cards", JSON.stringify(cards));
}

export default function PageKanban({ funis = [] }) {
  const [cards, setCards] = useState(loadCards);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expandido, setExpandido] = useState(null);
  const [filtroFunil, setFiltroFunil] = useState("todos");
  const [form, setForm] = useState({
    titulo: "", funil_id: funis[0]?.id || "v1",
    angulo_id: "historia", tipo: "copy",
    hook: "", roas: "", notas: "",
    coluna: "a_testar",
  });

  useEffect(() => { saveCards(cards); }, [cards]);

  function adicionarCard() {
    if (!form.titulo.trim()) return;
    const funil = funis.find(f => f.id === form.funil_id);
    const angulo = ANGULOS.find(a => a.id === form.angulo_id);
    const novo = {
      id: Date.now(),
      titulo: form.titulo,
      funil_id: form.funil_id,
      funil_nome: funil?.nome || form.funil_id,
      funil_cor: funil?.cor || "green",
      angulo_id: form.angulo_id,
      angulo_nome: angulo?.nome || "",
      angulo_emoji: angulo?.emoji || "",
      tipo: form.tipo,
      hook: form.hook,
      roas: form.roas,
      notas: form.notas,
      coluna: form.coluna,
      criado: new Date().toLocaleDateString("pt-BR"),
    };
    setCards(prev => [novo, ...prev]);
    setForm({ ...form, titulo: "", hook: "", roas: "", notas: "" });
    setShowForm(false);
  }

  function moverCard(cardId, novaColuna) {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, coluna: novaColuna } : c));
  }

  function excluirCard(id) {
    setCards(prev => prev.filter(c => c.id !== id));
    if (expandido === id) setExpandido(null);
  }

  function onDragStart(e, cardId) {
    setDragging(cardId);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDrop(e, colunaId) {
    e.preventDefault();
    if (dragging !== null) { moverCard(dragging, colunaId); }
    setDragging(null);
    setDragOver(null);
  }

  const cardsFiltrados = filtroFunil === "todos"
    ? cards
    : cards.filter(c => c.funil_id === filtroFunil);

  // Stats por coluna
  const stats = COLUNAS.reduce((acc, col) => {
    acc[col.id] = cardsFiltrados.filter(c => c.coluna === col.id).length;
    return acc;
  }, {});

  return (
    <div style={{ padding: 28, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>▤ Criativos</h1>
          <p style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
            {cards.length} criativos · arraste entre colunas para atualizar o status
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Filtro funil */}
          <select
            value={filtroFunil}
            onChange={e => setFiltroFunil(e.target.value)}
            style={{ fontSize: 11, padding: "7px 10px", background: "#111", border: "1px solid #1e1e1e", borderRadius: 8, color: "#888" }}
          >
            <option value="todos">Todos os funis</option>
            {funis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
          </select>
          <button onClick={() => setShowForm(true)} style={{
            padding: "8px 16px", borderRadius: 8, border: "none",
            background: "#22c55e", color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>
            + Novo criativo
          </button>
        </div>
      </div>

      {/* Stats rápidos */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {COLUNAS.map(col => (
          <div key={col.id} style={{
            flex: 1, background: "#111", border: `1px solid ${col.cor}22`,
            borderRadius: 10, padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ fontSize: 11, color: "#555" }}>{col.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: col.cor }}>{stats[col.id]}</div>
          </div>
        ))}
      </div>

      {/* Board */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, alignItems: "start" }}>
        {COLUNAS.map(col => {
          const colCards = cardsFiltrados.filter(c => c.coluna === col.id);
          const isOver = dragOver === col.id;
          return (
            <div
              key={col.id}
              onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={e => onDrop(e, col.id)}
              style={{
                background: isOver ? col.cor + "08" : "#0d0d0d",
                border: `1px solid ${isOver ? col.cor + "44" : "#1a1a1a"}`,
                borderTop: `3px solid ${col.cor}`,
                borderRadius: 12,
                padding: 12,
                minHeight: 200,
                transition: "all 0.15s",
              }}
            >
              {/* Coluna header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: col.cor }}>{col.label}</div>
                  <div style={{ fontSize: 10, color: "#333", marginTop: 1 }}>{col.desc}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: col.cor, background: col.cor + "22", padding: "1px 7px", borderRadius: 10 }}>
                  {colCards.length}
                </span>
              </div>

              {/* Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {colCards.map(card => (
                  <KanbanCard
                    key={card.id}
                    card={card}
                    expandido={expandido === card.id}
                    onExpand={() => setExpandido(expandido === card.id ? null : card.id)}
                    onExcluir={() => excluirCard(card.id)}
                    onMover={(col) => moverCard(card.id, col)}
                    onDragStart={(e) => onDragStart(e, card.id)}
                    colunas={COLUNAS}
                  />
                ))}
                {colCards.length === 0 && (
                  <div style={{ padding: "20px 0", textAlign: "center", color: "#222", fontSize: 11 }}>
                    Solte aqui
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Novo Criativo */}
      {showForm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }} onClick={() => setShowForm(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#111", border: "1px solid #222", borderRadius: 16,
            padding: 28, width: 480, maxWidth: "90vw",
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 20px" }}>
              Novo criativo
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                placeholder="Título / nome do criativo *"
                value={form.titulo}
                onChange={e => setForm({ ...form, titulo: e.target.value })}
                style={inputSt}
                autoFocus
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <label style={labelSt}>Funil</label>
                  <select value={form.funil_id} onChange={e => setForm({ ...form, funil_id: e.target.value })} style={inputSt}>
                    {funis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelSt}>Coluna inicial</label>
                  <select value={form.coluna} onChange={e => setForm({ ...form, coluna: e.target.value })} style={inputSt}>
                    {COLUNAS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <label style={labelSt}>Ângulo</label>
                  <select value={form.angulo_id} onChange={e => setForm({ ...form, angulo_id: e.target.value })} style={inputSt}>
                    {ANGULOS.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelSt}>Tipo</label>
                  <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} style={inputSt}>
                    {Object.entries(TIPOS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <label style={labelSt}>Hook % (se já rodou)</label>
                  <input type="number" placeholder="ex: 52.3" value={form.hook} onChange={e => setForm({ ...form, hook: e.target.value })} style={inputSt} />
                </div>
                <div>
                  <label style={labelSt}>ROAS (se já rodou)</label>
                  <input type="number" step="0.01" placeholder="ex: 1.4" value={form.roas} onChange={e => setForm({ ...form, roas: e.target.value })} style={inputSt} />
                </div>
              </div>

              <div>
                <label style={labelSt}>Notas</label>
                <textarea
                  placeholder="Observações, ajustes, links..."
                  value={form.notas}
                  onChange={e => setForm({ ...form, notas: e.target.value })}
                  style={{ ...inputSt, minHeight: 72, resize: "vertical" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 20 }}>
              <button onClick={() => setShowForm(false)} style={{ ...btnSt }}>Cancelar</button>
              <button onClick={adicionarCard} style={{ ...btnSt, background: "#22c55e", color: "#000", fontWeight: 700, border: "none" }}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KanbanCard({ card, expandido, onExpand, onExcluir, onMover, onDragStart, colunas }) {
  const cor = COR_MAP[card.funil_cor] || "#22c55e";

  return (
    <div
      draggable
      onDragStart={onDragStart}
      style={{
        background: "#111",
        border: "1px solid #1e1e1e",
        borderLeft: `3px solid ${cor}`,
        borderRadius: 10,
        padding: "11px 12px",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#ddd", lineHeight: 1.4, flex: 1 }}>
          {card.titulo}
        </div>
        <button onClick={onExpand} style={{ fontSize: 12, color: "#444", background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0 }}>
          {expandido ? "▲" : "▼"}
        </button>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
        <span style={{ fontSize: 9, padding: "1px 6px", background: cor + "22", color: cor, borderRadius: 4 }}>
          {card.funil_nome}
        </span>
        <span style={{ fontSize: 9, padding: "1px 6px", background: "#1a1a1a", color: "#666", borderRadius: 4 }}>
          {card.angulo_emoji} {card.angulo_nome}
        </span>
        <span style={{ fontSize: 9, padding: "1px 6px", background: "#1a1a1a", color: "#555", borderRadius: 4 }}>
          {TIPOS_LABEL[card.tipo]}
        </span>
      </div>

      {/* Métricas se tiver */}
      {(card.hook || card.roas) && (
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          {card.hook && (
            <span style={{ fontSize: 10, color: "#22c55e" }}>Hook: {card.hook}%</span>
          )}
          {card.roas && (
            <span style={{ fontSize: 10, color: "#f59e0b" }}>ROAS: {card.roas}</span>
          )}
        </div>
      )}

      {/* Expandido */}
      {expandido && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #1a1a1a" }}>
          {card.notas && (
            <div style={{ fontSize: 11, color: "#666", lineHeight: 1.6, marginBottom: 10 }}>
              {card.notas}
            </div>
          )}

          {/* Mover para */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: "#333", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Mover para</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {colunas.filter(c => c.id !== card.coluna).map(c => (
                <button
                  key={c.id}
                  onClick={() => onMover(c.id)}
                  style={{ fontSize: 9, padding: "3px 8px", borderRadius: 5, border: `1px solid ${c.cor}44`, background: c.cor + "11", color: c.cor, cursor: "pointer" }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 9, color: "#2a2a2a" }}>{card.criado}</span>
            <button onClick={onExcluir} style={{ fontSize: 10, color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputSt = {
  width: "100%", padding: "8px 10px",
  background: "#0d0d0d", border: "1px solid #1e1e1e",
  borderRadius: 8, color: "#ccc", fontSize: 12, fontFamily: "inherit",
};
const labelSt = { fontSize: 10, color: "#555", display: "block", marginBottom: 4 };
const btnSt = {
  fontSize: 11, padding: "8px 16px", borderRadius: 8,
  border: "1px solid #222", background: "#1a1a1a", color: "#888", cursor: "pointer",
};
