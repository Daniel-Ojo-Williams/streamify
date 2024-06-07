import './message.css';

const Message = () => {
  return (
    <div className='message'>
      <div className="imageAvatar">
        <img src="./avatar.png" alt="" />
      </div>
      <div className="usernameText">
        <div className="usernameTime">
          <span>John Doe</span>
          <span>10:14</span>
        </div>
        <div className="text">
          <p>Hi wasssag</p>
        </div>
      </div>
    </div>
  );
};

export default Message;