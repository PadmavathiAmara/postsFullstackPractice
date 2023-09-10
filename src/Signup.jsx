import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    var CryptoJS = require("crypto-js");
    const signUpAuth = process.env.REACT_APP_FED;
    const hashPassword = CryptoJS.AES.encrypt(password, signUpAuth).toString();

    const navigate = useNavigate();
  
    const postData = () => {
      axios.post("http://localhost:8080/signup", {
        Username : name,
        password: hashPassword,
        Email: email
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log("error", error);
      })
    }
  
    return (
      <div className="App">
        <h1>SignUp Form</h1>
          <label>Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            // placeholder="Enter username!"
            onChange={(e) => setName(e.target.value)}
            required
          /><br />
          <label>Password:</label>
          <input
            type="password"
            id="password"
            password="password"
            value={password}
            // placeholder="Enter password!"
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <label>Email:</label>
          <input
            type="string"
            id="email"
            email="email"
            value={email}
            // placeholder="Enter Mail Id!"
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <button onClick={() => postData()}>Submit</button>
          <br/>
          <span>Already registered?<button onClick={()=>navigate('/login')}>Go to Login</button></span>
      </div>
    );
}

export default Signup;


