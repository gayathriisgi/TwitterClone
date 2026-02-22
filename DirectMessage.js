// components/DirectMessage.js
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const DirectMessage = ({ currentUser, targetUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        sender: currentUser,
        receiver: targetUser,
        content: message,
        timestamp: new Date(),
      };

      socket.emit("send_direct_message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Direct Messages</h2>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}: </strong> {msg.content}
          </div>
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default DirectMessage;