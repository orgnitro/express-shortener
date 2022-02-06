import React, { useState, useEffect, useContext } from "react";
import { useHttp, useMessage } from "../hooks/hooks";
import AuthContext from "../context/auth-context";

export const AuthPage = () => {
  const authContext = useContext(AuthContext);
  const message = useMessage();
  const { request, loading, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  async function handleRegister() {
    let data;
    try {
      data = await request("/api/auth/register", "POST", { ...form });
    } catch (e) {}
    setForm({ email: "", password: "" });
    message(data.message);
  }

  async function handleLogin() {
    let data;
    try {
      data = await request("/api/auth/login", "POST", { ...form });
      authContext.logIn(data.userId, data.token);
    } catch (e) {}
    console.log("data", data);
    message(data.message);
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Short your link!</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  name="email"
                  type="text"
                  className="yellow-input"
                  value={form.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="input-field">
              <input
                placeholder="Enter password"
                id="password"
                name="password"
                type="password"
                className="yellow-input"
                value={form.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={handleLogin}
              disabled={loading}
            >
              Enter
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={handleRegister}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
