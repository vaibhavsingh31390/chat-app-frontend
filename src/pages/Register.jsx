/* eslint-disable no-unused-vars */
import React, { useState,  } from "react";
import "./pages.scss";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "./../assets/logo.svg";
import {ToastContainer, toast} from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const { username, email, password, confirmPassword } = values;
      const {data} = await axios.post(registerRoute, {
        username,
        email,
        password,
        confirmPassword
      })
      if(data.status === false){
        toast.error(data.message);
      }else{
        localStorage.setItem('chat-app-user', JSON.stringify(data.payload));
      }
      navigate("/");
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if(password !== confirmPassword){
      toast.error("Password & confirm password don't match.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: false,
        theme:"colored",
      })
      return false
    } else if(username.length < 3){
      toast.error("Username should be greater then 3 characters.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: false,
        theme:"colored",
      })
      return false
    } else if(password.length < 8){
      toast.error("Password should be greater then or equal to 8 characters.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: false,
        theme:"colored",
      })
      return false
    } else if(email === ""){
      toast.error("Email is required", {
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
            <img srcSet ={logo} alt=""  />
            <h1>Chatify</h1>
          </div>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username_Reg"
              onChange={(e) => handleChange(e)}
              required
            />
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

          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirm_Password_Reg"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <span id="form-control-buttom">
            <button type="submit">Create Account</button>
            <span>
              Already Have An Account ?<Link to="/login"> Login</Link>
            </span>
          </span>

          {/* <div className="error-message">
            <ul>
              <li>Some error</li>
            </ul>
          </div> */}
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

export default Register;
