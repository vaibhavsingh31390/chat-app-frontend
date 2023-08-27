import React, { useState } from "react";
import fun from "./../components/Functions";
import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
function ChatInput({ currentSelected, socket }) {
  const [message, setMessage] = useState("");
  const [emojiPickState, setEmojiPickSate] = useState(false);
  const HandleEmojiPicker = () => {
    setEmojiPickSate(!emojiPickState);
  };
  const handleEmojiClick = (emojiData, event) => {
    let msg = message;
    msg += emojiData.emoji;
    setMessage(msg);
  };
  const handleSend = async (e) => {

    e.preventDefault();
    if (message.length > 0) {
      try {
        let res = await fun.sendMessage(currentSelected, message, socket);
        if (res.status === 201) {
          // console.log(res.data.payload.message);
          document.getElementById("message_Chat").textContent = "";
          setMessage("");
        }
      } catch (error) {}
    }
  };
  return (
    <>
      <div className="chat-input">
        <InputContainer className="InputContainer">
          <div className="input-form-message">
            <form id="message_form" onSubmit={(event) => handleSend(event)}>
              <div className="form-control message_box">
              <div className="emoji-picker">
                {emojiPickState && <Picker onEmojiClick={handleEmojiClick} />}
                <FontAwesomeIcon icon={faFaceSmile} onClick={HandleEmojiPicker} />
              </div>
                <div
                  type="text"
                  name="message"
                  id="message_Chat"
                  onInput={(e) => {
                    setMessage(e.currentTarget.textContent);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }}}
                  contentEditable="true"
                  placeholder="Type your message..."
                />
              </div>
              <div className="form-control message_button">
                <button type="submit" id="message_send">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Send
                </button>
              </div>
            </form>
          </div>
        </InputContainer>
      </div>
    </>
  );
}
const InputContainer = styled.div`
  position: relative;
`;
export default ChatInput;
