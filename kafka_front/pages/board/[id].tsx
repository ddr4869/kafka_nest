import { useRouter } from 'next/router'
import { useSession, SessionProvider } from "next-auth/react";
import { socket, WebsocketProvider } from '../socket/websocketContext';
import { Websocket } from '../socket/websocket';
import axios from '../server/axios'

export default function Page({id}:any) {
  const router = useRouter()
  return (
      <SessionProvider>
        <p>Post name: {router.query.board_name}</p>
        {/* <p>Post id: {router.query.id}</p> */}
        <p>Post id: {id}</p>
      <WebsocketProvider value={socket}>
        <Websocket board_id={id} board_name={router.query.board_name}/>
      </WebsocketProvider>
    </SessionProvider>
  )
}

export async function getServerSideProps(context:any) {
  return { props: { id: context.params.id } };
}

