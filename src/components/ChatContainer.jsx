import React, { useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Message from "./Messages";
import axios from "axios";
import { sendMessageRoute } from "../utils/APIRoutes";
function ChatContainer({ currentSelectedUser }) {
  const handleSendMessage = async (msg)=>{
    const userData = JSON.parse(localStorage.getItem("chat-app-user"));
    const response =  await axios.post(sendMessageRoute, {
      token: userData.token,
      recipient_type : "individual",
      to: currentSelectedUser.Username,
      message: {
        type: "Text",
        text: msg
      }
    })
    console.log(response);
  }

  return (
    <>
      <Container className="right_Section">
        <div className="chat-header">
          <div className="user-detail">
            <div className="user-avatar">
              <img
                src={`data:image/svg+xml;base64,${currentSelectedUser.Avatar}`}
                alt="avatar"
              />
            </div>
            <div className="user-name">
              <h3>{currentSelectedUser.Username}</h3>
            </div>
          </div>
          <div className="active-status">last seen {20}m ago</div>
        </div>
        <div className="chat-messages">
          <Message></Message>
        </div>
        <div className="chat-input">
        <ChatInput handleSendMessage={handleSendMessage} />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;;
`;
export default ChatContainer;
