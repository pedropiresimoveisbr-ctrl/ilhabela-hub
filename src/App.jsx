import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PageDashboard from "./pages/PageDashboard";
import PageGerador from "./pages/PageGerador";
import PageFunil from "./pages/PageFunil";
import PageKanban from "./pages/PageKanban";
import PageMetricas from "./pages/PageMetricas";
import PageLancamento from "./pages/PageLancamento";
import { getFunis } from "./data";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [funilAtivo, setFunilAtivo] = useState(null);
  const [funis, setFunis] = useState(getFunis());

  function recarregarFunis() { setFunis(getFunis()); }

  function navegar(p, extra) {
    setPage(p);
    if (extra?.funil) setFunilAtivo(extra.funil);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar page={page} navegar={navegar} funis={funis} />
      <main style={{ flex: 1, overflow: "auto" }}>
        {page === "dashboard"  && <PageDashboard navegar={navegar} funis={funis} />}
        {page === "gerador"    && <PageGerador funis={funis} />}
        {page === "funil"      && <PageFunil funil={funilAtivo} navegar={navegar} recarregarFunis={recarregarFunis} />}
        {page === "kanban"     && <PageKanban funis={funis} />}
        {page === "lancamento" && <PageLancamento funis={funis} />}
        {page === "metricas"   && <PageMetricas />}
      </main>
    </div>
  );
}