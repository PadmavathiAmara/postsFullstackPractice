import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SendResetLink = () => {
    const [ email, setEmail ] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const onUpdateNewPwdClick = () =>{
        axios.post("http://localhost:8080/sendResetLink",{
            email
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className="resetlink">
            <h2>Forgot your password?</h2>
            <p>Enter a valid email and we'll send a resetlink to your email !</p>
        <label id="resetLabel">Email id:</label>
        <input type="text" id="resetInput" value={email} required placeholder="Enter regstered mail id!" onChange={(e)=>setEmail(e.target.value)}/>
        <button className="resetbtn" onClick={()=>{onUpdateNewPwdClick();setShow(true)}}>Send Reset Link</button>
        <br/>
        <button className="resetbtn" onClick={()=>{navigate('/login')}}>Go back to Login</button>
        <br/>
        { show ? <span>Reset link has been sent!</span> : ""}
        </div>
    )
}
export default SendResetLink;