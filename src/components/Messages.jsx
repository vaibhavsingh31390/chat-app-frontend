import React, { useEffect, useState } from "react";
import fun from "./../components/Functions";
import styled from "styled-components";

function Message({ currentSelected }) {
  const [messagesList, setMessageList] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  return (
    <>
      {isLoaded ? (
        <MessageContainer className="Message_List">
          {messagesList.length > 0 ? (
            messagesList.map((message, index) => (
              <div key={index} className={`Message ${"alignmentClass"}`}>
                <div className="MessageText">{message.message.text}</div>
                <div className="MessageTimestamp">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))
          ) : (
            <div className="Message">No messages yet.</div>
          )}
        </MessageContainer>
      ) : (
        ""
      )}
    </>
  );
}
const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 1em;
`;
export default Message;
