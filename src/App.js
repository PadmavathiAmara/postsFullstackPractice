import React from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import { create } from 'zustand';
import { useEffect } from 'react';
import ChangePwd from './ChangePwd';
import axios from 'axios';
import ForgotPwd from './ForgotPwd';
import SendResetLink from './SendResetLink';
// import { useStore } from "zustand";
// import jwt_decode from "jwt-decode";

export const useUserStore = create((set)=>({
    loginToken: {},
    setLoginToken: (str) => set(()=> ({
      loginToken: {str}
    })),
    currentUser: [],
    setCurrentUser: (str)=>set(()=>({
      currentUser: str
    }))
}))


function App() {
    // const navigate = useNavigate();
    const { setLoginToken, setCurrentUser, loginToken } = useUserStore();

    useEffect(()=>{
      let retrievedToken = (localStorage.getItem("Token"));
        console.log(retrievedToken);
        if(retrievedToken){
        console.log(retrievedToken);
        setLoginToken(retrievedToken);
      }
     
        let getToken = localStorage.getItem("Token");
        axios.post("http://localhost:8080/profile",{
            getToken
        }).then((response)=>{
            console.log("response", response.data);
            setCurrentUser(response.data)
        }).catch((err)=>{
            console.log("err", err);
        })
    
    },[])


    useEffect(()=>{
      console.log("loginToken",loginToken);
    },[loginToken])

return(
  <>
  <Routes>
    <Route path='/signup' element={<Signup/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='/changepwd' element={<ChangePwd/>} />
    <Route path='/sendResetLink' element={<SendResetLink/>} />
    <Route path='/forgotPwd/:finalHashID' element={<ForgotPwd/>} />
  </Routes>
  </>
)

  
}

export default App;
