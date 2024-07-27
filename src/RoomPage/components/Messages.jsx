import { useSelector } from "react-redux";
import "./Messages.css";
import { useEffect } from "react";

function Messages() {
  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const container = document.querySelector(".messages-container");
    container.scrollTop = container.scrollHeight;
  };

  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <div
          className={
            message.sent ? "single-message-sent" : "single-message-get"
          }
          key={index}
        >
          {message.message}
        </div>
      ))}
    </div>
  );
}

export default Messages;
