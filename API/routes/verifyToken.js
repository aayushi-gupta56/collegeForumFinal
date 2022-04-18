const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC_KEY, (err, user)=>{
            if(err)
                return res.status(402).json("INVALID TOKEN..");
            req.user = user;
            next();
        });
    }else{
        return res.status(402).json("YOU ARE NOT AUTHENTICATED..");
    }
}

const verifyTokenAndAuth = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin || req.user.userID===req.params.id)
            next();
        else
            res.status(402).json("ACCESS DENIED..");
    })
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin)
            next();
        else
            res.status(402).json("ACCESS DENIED..");
    })
}

module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin};