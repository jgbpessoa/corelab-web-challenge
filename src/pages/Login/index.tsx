import React, { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../lib/api";
import { LoginInterface } from "../../types/LoginInterface";
import { FaSignInAlt } from "react-icons/fa";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from: string = location.state?.from.pathname || "/";

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [(event.target as HTMLInputElement).id]: (
        event.target as HTMLInputElement
      ).value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const userData: LoginInterface = {
      email,
      password,
    };

    const login = async (userData: LoginInterface) => {
      const response: any = await loginUser(userData);

      if (response.status === 200) {
        navigate(from);
        window.location.reload();
      }
    };

    login(userData);
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleChange}
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
