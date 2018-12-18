const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "API!"
    })
});

app.post('/api/posts',verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message: "Post creado!",
                authData
            });
        }
    })
    
});

app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1, 
        username: "amado",
        email: "amadojms@gmail.com"
    };

    jwt.sign({user: user}, 'secretkey', {expiresIn: '30s'},  (arr, token) => {
        res.json({
            token
        });
    });
});

//format of token
// Authorization: Bearer <access_token>

//Verify token
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        // Split if bearer is undefined
        const bearer = bearerHeader.split(' ')
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        // next middleware
        next();

    }else{
        // Forbidden
        res.sendStatus(403);
    }
}


app.listen(5000, ()=> console.log('listen port 5000'));