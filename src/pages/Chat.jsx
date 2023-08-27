/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import fun from "./../components/Functions";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contact from "./../components/Contacts";
import Welcome from "./../components/Welcome";
import ChatContainer from "./../components/ChatContainer";
import "react-toastify/dist/ReactToastify.css";
import socket from "../utils/Socket";

function Chat() {
  const firstRender = useRef(true);
  const [menuToggle, setMenuToggle] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [onlineList, setOnlineList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    socket.on("ONLINE_LIST", (list) => {
      setOnlineList(list);
    });

    return () => {
      socket.off("ONLINE_LIST");
    };
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      const handleSetContacts = async () => {
        try {
          let res = await fun.fetchContacts(navigate);
          if (res) {
            setContacts(res[0]);
            setcurrentUser(res[1]);
            socket.emit("ADD_USER", res[1][0]._id);
            socket.off("ADD_USER");
          }
        } catch (error) {
          console.log(error);
        }
      };
      handleSetContacts();
      firstRender.current = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <div className={`chat-container ${!menuToggle ? 'full_width' : ''}`}>
        <Contact
          contacts={contacts}
          currentUser={currentUser}
          currentSelected={currentSelected}
          setCurrentSelected={setCurrentSelected}
          socket={socket}
          menuToggle={menuToggle}
          />
        {currentSelected || currentSelected === 0 ? (
          <ChatContainer
            menuToggle={menuToggle}
            setMenuToggle={setMenuToggle}
            currentSelected={currentSelected}
            socket={socket}
            onlineList={onlineList}
          ></ChatContainer>
        ) : (
          <Welcome currentUser={currentUser}></Welcome>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #3e54ac;
  overflow: hidden;
`;
export default Chat;
