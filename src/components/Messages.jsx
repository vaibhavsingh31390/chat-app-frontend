/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import fun from "./../components/Functions";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import Functions from "./../components/Functions";

function Message({ currentSelected, socket }) {
  const [messagesList, setMessageList] = useState([]);
  const [messagesArrived, setMessagesArrived] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [messageStatus, setMessageStatus] = useState('SENT');
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const handleGetMsg = async () => {
      try {
        let res = await fun.getMessages(currentSelected);
        if (res) {
          setMessageList(res.data.payload.List);
          setIsLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetMsg();
  }, [currentSelected]);

  useEffect(()=>{
    socket.on("MSG_DELIVERED_ACK", (data) => {
      setMessageStatus(data);
    });

    socket.on("MSG_SEEN", (data) => {
      setMessageStatus(data);
    });

    return () => {
      socket.off("MSG_DELIVERED_ACK");
      socket.off("MSG_SEEN");
    };
  },[messageStatus])

  useEffect(() => {
    socket.on("SEND_MESSAGE", (data) => {
      setMessagesArrived(data);
    });
    return () => {
      socket.off("SEND_MESSAGE");
    };
  }, [messagesArrived]);

  useEffect(() => {
    if (messagesArrived) {
      const updatedMessagesList = [...messagesList, messagesArrived];
      setMessageList(updatedMessagesList);
      socket.emit("MSG_DELIVERED", {
        from: Functions.getUserData(),
        to: Functions.getSelectChatUser(),
      });

      if (messageContainerRef.current) {
        // Scroll smoothly to the newly added message
        const lastMessage = messageContainerRef.current.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

    return () => {
      socket.off("MSG_DELIVERED");
    };
  }, [messagesArrived]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messagesList]);


  return (
    <div className="chat-messages">
      <MessageContainer ref={messageContainerRef} className="Message_List">
        {isLoaded ? (
          messagesList.length > 0 ? (
            messagesList.map((message, index) => (
              <div
                key={index}
                className={`Message ${
                  message.from._id !== currentSelected[1]._id ? "right" : "left"
                }`}
              >
                <div className="MessageText">{message.message.text}</div>
                <div className="messageMeta">
                  <div className="messageStatus">
                    {messageStatus === "SENT" && message.from._id !== currentSelected[1]._id ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : messageStatus === "DELIVERED" && message.from._id !== currentSelected[1]._id ? (
                      <FontAwesomeIcon icon={faCheckDouble} />
                    ) : messageStatus === "SEEN" && message.from._id !== currentSelected[1]._id ? (
                      <FontAwesomeIcon
                        className="blue-icon"
                        icon={faCheckDouble}
                      />
                    ): ""}
                  </div>
                  <div className="MessageTimestamp">{
                    new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="Message">No messages yet.</div>
          )
        ) : (
          ""
        )}
      </MessageContainer>
    </div>
  );
}

const MessageContainer = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default Message;
