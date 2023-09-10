import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ForgotPwd = () => {

    const [ newPwd, setNewPwd ] = useState("");
    const [ confirmNewPwd, SetConfirmNewPwd ] = useState("");
    const { finalHashID } = useParams();
    const [ show, setShow ] = useState(false);
    console.log("ID in FE", finalHashID);
    const navigate = useNavigate();
    var CryptoJS = require("crypto-js");
    const signUpAuth = process.env.REACT_APP_FED;

    const onForgotPwdClick = async () =>{
        if( newPwd !== confirmNewPwd ){
            console.log("passwords doesnt match!");
        }
        try{
            const encryptedNewPwd = CryptoJS.AES.encrypt(newPwd, signUpAuth).toString();
            const response = await axios.post(`http://localhost:8080/forgotPwd/${finalHashID}`, {encryptedNewPwd});
            console.log(response);

            if(response.status==200){
                console.log("nwe pwd set success");
                localStorage.removeItem("Token");
                navigate('/login');
            }
            else{
                console.log("update failed");
            }

        } catch (err){
            console.log("error", err);
        }
    }

    return(
        <div className="App">
        <h2>Reset your new password!</h2>
        <label>New Password:</label>
        <input type="text" value={newPwd} required onChange={(e)=>setNewPwd(e.target.value)}/>
        <br/>
        <label>Confirm New Password:</label>
        <input type="text" value={confirmNewPwd} required onChange={(e)=>SetConfirmNewPwd(e.target.value)}/>
        <br/>
        <button id="updateBtn" onClick={()=>{onForgotPwdClick();setShow(true)}}>Update New Pwd</button>
        { show ? <span>Your new password has been updated successfully!</span>: ""}
        
        </div>
    )
}

export default ForgotPwd;
