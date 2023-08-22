/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import fun from "./../components/Functions";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./../assets/logo.svg";
function Login() {

  const navigate = useNavigate();
  useEffect(()=>{
    fun.useLocalStorageAndNavigate(navigate);
  },[])

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin =(event)=>{
    try {
      event.preventDefault();
      let VALIDATE = fun.handleLoginValidation(values, toast);
      if(VALIDATE){
        fun.handleLoginSubmit(VALIDATE, values, toast, navigate)
      }   
      else{
        console.log(VALIDATE);
      }   
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FromContainer>
        <form
          id="register_Login_Form"
          onSubmit={(event) => handleLogin(event)}
        >
          <div className="brand">
            <img srcSet={logo} alt="" />
            <h1>Chatify</h1>
          </div>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email_Reg"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password_Reg"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <span id="form-control-buttom">
            <button type="submit">Login</button>
            <span>
              Don't Have An Account ?<Link to="/register"> Register</Link>
            </span>
          </span>
        </form>
      </FromContainer>
      <ToastContainer
        toastStyle={{ backgroundColor: "#ffffff", color: "#3E54AC" }}
      />
    </>
  );
}

const FromContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #3e54ac;
`;

export default Login;
