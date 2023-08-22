/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { loginRoute, registerRoute, setAvatarRoute, chatRouteAllUsers } from "../utils/APIRoutes";

class Functions {
  constructor(options, user) {
    this.options = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: false,
      theme: "colored",
      ...options,
    };
    console.log("Custom Hooks (Build v1)");
  }
  // GET CURRENT USER DATA
  static getUserData() {
    const storedUserData = localStorage.getItem("chat-app-user");
    if (storedUserData) {
      return JSON.parse(storedUserData);
    } else {
      return null; // Or return some default value
    }
  }
  static getUserDataMeta() {
    const userMeta = localStorage.getItem("chat-app-user-meta");
    if (userMeta) {
      return JSON.parse(userMeta);
    } else {
      return null; // Or return some default value
    }
  }

  // GET CURRENT USER DATA

  // AUTH CHECK
  static useLocalStorageAndNavigate = (navigateFunction) => {
    if (this.getUserData() && this.getUserData() !== null) {
      navigateFunction("/set-Avatar");
    } else {
    }
  };

  // LOGIN METHODS
  static handleLoginValidation = (values, toast) => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email is required", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
      return false;
    } else if (password.length === 0 && password.length > 25) {
      toast.error("Valid password required.", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
      return false;
    }
    return true;
  };

  static handleLoginSubmit = async (
    VALIDATE,
    values,
    toast,
    navigateFunction
  ) => {
    try {
      if (VALIDATE) {
        const { email, password } = values;
        const { data } = await axios.post(loginRoute, {
          email,
          password,
        });
        console.log(data);
        if (data.status === false) {
          toast.error(data.message);
        } else if (data.status === "Success") {
          localStorage.setItem("chat-app-user", JSON.stringify(data.payload));
          navigateFunction("/set-Avatar");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    }
  };
  // LOGIN METHODS

  // REGISTER MATHODS
  static handleRegisterValidation = (values, toast) => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Password & confirm password don't match.", this.options);
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater then 3 characters.",
        this.options
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater then or equal to 8 characters.",
        this.options
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required", this.options);
      return false;
    }
    return true;
  };

  static handleRegisterSubmit = async (
    VALIDATE,
    values,
    toast,
    navigateFunction
  ) => {
    try {
      if (VALIDATE) {
        const { username, email, password, confirmPassword } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
          confirmPassword,
        });
        if (data.status === false) {
          toast.error(data.message);
        } else {
          localStorage.setItem("chat-app-user", JSON.stringify(data.payload));
          navigateFunction("/set-avatar");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, this.options);
    }
  };
  // REGISTER MATHODS

  // SET AVATAR MATHODS
  static fetchAndSetAvatar = async (
    KEY = "PlFuQgL1B4idCA",
    avatars,
    isLoading
  ) => {
    try {
      const requests = [];
      for (let index = 0; index < 4; index++) {
        const response = await axios.get(
          `https://api.multiavatar.com/${Math.round(
            Math.random() * 1000
          )}?apikey=${KEY}`
        );
        const image = response.data;
        const buffer = Buffer.from(image);
        requests.push(buffer.toString("base64"));
      }
      const images = await Promise.all(requests);
      avatars = images.filter((image) => image !== null);
    } catch (error) {
      console.error("Error fetching images in parallel:", error);
    } finally {
      isLoading = false;
      return [avatars, isLoading];
    }
  };

  static setProfilePicture = async (
    Param,
    toast,
    avatars,
    navigateFunction
  ) => {
    if (Param === undefined) {
      toast.error("Please select a profile picture.", this.options);
    } else {
      const user = this.getUserData();
      const { data } = await axios.post(setAvatarRoute, {
        username: user.username,
        avatar: avatars[Param],
        token: user.token,
      });
      if (data.status === false) {
        toast.error(data.message, this.options);
      } else if (data.status === "Success") {
        localStorage.setItem(
          "chat-app-user-meta",
          JSON.stringify({ avatarImage: data.payload.avatarImage })
        );
        navigateFunction("/chat");
      }
    }
  };
  // SET AVATAR MATHODS

  // CHAT
  static assignCurrentUser =  (navigateFunction) => {
    try {
      const user = this.getUserData();
      const userMeta = this.getUserDataMeta();
      if (!user) {
        navigateFunction("/");
        return null; // Return early if navigating
      }

      if (!userMeta) {
        navigateFunction("/set-avatar");
        return null; // Return early if navigating
      }
      const currentUser = [user, userMeta.avatarImage];
      return currentUser;
    } catch (error) {
      navigateFunction("/");
    }
  };

  static fetchContacts = async (navigateFunction)=>{
        const user = this.assignCurrentUser(navigateFunction);
        if (user) {
          try {
            const response = await axios.get(chatRouteAllUsers, {
              params: {
                username: user[0].username,
                token: user[0].token,
              },
            });
            return [response.data.payload.list, user]
          } catch (error) {
            console.error(error);
          }
        } else {
          navigateFunction("/");
        }
  }
  // CHAT
}

export default Functions;
