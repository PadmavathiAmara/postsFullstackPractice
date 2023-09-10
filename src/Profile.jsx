// import axios from "axios";
import './App.css';
import { useEffect, useState } from "react";
import { useUserStore } from "./App";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Box, Modal, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const Profile = () => {

    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const { currentUser} = useUserStore();
    // const navigate = useNavigate();

    // useEffect(()=>{
    //     let getToken = localStorage.getItem("Token");
    //     axios.post("http://localhost:8080/profile",{
    //         getToken
    //     }).then((response)=>{
    //         console.log("response", response.data);
    //         setCurrentUser(response.data)
    //     }).catch((err)=>{
    //         console.log("err", err);
    //     })
    // },[]);

    useEffect(()=>{
        console.log(currentUser);
    },[currentUser]);


    return(
        <>
        <h1>Profile</h1>
        <h2>{currentUser.Username}</h2>
        {/* <button onClick={navigate('/changepwd')}>Change Pwd</button> */}
        <Link to='/changepwd'>Change Pwd</Link>
        <br/><br/><br/><br/>
        <Button onClick={handleOpen}><div id="profile"><PersonIcon id="icon"/></div></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           <input type='file' />
           <button>Upload</button>
          </Typography>
        </Box>
      </Modal>
        </>
    )
}

export default Profile;