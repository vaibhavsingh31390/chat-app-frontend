import React, { useEffect, useState } from "react";
import styled from "styled-components";

function ChatContainer({ currentSelectedUser }) {
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
        <div className="chat-messages"></div>
        <div className="chat-input"></div>
      </Container>
    </>
  );
}

const Container = styled.div``;
export default ChatContainer;
