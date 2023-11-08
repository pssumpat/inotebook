import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AlertContext from "../context/Alert/AlertContext";
export default function Signup() {

  const [signupCred, setCred] = useState({name:"", email: "", password: "" ,cpassword:""});
  const navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;

  const onChange = (e) => {
    setCred({ ...signupCred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/createuser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupCred.name,
        email: signupCred.email,
        password: signupCred.password
      }),
    });
    const json = await response.json();
    if(json.success)
    {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      showAlert("Signup Successfull","success");
    }else
    {
      showAlert("Invalid Credentials","danger");
    }
  };

  return (
    <div className="container ">
      <form className="row g-3 " onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="name"
            value={signupCred.name}
            onChange={onChange}
            minLength={5} required
          />
        </div>
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
            value={signupCred.email}
            onChange={onChange}
            minLength={5} required
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
            value={signupCred.password}
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="cpassword"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={signupCred.cpassword}
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  )
}
