import React, { useEffect, useState } from "react";
import fun from "./../components/Functions";
import chatIcon from "./../assets/welcomeChat.gif";
import styled from "styled-components";

function Contact() {
  // eslint-disable-next-line no-unused-vars
  const [currentName, setCurrentName] = useState(undefined);
  useEffect(() => {
    try {
      let res = fun.getUserData();
      if (res) {
        setCurrentName(res);
      }
    } catch (error) {}
  }, []);
  return (
    <>
      <WelcomeContainer className="right_Section">
        <div className="image">
          <img src={chatIcon} alt="" />
        </div>
        <div className="title">
          <h1>
            Welcome to Chaitfy <span className="username">{}</span>
          </h1>
          <h3>Realtime chat with your friends.</h3>
        </div>
      </WelcomeContainer>
    </>
  );
}

const WelcomeContainer = styled.div`
  display: grid;
  -webkit-box-pack: center;
  place-content: center;
  grid-template-columns: repeat(0, 1fr);
  .image,
  .title {
    text-align: left;
    line-height: 2.6em;
    img {
      width: 150px;
    }
    .username {
      color: #3e54ac;
    }
  }
`;
export default Contact;
