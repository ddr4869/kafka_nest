'use client';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { socket, WebsocketProvider } from './socket/websocketContext';
import { Websocket } from './socket/websocket';
import { useSession, SessionProvider } from "next-auth/react";


const Home = ({Component, pageProps}) => {

  return (
    <SessionProvider>
      <WebsocketProvider value={socket}>
        <Websocket />
      </WebsocketProvider>
    </SessionProvider>
  );
};

export default Home;
