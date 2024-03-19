import React from "react";
import MsgComponent from "./msgComponent";
import { useRef, useEffect } from "react";

const ChatComponent = ({ messages, newMessage, me, value, setValue, onSubmit }) => (

  <div className="container">
    <div className="header">
      <h1>Websocket Chat</h1>
    </div>
    <div className="messages">
      {messages.length === 0 && newMessage.length === 0 ? (
        <div>No Messages</div>
      ) : (
        <div>
          {messages.slice().reverse().map((msg, index) => (
            <MsgComponent key={index} writer={msg.writer} message={msg.message} me={me} />
          ))}
        </div>
      )}
      {newMessage.length > 0 ? (
        <div>
          {newMessage.map((msg, index) => (
            <MsgComponent key={index} writer={msg.writer} message={msg.message} me={me} />
          ))}
        </div>
      ) : null}
    </div>
    <div className="input-area">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        placeholder="Type your message here..."
      />
      <button onClick={onSubmit}>Send</button>
    </div>
  </div>
);

export default ChatComponent;