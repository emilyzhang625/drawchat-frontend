import { useSelector } from "react-redux";

function Messages() {
  const messages = useSelector((state) => state.messages.messages);
  console.log(messages);

  return (
    <div>
      {messages.map((message) => (
        <div key={message}>{message}</div>
      ))}
    </div>
  );
}

export default Messages;
