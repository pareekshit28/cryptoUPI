import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import ScanQr from "./components/scanqrscreen";
import Payout from "./components/payout";
import SuccessScreen from "./components/success";

export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/scan" element={<ScanQr />} />
        <Route path="/payout" element={<Payout />} />
        <Route path="/success" element={<SuccessScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
