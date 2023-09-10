import React, {useState} from 'react';
import axios from "axios";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {

  const [loginUn, setLoginUn] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  
  const loginAuth = process.env.REACT_APP_FED;
  var CryptoJS = require("crypto-js");
  const navigate = useNavigate();

  const getData = () =>{
    // console.log(loginPwd, loginAuth);
    var hashPassword = CryptoJS.AES.encrypt(loginPwd, loginAuth).toString();

    axios.post("http://localhost:8080/login",({
    un: loginUn,
    pwd: hashPassword 
    }))
    .then((response)=>{
      console.log(response.data);
      localStorage.setItem("Token", response.data.token);
      navigate('/profile');
    }).catch((error)=>{
      console.log("error:", error)
    })
  }

  return (
    <div className="App">
      <h1>Login Form</h1>
        <label>Username:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={loginUn}
            // placeholder="Enter login username!"
            onChange={(e) => setLoginUn(e.target.value)}
          required
        /><br />
        <label>Password:</label>
        <input
          type="password"
          id="password"
          password="password"
          value={loginPwd}
            // placeholder="Enter login password!"
            onChange={(e) => setLoginPwd(e.target.value)}
          required
        /><br />
        <button onClick={() => getData()}>Submit</button>
        <br/>
        <span>Not registered?<button onClick={()=>navigate('/signup')}>Go to Signup</button>
</span>
<br/>
        <Link to="/sendResetLink">Forgot Password</Link>
    </div>
  );
}

export default Login;
