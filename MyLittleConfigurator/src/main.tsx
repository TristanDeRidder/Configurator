// StrictMode removed - causes double-mount warnings with drei's <Scroll html>
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollProvider } from "./contexts/ScrollContext";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Configurator from "./pages/Configurator";

createRoot(document.getElementById("root")!).render(
  // StrictMode removed to prevent double-mount warning with drei's <Scroll html>
  // which internally creates its own React root. StrictMode causes double mounting
  // in dev, triggering "createRoot() called twice" warnings.
  // <StrictMode>
    <BrowserRouter>
      <ScrollProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:modelId" element={<Configurator />} />
        </Routes>
      </ScrollProvider>
    </BrowserRouter>
  // </StrictMode>
);
