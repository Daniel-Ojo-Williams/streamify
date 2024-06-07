import './signup.css'

function SignUp() {
  return (
    <div className='signupPage'>
      <div className="signupContainer">
        <h1>Sign up</h1>
        <form action="">
          <div className="inputBox">
            <label htmlFor="Username">
              <span>Username</span>
            </label>
            <input type="text" placeholder='Enter username here' />
          </div>
          <div className="inputBox">
            <label htmlFor="Email">
              <span>Email</span>
            </label>
            <input type="email" placeholder='Enter email here' />
          </div>
          <div className="inputBox">
            <label htmlFor="password">
              <span>Password</span>
            </label>
            <input type="password" placeholder='Enter password here' />
          </div>
          <a href=''>
            {`Don't`} have an account?
          </a>
          <button>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp