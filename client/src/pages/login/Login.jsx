import './login.css';

function Login() {
  return (
    <div className='loginPage'>
      <div className="loginContainer">
        <h1>Login</h1>
        <form action="">
          <div className="inputBox">
            <label htmlFor="Email">
              <span>Email</span>
            </label>
              <input type="email" placeholder='Enter email here'/>
          </div>
          <div className="inputBox">
            <label htmlFor="password">
              <span>Password</span>
            </label>
              <input type="password" placeholder='Enter password here'/>
          </div>
          <a href=''>
            {`Don't`} have an account?
          </a>
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login