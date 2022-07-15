import React, { useState, useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("user") as string);
  }, []);

  const handleLogout = () => {
    window.location.reload();
    navigate("/");
    localStorage.removeItem("user");
  };

  return (
    <header>
      <div>
        <Link to="/">Corelab Cars&ensp;&#128664;</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
