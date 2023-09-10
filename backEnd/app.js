const express = require('express');  // importing express
const app = express(); // assigning it to node.js
const cors = require('cors');  // for connecting frontend by giving frontend url in orgin
const bodyParser = require('body-parser'); // to obtain data in object format
const mongoose = require('mongoose'); // importing mongoDb
const User = require('./UserSchema'); // importing userInfoSchema from userInfoSchema.js file
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;
const auth = process.env.BED_KEY;
mongoose.connect(mongoString);
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const resetPassword = require('./Mail/ResetMail');

app.use(cors({
    origin: 'http://localhost:3000'
}));

const database = mongoose.connection;
database.on("error", (error) => { console.log(error) })
database.once("connected", () => { console.log("database connected") })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        console.log(user);
        if (user.length > 0) {
            return res.status(400).json({ msg: "User has already registered" });
        }
        else {
            const newUser = new User({
                Username: req.body.Username,
                password: req.body.password,
                Email: req.body.Email
            });
            newUser.save();
            return res.status(200).json({ msg: newUser })
        }
    })
});

const decryptFn = (hash) => {
    var pwd = CryptoJS.AES.decrypt(hash, auth);
    var decryptPwd = pwd.toString(CryptoJS.enc.Utf8);
    console.log("dec", decryptPwd);
    return decryptPwd;
};

app.post('/login', async (req, res) => {
    console.log(req.body);

    await User.findOne({ Username: req.body.un }).then((user) => {
        console.log("user", user);
        console.log('originalpass:', decryptFn(user.password), 'receivedpass:', decryptFn(req.body.pwd));
        if (!user) {
            res.status(401).json({ msg: "Invalid User" });
        } else {
            if (decryptFn(user.password) !== decryptFn(req.body.pwd)) {
                res.status(401).json({ msg: "Invalid Password" });
            } else {
                let userId = user.id; // or user._id.toString();
                var token = jwt.sign({ userId }, auth);
                console.log("user id", token);
                res.status(200).json({ msg: "Login successful", token });
            }
        }
    });

});

app.post("/profile", async (req, res) => {
    // console.log("token of body", req.body);
    // let token = req.body.getToken;
    // console.log("token of after body", token);
    // const userId = jwt.verify(token, auth);
    // console.log("userId", userId);
    // if(!userId){
    //     res.status(401).json("Invalid token!");
    // }else{
    //     // res.status(200).json(userId);
    //     console.log("user id in else", userId.userId);
    //     const foundUser = await User.findOne({ _id : userId.userId});
    //     console.log("found", foundUser)
    //         res.status(200).json(foundUser);   
    // }
})

app.post("/changepwd", async (req, res) => {
    const { currentUser, hashOldPwd, hashNewPwd } = req.body;
    console.log(req.body);
    await User.findOne({ Username: currentUser.Username }).then((user) => {
        if (user) {
            if (decryptFn(user.password) == decryptFn(hashOldPwd)) {
                // User.updateOne(
                //     //  let userId = user.id;
                //     { _id: currentUser._id},
                //     { $set: { password: newPwd } }
                //   );
                user.password = hashNewPwd
                user.save()
                res.status(200).json({ msg: "Success", user });

            }
            else {
                res.status(401).json({ msg: "Old pwds not matched " });
            }
        }
    })
})

const generateNewHash = (ID) => {
    console.log("in rec", ID);
    const newlyHashedID = CryptoJS.AES.encrypt(ID, auth).toString();
    if(newlyHashedID.includes("/")){
    console.log("in rec if");

        generateNewHash(ID);
    }
    else{
    console.log("in rec else", newlyHashedID);
        
        return newlyHashedID;
    }
}

app.post('/sendResetLink', async (req, res) => {
    console.log("req.body in resetlink", req.body);
    const { email } = req.body;
    await User.findOne({ Email: email }).then((user) => {
        console.log("user", user);
        foundUserId = user.id;
        console.log("founduserid", foundUserId);
        const hashID = CryptoJS.AES.encrypt(foundUserId, auth).toString();
        console.log("foundUserId", hashID);
        if (hashID.includes("/")) {
           const finalHashID = generateNewHash(foundUserId);
    console.log("in post if FHID", finalHashID);

           const link = `http://localhost:3000/forgotPwd/${finalHashID}`;
           resetPassword(email, link);
        }
        else {
            const finalHashID = hashID;
    console.log("in post else FHID", finalHashID);

            const link = `http://localhost:3000/forgotPwd/${finalHashID}`;
            resetPassword(email, link);
        }
        res.status(200).json("decrypted");
    })
    // .catch(err) {
    //     return res.status(500).json("server error");
    // }
})


// BREVO_KEY=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


app.post('/forgotPwd/:finalHashID', async (req, res) => {
    console.log("params", req.params);
    const { finalHashID } = req.params;
    console.log("ID", finalHashID);
    const { encryptedNewPwd } = req.body;
    console.log("newpwd in backend", encryptedNewPwd);
    const decryptedID = decryptFn( finalHashID );
    console.log("decryptedID", decryptedID);
    await User.findOne({ _id: decryptedID }).then((user) => {
        if (user) {
            user.password = encryptedNewPwd;
            user.save()
            res.status(200).json({ msg: "forgotpwd updated" });
        }
    }).catch((error) => {
        console.log('err', error)
    })
})


const port = 8080;
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});



