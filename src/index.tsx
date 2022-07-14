import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.module.scss";
import VehiclesPage from "./pages/Vehicles";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import NewVehiclePage from "./pages/NewVehicle";
import EditVehiclePage from "./pages/EditVehicle/EditVehicle";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";
import styles from "./index.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import "react-responsive-modal/styles.css";

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
            <Route path="/new-vehicle" element={<PrivateRoute />}>
              <Route path="/new-vehicle" element={<NewVehiclePage />} />
            </Route>
            <Route path="/edit-vehicle" element={<PrivateRoute />}>
              <Route path="/edit-vehicle" element={<EditVehiclePage />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
