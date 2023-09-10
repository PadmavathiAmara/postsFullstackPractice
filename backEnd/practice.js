const express = require('express');
const app = express(); 
app.get('/',(req,res)=>{
    res.send("<h3>hello</h3>");
})

const port = 8081;
app.listen(port ,()=>{
    console.log(`${port} listening`);
})