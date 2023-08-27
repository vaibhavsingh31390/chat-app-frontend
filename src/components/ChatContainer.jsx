/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Message from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBars } from "@fortawesome/free-solid-svg-icons";
function ChatContainer({ setMenuToggle, menuToggle, currentSelected, socket, onlineList }) {
  const [lastSeen, setLastSeen] = useState(false);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    return () => {
      const matchedIndex = onlineList.findIndex(
        (userData) => userData[0] === currentSelected[1]._id
      );
      if (matchedIndex) {
        setLastSeen(true);
      } else {
        setLastSeen(false);
      }
    };
  }, [onlineList]);

  return (
    <>
      <Container className={`right_Section ${menuToggle ? '' : ''}`}>
        <div className="chat-header">
          <div className="user-detail">
          <div
            className="menu-toggle"
            onClick={() => {
              setMenuToggle(!menuToggle);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
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
          <div className="active-status">
            <FontAwesomeIcon
              className={
                onlineList.some(
                  (userData) => userData[0] === currentSelected[1]._id
                )
                  ? "active"
                  : "inactive"
              }
              icon={faCircle}
            />{" "}
            {/* {lastSeen &&
            !onlineList.some(
              (userData) => userData[0] === currentSelected[1]._id
            )
              ? formatTime(Math.floor(Date.now())) + "m ago"
              : "Online"} */}
          </div>
        </div>
        <Message currentSelected={currentSelected} socket={socket} />
        <ChatInput currentSelected={currentSelected} socket={socket} />
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
