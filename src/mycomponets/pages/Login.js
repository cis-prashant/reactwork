import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import loginImg from "../../image/login.svg";
import { Route, Routes } from "react-router-dom";
import { toast } from 'react-toastify';

import "../pages/login.css";
import RegistrationForm from "./RegistrationForm";

const Login = () => {
  let navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  const [login, setLogin] = useState({
    email: "",
    password: "",
    conformpassword: "",
    role : ""
  });
  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  let registerData = localStorage.getItem("registerData")
  let jsonres = JSON.parse(registerData)
  
  const submitLoign = (event) => {
    console.log("--->", jsonres);
    if(jsonres){
      if(jsonres.email == login.email && jsonres.password == login.password){
        if(jsonres.role == 'CREATOR'){
          login.role = jsonres.role
          const json = JSON.stringify(login);
          localStorage.setItem("data", json);
        }else if(jsonres.role == 'VIEWER'){
          login.role = jsonres.role
          const json = JSON.stringify(login);
          localStorage.setItem("data", json);
        }
      }else{
        alert('error')
      }
    }else{
      alert('sign up to continue')
    }
  };
  return (
    <>
      <div id="loginForm" className="d-flex align-items-center">
        <div className="container d-flex justify-content-center">
          <div className="card shadow" style={{ maxWidth: "800px" }}>
            <div className="row g-0">
              <div className="col-md-4 order-md-1 d-flex align-items-center">
                <img
                  src={loginImg}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8 order-md-0">
                <div className="card-body">
                  <h5 className="card-title text-center">LOGIN FORM</h5>
                  <form
                    className="row g-3"
                    onSubmit={(event) => {
                      submitLoign(event);
                    }}
                  >
                    <div className="col-md-12 ">
                      <label
                        htmlFor="validationDefault01"
                        className="form-label"
                      >
                        Email id
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="validationDefault01"
                        placeholder="Email"
                        onChange={handleChangeLogin}
                        name="email"
                        value={login.email}
                        onBlur={handleFocus}
                        focused={focused.toString()}
                        required
                      />
                      <span>it should be valid email address</span>
                    </div>
                    <div className="col-md-12 ">
                      <label
                        htmlFor="validationDefault02"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationDefault02"
                        placeholder="*********"
                        onChange={handleChangeLogin}
                        value={login.password}
                        name="password"
                        // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        onBlur={handleFocus}
                        focused={focused.toString()}
                        required
                      />
                      <span>
                        Enter Password
                      </span>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-outline-success" >
                          Login
                        </button>
                        <br/>
                        <NavLink to="/Registration" className="btn btn-outline-danger"> Sign up and Registration</NavLink>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/Registration" element={<RegistrationForm />} />
      </Routes>
    </>
  );
};

export default Login;
