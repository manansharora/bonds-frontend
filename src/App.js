import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Securities from "./scenes/securities";
import Invoices from "./scenes/invoices";
import Trades from "./scenes/trades";
import Bar from "./scenes/bar";
import SecurityForm from "./scenes/securityForm";
import TradeForm from "./scenes/tradesForm";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Sample from "./scenes/products";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/securities" element={<Securities />} />
              <Route path="/sample" element={<Sample />} />
              <Route path="/trades" element={<Trades />} />
              <Route path="/securities/:id/trades" element={<Trades />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/securityForm" element={<SecurityForm />} />
              <Route path="/tradesForm" element={<TradeForm />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
