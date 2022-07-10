import React from "react";
import { FaSignInAlt } from "react-icons/fa";

function LoginPage() {
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>
      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value=""
              placeholder="Enter your email"
              onChange={() => {}}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value=""
              placeholder="Enter your password"
              onChange={() => {}}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default LoginPage;
