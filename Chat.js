import { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to the Socket.io server (the API route you created)
const socket = io("http://localhost:3001");  // This assumes your backend is on localhost:3001

const Chat = () => {
    const [message, setMessage] = useState("");  // For the user's current message
    const [messages, setMessages] = useState([]);  // To hold all chat messages
    const [user, setUser] = useState("User1");  // Static user, use a dynamic user later

    // Listen for incoming messages
    useEffect(() => {
        socket.on("receive_message", (messageData) => {
            setMessages((prevMessages) => [...prevMessages, messageData]);
        });

        // Cleanup when the component is unmounted
        return () => {
            socket.off("receive_message");
        };
    }, []);

    // Send a message
    const sendMessage = () => {
        if (message.trim()) {
            const messageData = {
                sender: user,
                content: message,
                timestamp: new Date(),
            };

            // Emit the message to the backend
            socket.emit("send_message", messageData);

            // Update local state to reflect the message immediately
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setMessage("");  // Clear the input field
        }
    };

    return (
        <div>
            <h3>Chat with Others</h3>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;