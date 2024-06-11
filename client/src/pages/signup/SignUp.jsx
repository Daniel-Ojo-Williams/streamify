import axios from 'axios';
import './signup.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:5000/api/v1/signup', {
        email, password, username
      })

      toast.success(resp.data.message)
      navigate('/login');
    } catch (error) {
      toast.error(error.response.message)
    }
  }
  return (
    <div className='signupPage'>
      <ToastContainer />
      <div className="signupContainer">
        <h1>Sign up</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="inputBox">
            <label htmlFor="Username">
              <span>Username</span>
            </label>
            <input type="text" placeholder='Enter username here' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="inputBox">
            <label htmlFor="Email">
              <span>Email</span>
            </label>
            <input type="email" placeholder='Enter email here' value={email} onChange={( e ) => setEmail( e.target.value )} />
          </div>
          <div className="inputBox">
            <label htmlFor="password">
              <span>Password</span>
            </label>
            <input type="password" placeholder='Enter password here' value={password} onChange={( e ) => setPassword( e.target.value )} />
          </div>
          <Link to='/login'>
            {`Don't`} have an account?
          </Link>
          <button>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp