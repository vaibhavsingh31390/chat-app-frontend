import React, { useEffect, useState } from "react";
import logo from "./../assets/logo.svg";
import styled from "styled-components";

function Contact({currentUser }) {
  return (
    <>
        <WelcomeContainer className="right_Section">

        </WelcomeContainer>
    </>
  );
}

const WelcomeContainer = styled.div`
     display: flex;
    justify-content: flex-start;
    align-items: center;
     background-color: #73df0e;
`
export default Contact;
