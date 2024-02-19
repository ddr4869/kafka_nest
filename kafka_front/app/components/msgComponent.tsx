import { Component } from "react";

const MsgComponent = ({ writer, message, me }) => (
    <div className="message">
      <p>
        <strong>{writer === me ? 'me' : writer}</strong>: {message}
      </p>
    </div>
  );

export default MsgComponent;
  