import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { rootURL } from "../utils/api"
import { setCookie } from "../utils/cookie"
export default function Login() {
  let history = useHistory();
  let location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  let { from } = location.state || { from: { pathname: "/" } };
  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    try {
        const response = await axios.post(rootURL+"login", { email, password });
        if (response.status === 200) {
            setCookie("shootrz-dashboard-token", response.data.access_token)
            setSuccess(true);
            history.replace(from);
        } else {
            setError(true)
        }
    } catch(e) {
        setError(true)
    }
  }
  return (
    <div className="bg-light login-page">
      <div className="container bg-white">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {success && <div className="alert alert-success mt-2" role="alert">
            Logged in successfully, you'll be redirected
            </div>}
          {error && <div className="alert alert-danger mt-2" role="alert">
            Error while logging in
            </div>}
        </form>
      </div>
    </div>
  );
}
