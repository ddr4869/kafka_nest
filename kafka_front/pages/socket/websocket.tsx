import React, { useContext, useEffect, useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { WebsocketContext } from "./websocketContext";
import  ChatComponent  from "../components/chatComponent";
import { useRouter } from "next/router";
class Message {
  writer: string;
  message: string;

  constructor(writer: string, message: string) {
    this.writer = writer;
    this.message = message;
  }
}

export const Websocket = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([] as Message[]);
  const [newMessage, setNewMessage] = useState([new Message("me", "방에 입장하셨습니다.")] as Message[]);
  const [me, setMe] = useState("");
  const socket = useContext(WebsocketContext);
  const { data: session, status } = useSession()
  

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    let username = localStorage.getItem('username');
    if (username === null) {
      const router = useRouter();
      router.push("/login")
    }
  
  }

  useEffect(() => {
    if (!session) {
      console.log('No session');
      console.log('status:', status);
      return;
    }
    console.log('Current session:', session);
  }, [session]);

  useEffect(() => {
    console.log("query Messages start!");
    fetch("http://127.0.0.1:8080/api/messages")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.data.map((item) => new Message(item.writer, item.message)));
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    // 소켓 이벤트 핸들러 해제
    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []); // socket 의존성 추가

  socket.on("connect", () => {
    socket.emit("newMessage", {
      username: username,
    });
    console.log("Connected!");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected!");
    socket.disconnect();
  });

  socket.on("onMessage", (inputMessage: Message) => {
    setNewMessage([
      ...newMessage,
      new Message(inputMessage.writer, inputMessage.message),
    ]);
  });

  socket.on("onComing", (inputMessage: Message) => {
    setNewMessage([
      ...newMessage,
      new Message(inputMessage.writer, inputMessage.message),
    ]);
    console.log("onComing: ", inputMessage);
  });

  const onSubmit = () => {
    if (value == "" || socket.id === undefined) {
      return;
    }
    setMe(username ? username : socket.id.substring(0, 8));
    socket.emit("newMessage", {
      writer: username,
      message: value,
    });
    setValue("");
  };

  return (
    <div>
      <ChatComponent  messages={messages} newMessage={newMessage} me={me} value={value} setValue={setValue} onSubmit={onSubmit} />
    </div>
  );
};
