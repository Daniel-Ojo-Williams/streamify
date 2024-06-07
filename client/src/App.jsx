import './index.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons'
import Meeting from './pages/meeting/Meeting';

const App = () => {
  return (
    <div className=''>
      <Meeting />
    </div>
  )
}

export default App;
library.add( fab, fas, far );