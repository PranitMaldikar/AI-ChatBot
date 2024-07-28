import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS for the toast notifications
import "./Home.css"; // Import the custom CSS for styling

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      setMessages([...messages, { sender: "user", text: userInput }]);
      setUserInput("");
      // Backend logic for the prompt handling
    }
  };

  const getFirstName = (fullName) => {
    return fullName ? fullName.split(" ")[0] : "";
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h3>Welcome {getFirstName(loggedInUser)}</h3>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
