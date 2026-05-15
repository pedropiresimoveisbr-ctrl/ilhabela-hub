import { useState, useEffect } from "react";
import { ANGULOS, TIPOS } from "../data";

const COLUNAS = [
  { id: "a_testar",  label: "A Testar",  cor: "#6366f1", desc: "Aguardando rodar" },
  { id: "ativo",     label: "Ativo",     cor: "#f59e0b", desc: "Rodando agora" },
  { id: "validado",  label: "Validado",  cor: "#22c55e", desc: "Performou bem" },
  { id: "melhorar",  label: "Melhorar",  cor: "#ef4444", desc: "Precisa ajuste" },
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
function saveCards(cards) { localStorage.setItem("kanban_cards", JSON.stringify(cards)); }

// Gera nome automático legível
function gerarNome(funil_nome, angulo_nome, tipo_label) {
  return `${funil_nome} · ${angulo_nome} · ${tipo_label}`;
}

export default function PageKanban({ funis = [] }) {
  const [cards, setCards]       = useState(loadCards);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [detalhe, setDetalhe]   = useState(null); // card aberto em tela cheia
  const [editRoteiro, setEditRoteiro] = useState(""); // texto editado no detalhe
  const [filtroFunil, setFiltroFunil] = useState("todos");

  const ANGULO_MAP = Object.fromEntries(ANGULOS.map(a => [a.id, a]));
  const TIPO_MAP   = Object.fromEntries(TIPOS.map(t => [t.id, t]));

  const [form, setForm] = useState({
    titulo: "", funil_id: funis[0]?.id || "v1",
    angulo_id: "historia", tipo_id: "copy",
    hook: "", roas: "", notas: "", roteiro: "",
    coluna: "a_testar",
  });

  useEffect(() => { saveCards(cards); }, [cards]);

  // Quando abre detalhe, carrega roteiro atual
  useEffect(() => {
    if (detalhe) setEditRoteiro(detalhe.roteiro || "");
  }, [detalhe?.id]);

  function adicionarCard() {
    if (!form.titulo.trim()) return;
    const funil  = funis.find(f => f.id === form.funil_id);
    const angulo = ANGULO_MAP[form.angulo_id];
    const tipo   = TIPO_MAP[form.tipo_id];
    const novo = {
      id: Date.now(),
      titulo: form.titulo || gerarNome(funil?.nome, angulo?.nome, tipo?.label),
      funil_id: form.funil_id,
      funil_nome: funil?.nome || form.funil_id,
      funil_cor: funil?.cor || "green",
      angulo_id: form.angulo_id,
      angulo_nome: angulo?.nome || "",
      angulo_emoji: angulo?.emoji || "",
      tipo_id: form.tipo_id,
      tipo_label: tipo?.label || form.tipo_id,
      tipo_icon: tipo?.icon || "📄",
      hook: form.hook,
      roas: form.roas,
      notas: form.notas,
      roteiro: form.roteiro,
      coluna: form.coluna,
      criado: new Date().toLocaleDateString("pt-BR"),
    };
    setCards(prev => [novo, ...prev]);
    setForm({ ...form, titulo: "", hook: "", roas: "", notas: "", roteiro: "" });
    setShowForm(false);
  }

  function moverCard(cardId, novaColuna) {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, coluna: novaColuna } : c));
    if (detalhe?.id === cardId) setDetalhe(prev => ({ ...prev, coluna: novaColuna }));
  }

  function excluirCard(id) {
    setCards(prev => prev.filter(c => c.id !== id));
    if (detalhe?.id === id) setDetalhe(null);
  }

  function salvarRoteiro() {
    setCards(prev => prev.map(c => c.id === detalhe.id ? { ...c, roteiro: editRoteiro } : c));
    setDetalhe(prev => ({ ...prev, roteiro: editRoteiro }));
  }

  function salvarNotas(novas) {
    setCards(prev => prev.map(c => c.id === detalhe.id ? { ...c, notas: novas } : c));
    setDetalhe(prev => ({ ...prev, notas: novas }));
  }

  function onDragStart(e, cardId) { setDragging(cardId); e.dataTransfer.effectAllowed = "move"; }
  function onDrop(e, colunaId) {
    e.preventDefault();
    if (dragging !== null) moverCard(dragging, colunaId);
    setDragging(null); setDragOver(null);
  }

  const cardsFiltrados = filtroFunil === "todos" ? cards : cards.filter(c => c.funil_id === filtroFunil);
  const stats = COLUNAS.reduce((acc, col) => { acc[col.id] = cardsFiltrados.filter(c => c.coluna === col.id).length; return acc; }, {});

  return (
    <div style={{ padding: 28, minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>▤ Criativos</h1>
          <p style={{ fontSize: 11, color: "#555", marginTop: 3 }}>{cards.length} criativos · arraste para mover · clique para abrir</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select value={filtroFunil} onChange={e => setFiltroFunil(e.target.value)}
            style={{ fontSize: 11, padding: "7px 10px", background: "#111", border: "1px solid #1e1e1e", borderRadius: 8, color: "#888" }}>
            <option value="todos">Todos os funis</option>
            {funis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
          </select>
          <button onClick={() => setShowForm(true)} style={{
            padding: "8px 16px", borderRadius: 8, border: "none",
            background: "#22c55e", color: "#000", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>+ Novo</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {COLUNAS.map(col => (
          <div key={col.id} style={{
            flex: 1, background: "#111", border: `1px solid ${col.cor}22`,
            borderRadius: 10, padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ fontSize: 10, color: "#555" }}>{col.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: col.cor }}>{stats[col.id]}</div>
          </div>
        ))}
      </div>

      {/* Board */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, alignItems: "start" }}>
        {COLUNAS.map(col => {
          const colCards = cardsFiltrados.filter(c => c.coluna === col.id);
          const isOver = dragOver === col.id;
          return (
            <div key={col.id}
              onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={e => onDrop(e, col.id)}
              style={{
                background: isOver ? col.cor + "08" : "#0d0d0d",
                border: `1px solid ${isOver ? col.cor + "44" : "#1a1a1a"}`,
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
                  <MiniCard
                    key={card.id}
                    card={card}
                    onAbrir={() => setDetalhe(card)}
                    onMover={col => moverCard(card.id, col)}
                    onDragStart={e => onDragStart(e, card.id)}
                    colunas={COLUNAS}
                  />
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
            {/* Nome com sugestão automática */}
            <div>
              <label style={lbl}>Título (deixe vazio para gerar automático)</label>
              <input placeholder={`Ex: ${funis.find(f=>f.id===form.funil_id)?.nome || "Funil"} · ${ANGULO_MAP[form.angulo_id]?.nome || ""} · ${TIPO_MAP[form.tipo_id]?.label || ""}`}
                value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} style={inp} autoFocus />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={lbl}>Funil</label>
                <select value={form.funil_id} onChange={e => setForm({...form, funil_id: e.target.value})} style={inp}>
                  {funis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Coluna inicial</label>
                <select value={form.coluna} onChange={e => setForm({...form, coluna: e.target.value})} style={inp}>
                  {COLUNAS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={lbl}>Ângulo</label>
                <select value={form.angulo_id} onChange={e => setForm({...form, angulo_id: e.target.value})} style={inp}>
                  {ANGULOS.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.nome}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Tipo</label>
                <select value={form.tipo_id} onChange={e => setForm({...form, tipo_id: e.target.value})} style={inp}>
                  {TIPOS.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={lbl}>Hook % (se já rodou)</label>
                <input type="number" placeholder="ex: 52.3" value={form.hook} onChange={e => setForm({...form, hook: e.target.value})} style={inp} />
              </div>
              <div>
                <label style={lbl}>ROAS (se já rodou)</label>
                <input type="number" step="0.01" placeholder="ex: 1.4" value={form.roas} onChange={e => setForm({...form, roas: e.target.value})} style={inp} />
              </div>
            </div>

            <div>
              <label style={lbl}>Roteiro / Legenda / Copy gerada</label>
              <textarea placeholder="Cole aqui o roteiro, legenda ou copy gerada pelo ChatGPT..."
                value={form.roteiro} onChange={e => setForm({...form, roteiro: e.target.value})}
                style={{ ...inp, minHeight: 120, resize: "vertical" }} />
            </div>

            <div>
              <label style={lbl}>Notas</label>
              <textarea placeholder="Observações, ajustes, links..."
                value={form.notas} onChange={e => setForm({...form, notas: e.target.value})}
                style={{ ...inp, minHeight: 60, resize: "vertical" }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>
            <button onClick={() => setShowForm(false)} style={btnSec}>Cancelar</button>
            <button onClick={adicionarCard} style={btnPri}>Adicionar</button>
          </div>
        </ModalOverlay>
      )}

      {/* Detalhe — tela cheia lateral */}
      {detalhe && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          display: "flex", justifyContent: "flex-end", zIndex: 200,
        }} onClick={() => setDetalhe(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            width: 560, maxWidth: "95vw", height: "100vh",
            background: "#0d0d0d", borderLeft: "1px solid #222",
            display: "flex", flexDirection: "column", overflowY: "auto",
          }}>
            {/* Header do detalhe */}
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: 6 }}>
                  {detalhe.titulo}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Tag cor={COR_MAP[detalhe.funil_cor]}>{detalhe.funil_nome}</Tag>
                  <Tag>{detalhe.angulo_emoji} {detalhe.angulo_nome}</Tag>
                  <Tag>{detalhe.tipo_icon} {detalhe.tipo_label}</Tag>
                  <Tag cor={COLUNAS.find(c=>c.id===detalhe.coluna)?.cor}>{COLUNAS.find(c=>c.id===detalhe.coluna)?.label}</Tag>
                </div>
              </div>
              <button onClick={() => setDetalhe(null)} style={{ fontSize: 18, color: "#444", background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0 }}>✕</button>
            </div>

            {/* Métricas */}
            {(detalhe.hook || detalhe.roas) && (
              <div style={{ padding: "12px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", gap: 16 }}>
                {detalhe.hook && <div><div style={{ fontSize: 9, color: "#555" }}>HOOK RATE</div><div style={{ fontSize: 16, fontWeight: 700, color: "#22c55e" }}>{detalhe.hook}%</div></div>}
                {detalhe.roas && <div><div style={{ fontSize: 9, color: "#555" }}>ROAS</div><div style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b" }}>{detalhe.roas}</div></div>}
              </div>
            )}

            {/* Mover para */}
            <div style={{ padding: "12px 20px", borderBottom: "1px solid #1a1a1a" }}>
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

            {/* Roteiro / Copy */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Roteiro / Copy / Legenda
                </div>
                <button onClick={salvarRoteiro}
                  style={{ fontSize: 10, padding: "4px 12px", borderRadius: 6, border: "none", background: "#22c55e", color: "#000", fontWeight: 700, cursor: "pointer" }}>
                  Salvar
                </button>
              </div>
              <textarea
                value={editRoteiro}
                onChange={e => setEditRoteiro(e.target.value)}
                placeholder="Cole aqui o roteiro, legenda ou copy gerada pelo ChatGPT..."
                style={{
                  width: "100%", minHeight: 280, background: "#111",
                  border: "1px solid #1e1e1e", borderRadius: 8,
                  padding: 12, color: "#ccc", fontSize: 12, lineHeight: 1.7,
                  resize: "vertical", fontFamily: "inherit",
                }}
              />
            </div>

            {/* Notas */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Notas</div>
              <textarea
                defaultValue={detalhe.notas}
                onBlur={e => salvarNotas(e.target.value)}
                placeholder="Observações, ajustes, links..."
                style={{ width: "100%", minHeight: 72, background: "#111", border: "1px solid #1e1e1e", borderRadius: 8, padding: 10, color: "#bbb", fontSize: 12, lineHeight: 1.6, resize: "vertical", fontFamily: "inherit" }}
              />
            </div>

            {/* Footer */}
            <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#2a2a2a" }}>Criado em {detalhe.criado}</span>
              <button onClick={() => excluirCard(detalhe.id)}
                style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Card mini no board ────────────────────────────────────────────────────────
function MiniCard({ card, onAbrir, onMover, onDragStart, colunas }) {
  const cor = COR_MAP[card.funil_cor] || "#22c55e";
  const temRoteiro = card.roteiro && card.roteiro.trim().length > 0;

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

      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 }}>
        <span style={{ fontSize: 9, padding: "1px 6px", background: cor + "22", color: cor, borderRadius: 4 }}>
          {card.funil_nome}
        </span>
        <span style={{ fontSize: 9, padding: "1px 6px", background: "#1a1a1a", color: "#666", borderRadius: 4 }}>
          {card.angulo_emoji} {card.angulo_nome}
        </span>
        <span style={{ fontSize: 9, padding: "1px 6px", background: "#1a1a1a", color: "#555", borderRadius: 4 }}>
          {card.tipo_icon} {card.tipo_label}
        </span>
      </div>

      {/* Indicador roteiro */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: 9, padding: "2px 7px", borderRadius: 4,
          background: temRoteiro ? "#22c55e22" : "#1a1a1a",
          color: temRoteiro ? "#22c55e" : "#333",
          border: `1px solid ${temRoteiro ? "#22c55e44" : "#1e1e1e"}`,
        }}>
          {temRoteiro ? "✓ Roteiro" : "Sem roteiro"}
        </span>
        {(card.hook || card.roas) && (
          <div style={{ display: "flex", gap: 8 }}>
            {card.hook && <span style={{ fontSize: 9, color: "#22c55e" }}>{card.hook}%</span>}
            {card.roas && <span style={{ fontSize: 9, color: "#f59e0b" }}>ROAS {card.roas}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
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

function Tag({ children, cor }) {
  return (
    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, background: cor ? cor + "22" : "#1a1a1a", color: cor || "#666", border: `1px solid ${cor ? cor + "44" : "#222"}` }}>
      {children}
    </span>
  );
}

const inp = { width: "100%", padding: "8px 10px", background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 8, color: "#ccc", fontSize: 12, fontFamily: "inherit" };
const lbl = { fontSize: 10, color: "#555", display: "block", marginBottom: 4 };
const btnPri = { fontSize: 11, padding: "8px 18px", borderRadius: 8, border: "none", background: "#22c55e", color: "#000", fontWeight: 700, cursor: "pointer" };
const btnSec = { fontSize: 11, padding: "8px 14px", borderRadius: 8, border: "1px solid #222", background: "#1a1a1a", color: "#888", cursor: "pointer" };
