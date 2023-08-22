/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import fun from "./../components/Functions";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "./../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SetAvatar() {
  const navigate = useNavigate();
  useEffect(() => {
    fun.useLocalStorageAndNavigate(navigate);
  }, []);
  const protocol = useRef(true);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatars, setSelectedAvatars] = useState(undefined);

  const handleSetProfilePicture = async () => {
    try {
      let res = await fun.setProfilePicture(
        selectedAvatars,
        toast,
        avatars,
        navigate
      );
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (protocol.current) {
      protocol.current = false;
      const fetchAvatars = async () => {
        try {
          let res = await fun.fetchAndSetAvatar();
          if (res) {
            setAvatars(res[0]);
            setIsLoading(res[1]);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAvatars();
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Container className="set-avatars-container">
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container className="set-avatars-container">
          <div className="title-container">
            <h1>Pick an avatar as your profile pictures</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, ind) => (
              <div
                key={ind}
                className={`avatar${
                  selectedAvatars === ind ? " selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatars(ind)}
                />
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={handleSetProfilePicture}>
            Set As Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  height: 100vh;
  width: 100vw;
`;

export default SetAvatar;
