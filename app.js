const { application } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api',(req,res)=>{
    res.json({
        message:'welcome to API'
    });
});
app.post('/api/posts',verifyToken, (req,res)=>{
jwt.verify(req.token,'secretKey', (err,authData)=>{
    if(err){
        res.sendStatus(403);
    } else{
        res.json({
            message: 'Post Created...',
            authData
        })
    }
})
 
});


app.post('/api/login', (req,res)=>{
    // Mock User
    const user ={
        id :1,
        username:'Harshada',
        email:'harshada@gmai.com'
    }
    jwt.sign({user}, 'secretKey',(err,token)=>{
        res.json({
            token
        });
    });
});
// verify token
// Format of token
// Authorization: Bearer <access_token>

function verifyToken(req,res, next){
    // Get Auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from Array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        // next middleware
        next();    
    }else {
        // Forbidden
        res.sendStatus(403);
    }

}
app.listen(5000, ()=>console.log('server started on port 5000'));