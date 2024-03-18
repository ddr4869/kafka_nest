// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { getBoards } from '../server/board';
import styles from '../styles/board-styles.module.css'

const Home = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boards, setBoards] = useState([]);
  const router = useRouter();

  const navigateToBoard = (boardId:any) => {
    router.push(`/api/board/${boardId}`);
  };

  useEffect(() => {
    if (typeof localStorage === 'undefined') {
        localStorage= {};
        return;
    }
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  useEffect(() => {
    const fetchBoards = async (token:string) => {
      try {
        
        // API 요청 URL을 적절히 변경하세요.
        const response = await getBoards(token);
        console.log(response)
        setBoards(response); // 'data' 필드 안의 'data' 배열을 상태로 설정
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };
    const accessToken = localStorage.getItem('accessToken');
    if (isLoggedIn && accessToken) {
      fetchBoards(accessToken); // fetchData는 보드 정보를 불러오는 함수입니다.
    } else {
      setBoards([])
    }
  }, [isLoggedIn]);


  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you would replace with your own signIn logic
    const response = await axios.post('http://localhost:8080/api/user/login', {
        username,
        password
      });
      const { data } = response.data;
      const { access_token } = data;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('username', username);
      console.log("access: ", localStorage.getItem('accessToken'));
      setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  return (
    <div className="chat-board">
      <header>
        <h1>CHAT Board</h1>
        <div id="login-section">
          {!isLoggedIn ? (
            <form onSubmit={handleLogin}>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          ) : (
            <div>
              <p>Welcome, <strong>{username}</strong></p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>
      <main>
        <div>
        <h2> 
          {isLoggedIn ? "Boards List" : "Please Login" } 
        </h2>
          <ul>
            {boards.map((board) => (
              <div key={board.board_id} className={styles.boardCard}>
              <div>ID: {board.board_id}</div>
              <div>Name: {board.board_name}</div>
              <div>Star: {board.board_star}</div>
              <div>Admin: {board.board_admin}</div>
              <button onClick={() => navigateToBoard(board.board_id)}>View Board</button>
            </div>
            ))}
          </ul>
        </div>

      </main>
    </div>
  );
};

export default Home;
