import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Surah from "./pages/surah/Surah.jsx";
import DetailSurah from "./pages/detail-surah/DetailSurah.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Doa from "./pages/doa/Doa.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/surah" element={<Surah />} />
          <Route path="/surah/:nomor" element={<Surah />} />
          <Route path="/detail-surah/:nomor" element={<DetailSurah />} />

          <Route path="/doa" element={<Doa />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
