/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import fun from "./../components/Functions";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contact from "./../components/Contacts";
import Welcome from "./../components/Welcome";
import ChatContainer from "./../components/ChatContainer";
import "react-toastify/dist/ReactToastify.css";


function Chat() {
  const firstRender = useRef(true);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentSelectedUser, setCurrentSelectedUser] = useState({ undefined });

  const navigate = useNavigate();

  useEffect(() => {
    if (firstRender.current) {
      const handleSetContacts = async ()=>{
        try {
          let res = await fun.fetchContacts(navigate)
          if(res){
            setContacts(res[0]);
            setcurrentUser(res[1])
          }
        } catch (error) {
          console.log(error);
        }
      }
      handleSetContacts();
        firstRender.current = false;
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <div className="chat-container">
        <Contact
          contacts={contacts}
          currentUser={currentUser}
          currentSelected={currentSelected}
          setCurrentSelected={setCurrentSelected}
          currentSelectedUser={currentSelectedUser}
          setCurrentSelectedUser={setCurrentSelectedUser}
        />
        {currentSelected || currentSelected === 0 ? (
          <ChatContainer
            currentSelectedUser={currentSelectedUser}
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
