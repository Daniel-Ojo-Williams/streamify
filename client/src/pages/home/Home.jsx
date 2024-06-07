import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './home.css';

function Home() {
  return (
    <div className='homePage'>
      <div className="homeContainer">
        <div className="meetingBoxes">
          <div className="meetingBox create">
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
          <input type="text" />
          <button>Enter meet</button>
        </div>
      </div>
    </div>
  )
}

export default Home