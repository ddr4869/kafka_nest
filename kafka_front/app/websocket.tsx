import React, { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './WebsocketContext';

class Message {
  writer: string;
  message: string;

  constructor(writer: string, message: string) {
    this.writer = writer;
    this.message = message;
  }
}

export const Websocket = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([] as Message[]);
  const [newMessage, setNewMessage] = useState([] as Message[]);
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    console.log("query Messages start!")
    fetch('http://127.0.0.1:8080/messages')
      .then(response => response.json())
      .then(data => {
        // 서버로부터 받은 데이터에서 메시지만 추출하여 문자열 배열로 저장합니다.
        setMessages(data.map(item => new Message(item.writer, item.message)));
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });

    // 소켓 이벤트 핸들러 해제
    return () => {
      console.log('Unregistering Events...');
      socket.off('connect');
      socket.off('onMessage');
    };
  }, []); // socket 의존성 추가

    socket.on('connect', () => {
      console.log('Connected!');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected!');
      socket.disconnect();
    });

    socket.on('onMessage', (inputMessage: Message) => {
      setNewMessage([...newMessage, new Message(inputMessage.writer, inputMessage.message)]);
    });

  const onSubmit = () => {
    if (value == '' || socket.id === undefined) {
      return;
    }
    socket.emit('newMessage', {writer:socket.id.substring(0,8), message: value});
    setValue('');
  };

  return (
    <div>
      <div>
        <h1>Websocket Component</h1>
        <div>
          {messages.length === 0 && newMessage.length === 0 ? (
            <div>No Messages</div>
          ) : (
            <div>
              {messages.slice().reverse().map((msg) => (
                <div>
                  <p>{msg.writer}: {msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {newMessage.length === 0 ? null : (
            <div>
              {newMessage.map((msg) => (
                <div>
                  <p>{msg.writer}: {msg.message}</p>
                </div>
              ))}
            </div>
          )}    
        </div>
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSubmit();
              }
            }}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};