import { useContext, useState } from 'react';
import './messageInput.css'
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

function MessageInput({ meetId }) {

  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState("");

  const sendMessage = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/message', {
        meetId, senderId: user.id, text: message
      }, { withCredentials: true })
      setMessage("");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='messageInput'>
      <form action="" onSubmit={sendMessage}>
        <input type="text" placeholder='Send a message' value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button>Send</button>
      </form>
    </div>
  )
}

export default MessageInput