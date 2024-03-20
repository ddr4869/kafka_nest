import axios from './axios'

export const getMessages = (props:any, query:any) => {
    //noStore()
    
    try {
      return new Promise<any>((resolve, reject) => {
        console.log("getMessages props: ", props)
        console.log("getMessages board_id: ", query)
        const reqUrl = `/messages/${query.id}`;
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
