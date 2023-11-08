import React, { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../context/Alert/AlertContext";

export default function Login() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;
  const navigate = useNavigate();

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
      }),
    });
    const json = await response.json();
    if(json.success)
    {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      showAlert("Login Successfull","success");
    }else
    {
      showAlert("Invalid Credentials","danger");
    }
  };

  return (
    <div className="container ">
      <form className="row g-3 " onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            name="email"
            value={cred.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={cred.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
