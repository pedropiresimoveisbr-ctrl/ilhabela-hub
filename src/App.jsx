import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PageDashboard from "./pages/PageDashboard";
import PageGerador from "./pages/PageGerador";
import PageFunil from "./pages/PageFunil";
import PageRoteiros from "./pages/PageRoteiros";
import PageMetricas from "./pages/PageMetricas";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [funilAtivo, setFunilAtivo] = useState(null);

  function navegar(p, extra) {
    setPage(p);
    if (extra?.funil) setFunilAtivo(extra.funil);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Inter', sans-serif" }}>
      <Sidebar page={page} navegar={navegar} />
      <main style={{ flex: 1, overflow: "auto" }}>
        {page === "dashboard" && <PageDashboard navegar={navegar} />}
        {page === "gerador" && <PageGerador />}
        {page === "funil" && <PageFunil funil={funilAtivo} navegar={navegar} />}
        {page === "roteiros" && <PageRoteiros />}
        {page === "metricas" && <PageMetricas />}
      </main>
    </div>
  );
}
