import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.module.scss";
import VehiclesPage from "./pages/Vehicles";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import NewVehiclePage from "./pages/NewVehicle";
import EditVehiclePage from "./pages/EditVehicle/EditVehicle";
import Header from "./components/Header";
import styles from "./index.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import "react-responsive-modal/styles.css";
import { AuthProvider } from "./context/auth/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
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
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
