/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "./../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";
function SetAvatar() {
  const navigate = useNavigate();
  useEffect(() => {
    let checkLoggedIn = localStorage.getItem('chat-app-user');
    if (!checkLoggedIn) {
      navigate('/');
    }
  }, [navigate]);
  const apiForAvatars = "https://api.multiavatar.com/45678945";
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatars, setSelectedAvatars] = useState(undefined);
  const setProfilePicture = async () => {
    if(selectedAvatars === undefined){
        toast.error("Please select a profile picture.", {
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: false,
            theme:"colored",
          })
    }else{
        const user = JSON.parse(localStorage.getItem('chat-app-user'));
        const {data} = await axios.post(setAvatarRoute, {
          username: user.username,
          avatar: avatars[selectedAvatars],
          token: user.token,
        })
        if(data.status === false){
          toast.error(data.message);
        }else if(data.status === "Success"){
          localStorage.setItem('chat-app-user-meta', JSON.stringify({avatarImage : data.payload.avatarImage}));
          navigate("/chat");
        }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiForAvatars}${Math.round(Math.random() * 1000)}?apikey=PlFuQgL1B4idCA`
        );
        const image = response.data;
        const buffer = Buffer.from(image);
        return buffer.toString("base64");
      } catch (error) {
        console.error("Error fetching image:", error);
        return null;
      }
    };
    const fetchDataParallel = async () => {
      const requests = [];
      for (let index = 0; index < 4; index++) {
        requests.push(fetchData());
      }
      
      try {
        const images = await Promise.all(requests);
        setAvatars(images.filter((image) => image !== null));
      } catch (error) {
        console.error("Error fetching images in parallel:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataParallel();
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
          <button className="submit-btn" onClick={setProfilePicture}>
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
