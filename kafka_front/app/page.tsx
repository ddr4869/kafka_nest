'use client';
import React, { useState } from 'react';
import io from 'socket.io-client';
import { socket, WebsocketProvider } from './WebsocketContext';
import { Websocket } from './websocket';
const Home = () => {

  return (
      <WebsocketProvider value={socket}>
        <Websocket />
      </WebsocketProvider>

  );
};

export default Home;
