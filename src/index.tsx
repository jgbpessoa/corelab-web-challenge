import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.module.scss";
import VehiclesPage from "./pages/Vehicles";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import styles from "./index.module.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <>
      <Router>
        <div className={styles.container}>
          <Header />
          <Routes>
            <Route path="/" element={<VehiclesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
