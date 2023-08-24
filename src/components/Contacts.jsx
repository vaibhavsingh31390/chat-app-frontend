/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import logo from "./../assets/logo.svg";
import styled from "styled-components";
import Functions from "./Functions";
function Contact({
  contacts,
  currentUser,
  currentSelected,
  setCurrentSelected,
  socket
}) {
  const [currentName, setCurrentName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      let username = currentUser[0];
      let Avatar = currentUser[1];
      if (username && Avatar) {
        setCurrentName(username.username);
        setCurrentUserImage(Avatar);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentSelected) {
      socket.emit('USER_IN_CHAT', {from : Functions.getUserData(), to : Functions.getSelectChatUser()})
      localStorage.setItem("current-chat-data", JSON.stringify({_id : currentSelected[1]._id, username : currentSelected[1].Username}));
    }
    window.onbeforeunload = () => {
      localStorage.removeItem("current-chat-data");
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, [currentSelected]);

  return (
    <>
      {currentUserImage && currentName && (
        <ContactsContainer className="left_Section">
          <div className="brand">
            <img srcSet={logo} alt="" />
            <h1>Chatify</h1>
          </div>

          <div className="contacts">
            <h3>Conatcts</h3>
            {contacts.map((contact, ind) => (
              <div
                key={ind}
                className={`contact${
                  currentSelected === ind ? " selected-contact" : ""
                }`}
                onClick={() => {
                  setCurrentSelected([ind, {
                    _id: contact._id,
                    Avatar: contact.avatarImage,
                    Username: contact.username,
                  }]);
                }}
              >
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatar"
                />
                <div className="username">{contact.username}</div>
              </div>
            ))}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">{currentName}</div>
          </div>
        </ContactsContainer>
      )}
    </>
  );
}

const ContactsContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  background-color: #3e54ac;
`;
export default Contact;
