import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './messageContainer.css'
import Messages from './Messages';
import MessageInput from './MessageInput';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const MessageContainer = () => {
    const { meetId } = useParams();

    const [ socket, setSocket ] = useState( null );
    const [ participants, setParticipants ] = useState( [] );
    const [messages, setMessages] = useState([]);
    const { user } = useContext( AuthContext );

    useEffect( () => {
      const socket = io( 'http://localhost:5000', {
        auth: {
          userId: user.id,
        },
        query: {
          meetId
        }
      } );

      setSocket(socket);
      
      socket.on('meetParticipants', meetParticipants => {
        setParticipants(meetParticipants)
      });

      // --| Disconnect the socket when the component is unmounted
      return () => socket.disconnect();
      }, [user.id, meetId] );
      

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
      <Messages messages={messages} socket={socket} setMessages={setMessages} />
      <MessageInput meetId={meetId} />
    </div>
  )
}

export default MessageContainer