import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './messageContainer.css'
import Messages from './Messages';
import MessageInput from './MessageInput';

const MessageContainer = () => {
  return (
    <div className='messageContainer'>
      {/* chat header */}
      <div className="chatHeader">
        <div className='left'>
          <FontAwesomeIcon icon="fa-regular fa-message" />
          <p>Chats</p>
        </div>
        <div className="arrowDown">
          <FontAwesomeIcon icon="fa-solid fa-angle-down" />
        </div>
      </div>
      <Messages />
      <MessageInput />
    </div>
  )
}

export default MessageContainer