// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Message from "./Messages";

function ChatContainer({ currentSelected }) {

  return (
    <>
      <Container className="right_Section">
        <div className="chat-header">
          <div className="user-detail">
            <div className="user-avatar">
              <img
                src={`data:image/svg+xml;base64,${currentSelected[1].Avatar}`}
                alt="avatar"
              />
            </div>
            <div className="user-name">
              <h3>{currentSelected[1].Username}</h3>
            </div>
          </div>
          <div className="active-status">last seen {20}m ago</div>
        </div>
        <div className="chat-messages">
          <Message></Message>
        </div>
        <div className="chat-input">
          <ChatInput currentSelected={currentSelected}/>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
`;
export default ChatContainer;
