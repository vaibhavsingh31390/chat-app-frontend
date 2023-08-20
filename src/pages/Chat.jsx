/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contact from "./../components/Contacts";
import Welcome from "./../components/Welcome";
import ChatContainer from "./../components/ChatContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { chatRouteAllUsers } from "../utils/APIRoutes";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentSelectedUser, setCurrentSelectedUser] = useState({undefined});
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const assignCurrentUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const userMeta = JSON.parse(localStorage.getItem("chat-app-user-meta"));
      setcurrentUser([user, userMeta.avatarImage]);
      if (user) {
        if (userMeta) {
          return user;
        } else {
          navigate("/set-avatar");
          return null; // Return early if navigating
        }
      } else {
        navigate("/");
        return null; // Return early if navigating
      }
    } catch (error) {
      throw new Error("User Error");
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const fetchContacts = async () => {
        const user = await assignCurrentUser();
        if (user) {
          try {
            const response = await axios.get(chatRouteAllUsers, {
              params: {
                username: user.username,
                token: user.token,
              },
            });
            setContacts(response.data.payload.list);
            // console.log(response);
          } catch (error) {
            console.error(error);
          }
        }
      };
      fetchContacts();
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
          <ChatContainer currentSelectedUser={currentSelectedUser}></ChatContainer>
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
