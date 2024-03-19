import React, { useContext, useEffect, useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { WebsocketContext } from "./websocketContext";
import  ChatComponent  from "../components/chatComponent";
import { useRouter } from "next/router";
import { getMessages } from "../server/message";
class Message {
  writer: string;
  message: string;

  constructor(writer: string, message: string) {
    this.writer = writer;
    this.message = message;
  }
}

export const Websocket = (props: any) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([] as Message[]);
  //const [newMessage, setNewMessage] = useState([new Message("me", "방에 입장하셨습니다.")] as Message[]);
  const [newMessage, setNewMessage] = useState([] as Message[]);
  const [me, setMe] = useState("--User Connecting--");
  const socket = useContext(WebsocketContext);
  const { data: session, status } = useSession()
  
  //let username:any

  // if (typeof window !== 'undefined') {
  //   // Perform localStorage action
  //   username = localStorage.getItem('username');
  //   if (username === null) {
  //     const router = useRouter();
  //     router.push("/login")
  //   }
  // }


  useEffect(() => {
    setMe(socket.id? socket.id.substring(0, 8) : 'anonymous');
    if (!session) {
      console.log('No session');
      console.log('status:', status);
      return;
    }
    console.log('Current session:', session);
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getMessages(props);
        console.log(response)
        setMessages(response.map((item) => new Message(item.writer, item.message)));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, []); // socket 의존성 추가

  socket.on("connect", () => {
    console.log("connect!")
    socket.emit("newMessage", {
      // username: username,
      writer: me,
      message: value,
    });
    console.log("Connected!");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected!");
    socket.disconnect();
    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  });

  socket.on("onMessage", (inputMessage: Message) => {
    console.log("inputMessage.writer: ", inputMessage.writer)
    setNewMessage([
      ...newMessage,
      new Message(inputMessage.writer, inputMessage.message),
    ]);
  });

  // socket.on("onComing", (inputMessage: Message) => {
  //   setNewMessage([
  //     ...newMessage,
  //     new Message(inputMessage.writer, inputMessage.message),
  //   ]);
  //   console.log("onComing: ", inputMessage);
  // });


  const onSubmit = () => {
    if (value == "" || socket.id === undefined) {
      return;
    }
    // setNewMessage([
    //   ...newMessage, new Message(me, value),
    // ]);
    socket.emit("newMessage", {
      writer: socket.id.substring(0, 8),
      message: value,
      board_id: board_id
    });
    setValue("");
  };


  return (
    <div>
      <ChatComponent  messages={messages} newMessage={newMessage} me={me} value={value} setValue={setValue} onSubmit={onSubmit} />
    </div>
  );
};
