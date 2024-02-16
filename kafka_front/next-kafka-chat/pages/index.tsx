import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // 채팅 히스토리 가져오기
    getChatHistory();
  }, []);

  const getChatHistory = async () => {
    try {
      const response = await axios.get('/api/chat/history');
      setChatHistory(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('/api/chat/send', { message });
      setMessage('');
      // 채팅 히스토리 다시 가져오기
      getChatHistory();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index}>{chat}</div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
