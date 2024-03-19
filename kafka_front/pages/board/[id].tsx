import { useRouter } from 'next/router'
import { useSession, SessionProvider } from "next-auth/react";
import { socket, WebsocketProvider } from '../socket/websocketContext';
import { Websocket } from '../socket/websocket';
export default function Page() {
  const router = useRouter()
  return (

      <SessionProvider>
        <p>Post name: {router.query.board_name}</p>
      <WebsocketProvider value={socket}>
        <Websocket board_id={router.query.id}/>
      </WebsocketProvider>
    </SessionProvider>
  )
}