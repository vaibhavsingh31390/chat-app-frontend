/* eslint-disable no-unused-vars */
import React, { useState,useEffect  } from "react";
import "./pages.scss";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "./../assets/logo.svg";
import {ToastContainer, toast} from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user') && localStorage.getItem('chat-app-user') != null){
      navigate("/");
    }
  },  [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const {  email, password } = values;
      const {data} = await axios.post(loginRoute, {
        email,
        password,
      })
      if(data.status === false){
        toast.error(data.message);
      }else if(data.status === "Success"){
        localStorage.setItem('chat-app-user', JSON.stringify(data.payload));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { email, password } = values;
    if(email === ""){
      toast.error("Email is required", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: false,
        theme:"colored",
      })
      return false
    } else if(password.length === 0 && password.length > 25){
      toast.error("Valid password required.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: false,
        theme:"colored",
      })
      return false
    } 
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FromContainer>
        <form id="register_Login_Form" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img srcSet ={logo} alt=""/>
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
      <ToastContainer toastStyle={{ backgroundColor: "#ffffff", color:"#3E54AC"}} />
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
