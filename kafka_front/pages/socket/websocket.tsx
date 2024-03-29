import React, { useContext, useEffect, useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { WebsocketContext } from "./websocketContext";
import  ChatComponent  from "../components/chatComponent";
import { useRouter } from "next/router";
import { getMessages } from "../server/message";
class Message {
  writer: string;
  message: string;
  board_id: string;

  constructor(writer: string, message: string, board_id: string) {
    this.writer = writer;
    this.message = message;
    this.board_id = board_id;
  }
}

export const Websocket = (props: any) => {
  const router = useRouter();

  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([] as Message[]);
  const [newMessage, setNewMessage] = useState([] as Message[]);
  const [me, setMe] = useState("--User Connecting--");
  const socket = useContext(WebsocketContext);
  const { data: session, status } = useSession()
  

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
        let response = await getMessages(props, router.query);
        setMessages(response.map((item) => new Message(item.writer, item.message, props.board_id)));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchData();
  }, []); // socket 의존성 추가


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
    setNewMessage([
      ...newMessage,
      new Message(inputMessage.writer, inputMessage.message, inputMessage.board_id),
    ]);
  });


  const onSubmit = () => {
    if (value == "" || socket.id === undefined) {
      return;
    }
    const username = localStorage.getItem('username');
    console.log("username! ", username)
    socket.emit("newMessage", {
      writer: username,
      message: value,
      board_id: props.board_id
    });
    setValue("");
  };


  return (
    <div>
      <ChatComponent 
        board_name={props.board_name} 
        board_id={props.board_id} 
        messages={messages} 
        newMessage={newMessage} 
        me={me} 
        value={value} 
        setValue={setValue} 
        onSubmit={onSubmit} />
    </div>
  );
};
