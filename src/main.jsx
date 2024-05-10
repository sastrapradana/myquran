/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Surah from "./pages/surah/Surah.jsx";
import DetailSurah from "./pages/detail-surah/DetailSurah.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Doa from "./pages/doa/Doa.jsx";
import WaktuSholat from "./pages/waktu-sholat/waktu-sholat.jsx";
import Register from "./pages/auth/register.jsx";
import Login from "./pages/auth/login.jsx";
import { getCookies } from "./utils/utils.js";

const queryClient = new QueryClient();

export function PrivatePage({ children }) {
  const isToken = getCookies("token");
  if (isToken) {
    return children;
  }
  return <Navigate to="/" replace={true} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={
              <PrivatePage>
                <App />
              </PrivatePage>
            }
          />

          <Route
            path="/surah/:id"
            element={
              <PrivatePage>
                <Surah />
              </PrivatePage>
            }
          />

          <Route
            path="/detail-surah/:nomor"
            element={
              <PrivatePage>
                <DetailSurah />
              </PrivatePage>
            }
          />

          <Route
            path="/doa"
            element={
              <PrivatePage>
                <Doa />
              </PrivatePage>
            }
          />
          <Route
            path="/doa/:id"
            element={
              <PrivatePage>
                <Doa />
              </PrivatePage>
            }
          />

          <Route path="/waktu-sholat" element={<WaktuSholat />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
);
