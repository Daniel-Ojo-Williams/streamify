import Message from './Message';
import './messages.css';

const Messages = () => {
  return (
    <div className='messages'>
      <div className="end">
        <Message />
        <Message />
      </div>
    </div>
  );
};

export default Messages;