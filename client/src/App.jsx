import './index.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Meeting from './pages/meeting/Meeting';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

const App = () => {
  const { user, } = useContext(AuthContext);
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route 
          path='/'
          element={!user ? <Navigate to='/login' /> : <Home />}
          />
          <Route 
          path='/login'
          element={user ? <Navigate to='/' /> : <Login />}
          />
          <Route 
          path='/signup'
          element={user ? <Navigate to='/' /> : <SignUp />}
          />
          <Route 
          path='/:meetId'
          element={!user ? <Navigate to='/login' /> : <Meeting />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
library.add( fab, fas, far );