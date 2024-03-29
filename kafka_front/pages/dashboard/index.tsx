// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { getBoardsAxios, recommendBoardAxios } from '../server/board';
import styles from '../styles/board-styles.module.css'

const Home = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boards, setBoards] = useState([]);
  const [recommended, setRecommended] = useState(false);
  const router = useRouter();

  const navigateToBoard = (boardId:any, boardName:any) => {
    router.push({
      pathname: `/board/${boardId}`,
      query: {
        board_name: boardName
      }
    });
  };

  async function recommendBoard(board_id:number) {
      try {
        // API 요청 URL을 적절히 변경하세요.
        console.log("board_id: ", board_id)
        const response = await recommendBoardAxios(board_id);
        console.log("resp: ", response)
        return response
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
  };

  const handleRecommend = async (board_id: number) => {
    try {
        await recommendBoard(board_id); // 추천 요청 보내기
        setRecommended(true); // 추천 상태 업데이트
    } catch (error) {
        // 추천 요청 실패 시 에러 처리
        console.error('Error recommending board:', error);
    }
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
        const response = await getBoardsAxios(token);
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
    setRecommended(false);
  }, [isLoggedIn, recommended]);

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
        <h1>Docker</h1>
        <div id="login-section">
          {!isLoggedIn ? (
            <form onSubmit={handleLogin}>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          ) : (
            <div>
              <p>Welcome, <strong>{localStorage.getItem('username')}</strong></p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>
      <main>
        <div>
        <h2> 
          {isLoggedIn ? "Container List" : "Please Login" } 
        </h2>
          <ul>
            {boards.map((board) => (
              <div key={board.board_id} className={styles.boardCard}>
              <div>ID: {board.board_id}</div>
              <div>Name: {board.board_name}</div>
              <div>Star: {board.board_star}</div>
              <div>Admin: {board.board_admin}</div>
              <button onClick={() => navigateToBoard(board.board_id, board.board_name)}>View Board</button>{" "}
              <button onClick={() => handleRecommend(board.board_id)}>Recommend</button>
            </div>
            ))}
          </ul>
        </div>
        <div>
          {/* // Add a button to create a new board */}
          <button onClick={() => router.push('/create-board')}>Create Board</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
