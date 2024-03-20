import { useRouter } from 'next/router'
import { useSession, SessionProvider } from "next-auth/react";
import { socket, WebsocketProvider } from '../socket/websocketContext';
import { Websocket } from '../socket/websocket';
import axios from '../server/axios'

export default function Page({id}:any) {
  return (
      <p>hi, {id}</p>
  )
}

export async function getServerSideProps(context:any) {
  console.log("context: ", context)
  const { id } = context.params; // context를 사용해 만든 쿼리 정보
  console.log("context params: ", context.params.id)
  console.log("id: ", id)
  return  { props: { id } };
}         

// export async function getServerSideProps(context:any) {
//   console.log("context: ", context)
//   const reqUrl = `/messages/${context.board_id}`;
//   const res = await axios.get(reqUrl)
//   const messages = res.data.data
//   return {
//     boards: {
//       messages: messages,
//     },
//   };
// }

