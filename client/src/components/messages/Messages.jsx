import { useEffect, useRef } from 'react';
import Message from './Message';
import './messages.css';

const Messages = ({ messages, socket, setMessages }) => {
  const messageRef = useRef(null)

  useEffect(() => {
    const listener = newMessage => {
      setMessages( prev => [ ...prev, newMessage ])
    }
    socket?.on( 'message',  listener);

      return () => socket?.off('message', listener)
    }, [socket, setMessages])

  useEffect( () => {
    if ( messageRef.current ) {
      messageRef.current.style.scrollBehavior = 'smooth'
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [ messages ] );
    
  console.log(messages)
  return (
    <div className='messages'>
      <div className="end" ref={messageRef}>
        {
          messages.length > 0 && messages.map((message, i) => (
            <Message message={message} key={i}  />
          ))
        }
      </div>
    </div>
  );
};

export default Messages;