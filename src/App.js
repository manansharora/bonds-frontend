import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Securities from "./scenes/securities";
import Invoices from "./scenes/invoices";
import Bar from "./scenes/bar";
import SecurityForm from "./scenes/securityForm";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Sample from "./scenes/products";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Auth from "./scenes/auth";
import { isAuthenticated } from "./scenes/auth/isauth";
import Navbar from "./components/Navbar";
import SignInForm  from "./components/SignIn";
import SignUp from "./components/SignUp";
import TradeForm from "./scenes/tradesForm";
import Trades from "./scenes/trades"
// import logout  from '../scenes/auth/isauth';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <signInForm/>
        <CssBaseline />
        <div className="app">
        {/* <Sidebar isSidebar={isSidebar} /> */}
          { isAuthenticated() && <Sidebar isSidebar={isSidebar} /> }
          <main className="content">
          { isAuthenticated() && <Topbar setIsSidebar={setIsSidebar} />}
          {/* { !isAuthenticated() && <Navbar /> } */}
          <Navbar />
            <Routes>
              <Route path="/" element={isAuthenticated() ? <Dashboard /> : <Auth />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignInForm />} />
              {/* <Route path="/logout" element={<logout />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tradesForm" element={<TradeForm />} />
              <Route path="/securities/:id/trades" element={<Trades />} />
              <Route path="/securities" element={<Securities />} />
              <Route path="/sample" element={<Sample />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/securityForm" element={<SecurityForm />} />
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
