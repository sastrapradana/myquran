import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Surah from "./pages/surah/Surah.jsx";
import DetailSurah from "./pages/detail-surah/DetailSurah.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/surah" element={<Surah />} />
        <Route path="/surah/:nomor" element={<DetailSurah />} />
      </Routes>
    </React.StrictMode>
    ,
  </BrowserRouter>
);
