import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import ScrollTOBottom from "react-scroll-to-bottom";

const Chat = ({ socket, room }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const { user } = useSelector((state) => state.user);
  const [messageList, setMessageList] = useState([]);
  const sendMsg = async () => {
    if (currentMsg !== "") {
      const messgeData = {
        room: room,
        author: user.name,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messgeData);
      setMessageList((list) => [...list, messgeData]);
      setCurrentMsg("");
    }
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  },[socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollTOBottom className="message-container">
          {messageList.map((message, index) => (
            <div
              className="message"
              key={index}
              id={user.name === message.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{message.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{message.time}</p>
                  <p id="author">
                    {user.name === message.author ? "you" : "anonymouse"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ScrollTOBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Write something....."
          value={currentMsg}
          onChange={(e) => {
            setCurrentMsg(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMsg();
          }}
        />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
