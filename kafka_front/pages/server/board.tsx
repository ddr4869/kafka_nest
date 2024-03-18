import axios from './axios'

export const getBoards = (token:string) => {
    //noStore()
    try {
      return new Promise<any>((resolve, reject) => {
        const reqUrl = '/board';
        axios.get(reqUrl,  {
            headers: {
              // Bearer 토큰을 Authorization 헤더에 추가
              'Authorization': `Bearer ${token}`
            }
          })
        .then(res => {
          resolve(res.data.data);
        }, err => {
          reject(err.response.data.message);
        })
      })
    } catch (error) {
      console.error('Server Error:', error);
      throw new Error('Failed to connect server.');
    }
  }
  