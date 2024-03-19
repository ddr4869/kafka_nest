import axios from './axios'

export const getMessages = (props:any) => {
    //noStore()
    try {
      return new Promise<any>((resolve, reject) => {
        const reqUrl = `/messages/${props.board_id}`;
        console.log("reqUrl: ", reqUrl)
        axios.get(reqUrl,  {
          })
        .then(res => {
          resolve(res.data.data);
        })
        .catch(err => {
            console.log(err)
          reject(err.message);
        })
      })
    } catch (error) {
      console.error('Server Error:', error);
      throw new Error('Failed to connect server.');
    }
  }
  