"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = require("axios");
function Home() {
    const [message, setMessage] = (0, react_1.useState)('');
    const [chatHistory, setChatHistory] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        getChatHistory();
    }, []);
    const getChatHistory = async () => {
        try {
            const response = await axios_1.default.get('/api/chat/history');
            setChatHistory(response.data);
        }
        catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };
    const sendMessage = async () => {
        try {
            await axios_1.default.post('/api/chat/send', { message });
            setMessage('');
            getChatHistory();
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    };
    return (<div>
      <h1>Chat App</h1>
      <div>
        {chatHistory.map((chat, index) => (<div key={index}>{chat}</div>))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>);
}
exports.default = Home;
//# sourceMappingURL=index.js.map