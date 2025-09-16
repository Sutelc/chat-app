import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import {signup, login, resetPassword} from '../../config/firebase'

const Login = () => {
  const [currState, setCurrState] = useState('Sign Up');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    if (currState === 'Sign Up') {
      await signup(username, email, password);
    } else {
       login(email, password);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo} alt="" className='logo' />
      <form onSubmit={OnSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === 'Sign Up' ?<input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder='username' required className="form-input" /> : null }

        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' required className="form-input" />
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' required className="form-input" />
        <button type='submit'>{currState === 'Sign Up' ? 'Create account' : 'Login now'}</button>
        <div className="login-term">
          <input type="checkbox" required />
          <label htmlFor="">I agree to the terms and conditions</label>
        </div>
        <div className='login-forgot'>
          {
            currState === 'Sign Up' ? <p className="login-toggle">Already have an account? <span onClick={()=>{setCurrState('Login')}}>login here</span></p> : <p className="login-toggle">Create an account ? <span onClick={()=>{setCurrState('Sign Up')}}>click here</span></p>
          }
          {currState === 'Login' ? <p className="login-toggle">Forgot password ? <span onClick={()=>{resetPassword(email)}}>reset here</span></p> : null}
        </div>
      </form>
    </div>
  )
}

export default Login