import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:5000/api/v1/login', {
        email, password
      }, { withCredentials: true })

      const user = resp.data.data
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: 'LOGIN', payload: user });

      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='loginPage'>
      <div className="loginContainer">
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="inputBox">
            <label htmlFor="Email">
              <span>Email</span>
            </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter email here'/>
          </div>
          <div className="inputBox">
            <label htmlFor="password">
              <span>Password</span>
            </label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password here'/>
          </div>
          <Link to='/signup'>
            {`Don't`} have an account?
          </Link>
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login