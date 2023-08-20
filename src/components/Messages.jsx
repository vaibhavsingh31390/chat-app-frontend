import React from "react";
import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
function Message() {
  return (
    <>
      <MessageContainer>Messages</MessageContainer>
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
