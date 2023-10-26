import React, { useState ,useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { startChat } from "../redux/chatReducer";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:4000");
const StartChat = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const room = "12345678";
  const [showChat, setShowChat] = useState(false);
  const handleChat = () => {
    // dispatch(startChat({id:user.email,token:user.token}));
    // navigate('/chat')
    if (user && room) {
      console.log("Room");
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };
  //   useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     // Cancel the event to prevent the browser's default confirmation dialog
  //     e.preventDefault();
  //     // Display a custom message to the user
  //     e.returnValue = '';
  //   };

  //   // Add the event listener when the component mounts
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   // Remove the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="80vh"
    >
      {showChat ? (
        <Chat socket={socket} room={room} />
      ) : (
        <>
          <span style={{ marginBottom: "20px" }}>Hello {user?.name}</span>
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "50px", padding: "15px 30px" }}
            onClick={handleChat}
          >
            Start chat
          </Button>
        </>
      )}
    </Box>
  );
};

export default StartChat;
