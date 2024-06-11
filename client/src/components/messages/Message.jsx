import './message.css';

const formatTime = ( time ) => {
  const createdAt = time.split( 'T' )[ 1 ];
  const lastColumnIndex = createdAt.lastIndexOf( ':' );
  const formattedTime = createdAt.slice( 0, lastColumnIndex );
  return formattedTime;
}

const Message = ({ message }) => {
  console.log(message.createdAt, typeof message.createdAt)
  const time = formatTime(message.createdAt)
  return (
    <div className='message'>
      <div className="imageAvatar">
        <img src="./avatar.png" alt="" />
      </div>
      <div className="usernameText">
        <div className="usernameTime">
          <span>{message.sender.username}</span>
          <span>{time}</span>
        </div>
        <div className="text">
          <p>{ message.text }</p>
        </div>
      </div>
    </div>
  );
};

export default Message;