import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const user = "";

  return (
    <header>
      <div>
        <Link to="/">Corelab Cars&ensp;&#128664;</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button>
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
