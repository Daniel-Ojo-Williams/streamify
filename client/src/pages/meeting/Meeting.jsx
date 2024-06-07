import './meeting.css'
import MessageContainer from '../../components/messages/MessageContainer';
import VideoContainer from '../../components/videos/VideoContainer';

function Meeting() {
  return (
    <div className='meetingContainer'>
      <VideoContainer />
      <MessageContainer />
    </div>
  )
}

export default Meeting