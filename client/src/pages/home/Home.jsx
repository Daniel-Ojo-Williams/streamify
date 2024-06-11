import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './home.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const navigate = useNavigate();
  const [meetId, setMeetId] = useState('');
  const [create, setCreate] = useState(false);
  const createMeeting = async () => {
    try {
      const resp = await axios.post( 'http://localhost:5000/api/v1/meet', {}, { withCredentials: true } );
      setMeetId(resp.data.meetId)
      setCreate(prev => !prev);
    } catch (error) {
      console.log(error)
    }
  }

  const confirmRoom = async () => {
    try {
      if (!create) {
        await axios.get(`http://localhost:5000/api/v1/meet/${meetId}`, { withCredentials: true });
      }
      navigate(`/${meetId}`);
    } catch (error) {
      if (error.response.status === 404) {
        console.log(error)
        toast.error(error.response.data.message, {
          theme: 'dark',
          transition: Bounce
        })
      }
    }
  }

  return (
    <div className='homePage'>
      <ToastContainer />
      <div className="homeContainer">
        <div className="meetingBoxes">
          <div className="meetingBox create" onClick={createMeeting}>
            <div className="meetingIcon">
              <FontAwesomeIcon icon="fa-solid fa-video" />
            </div>
            <div className="texts">
              <p>New Meeting</p>
              <span>Create a new meeting</span>
            </div>
          </div>
          <div className="meetingBox join">
            <div className="meetingIcon">
              <FontAwesomeIcon icon="fa-solid fa-square-plus" />
            </div>
            <div className="texts">
              <p>Join Meeting</p>
              <span>Join a meeting</span>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="meetingId">
          <input type="text" value={meetId} onChange={(e) => setMeetId(e.target.value)} />
          <button onClick={confirmRoom}>Enter meet</button>
        </div>
      </div>
    </div>
  )
}

export default Home