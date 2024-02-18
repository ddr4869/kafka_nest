import { useEffect } from 'react';

export function Messages(): String[]{
  console.log("query Messages start!")
  useEffect(() => {
    fetch('http://127.0.0.1:8080/messages')
      .then(response => response.json())
      .then(data => {
        // 서버로부터 받은 데이터에서 메시지만 추출하여 문자열 배열로 저장합니다.
        const extractedMessages = data.map(item => item.message);
        console.log('extractedMessages:', extractedMessages);
        return extractedMessages
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
      
  }, []);
  return [];
}
