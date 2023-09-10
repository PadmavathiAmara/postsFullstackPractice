import { useState } from "react";
import { useUserStore } from "./App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ChangePwd = () => {

    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [newConfirmPwd, setNewConfirmPwd] = useState('');
    const { currentUser } = useUserStore();
    const [ show, setShow ] = useState(false);
    // let currentUN = currentUser.Username;
    // console.log(currentUN);
    const loginAuth = process.env.REACT_APP_FED;
    var CryptoJS = require("crypto-js");
    const hashOldPwd = CryptoJS.AES.encrypt(oldPwd, loginAuth).toString();
    console.log(hashOldPwd);
    const hashNewPwd = CryptoJS.AES.encrypt(newPwd, loginAuth).toString();
    console.log(hashNewPwd);
    const navigate = useNavigate();

    const OnConfirmNewPwd = () =>{
        if(newPwd.length != 0 && newConfirmPwd.length != 0){
            if(newPwd == newConfirmPwd){
                return <h3>Matched</h3>
            }
            else{
                return <h3>Not Matched</h3>
            }
        }
        else{
            return <h3>Fields cant be empty!</h3>
        }
        
    }

    const onChangePwd = () =>{
        axios.post(("http://localhost:8080/changepwd"),{
            currentUser,
            hashOldPwd,
            hashNewPwd
        }).then((res)=>{
            console.log(res);
            if(res.status == 200){
                localStorage.clear();
                navigate('/login');
            }
        }).catch((err)=>{
            console.log(err);
        })
    }



    return(
        <div className="App">
        <h2>Want to change your password?</h2>
        <label>Old pwd:</label>
        <input  type="text"
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
          required/>
        <br/>
        <label>New pwd:</label>
        <input  type="text"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
          required/>
          <br/>
          <label>New Confirm pwd:</label>
        <input  type="text"
          value={newConfirmPwd}
          onChange={(e) => setNewConfirmPwd(e.target.value)}
          required/>
          <br/>
          <OnConfirmNewPwd/>
          <br/>
          <button onClick={()=>{onChangePwd();setShow(true)}}>Submit Pwd</button>
          {show ? <span>Your password has been changed successfully!</span>: ""}
        </div>
    )
}

export default ChangePwd;