import React, { ChangeEvent, FormEvent, useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { registerUser } from "../../lib/api";
import { RegisterInterface } from "../../types/RegisterInterface";
import AuthContext from "../../context/auth/AuthContext";
import { AxiosError, AxiosResponse } from "axios";
import { AuthError, AuthErrors } from "../../types/api/AuthResponse";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { state, dispatch } = useContext(AuthContext);
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user) {
      navigate("/");
    }

    if (state.errorMessage) {
      (state.errorMessage as Array<AuthError>).forEach((error) =>
        toast.error(error.message)
      );
      dispatch({ type: "RESET" });
    }
  }, [navigate, state, dispatch]);

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
    const userData: RegisterInterface = {
      name,
      email,
      password,
    };

    const register = async (userData: RegisterInterface) => {
      dispatch({ type: "AUTH_REQUEST" });
      try {
        const response = await registerUser(userData);
        if ((response as AxiosResponse).status === 200) {
          dispatch({ type: "AUTH_SUCCESS", payload: response?.data });
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        const errorData = (error as AxiosError).response?.data as AuthErrors;
        dispatch({ type: "REGISTER_ERROR", payload: errorData });
      }
    };

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      register(userData);
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              value={password2}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default RegisterPage;
