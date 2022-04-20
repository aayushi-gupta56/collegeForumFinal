const cryptoJs = require('crypto-js');
const connection = require('../dbConnection');
const route  = require('express').Router();
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require('./verifyToken');

//UPDATE
route.put('/:id', verifyTokenAndAuth, async(req, res)=>{
    try{
        if(req.body.password && req.body.password!==""){
            const password = cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
            const stmt = `UPDATE users SET password='${password}' WHERE userID='${req.params.id}';`
            const rs = await new Promise((resolve, reject)=> connection.query(stmt, (err, result)=>{
                if(err)
                    reject(err);
                else
                    resolve(result);
            }))
            console.log("PASSWORD UPDATE"); 
        }
        
        if(req.body.email && req.body.email!==""){
            const email = req.body.email;
            const stmt = `UPDATE users SET email='${email}' WHERE userID='${req.params.id}';`
            const rs = await new Promise((resolve, reject)=> connection.query(stmt, (err, result)=>{
                if(err)
                    reject(err);
                else
                    resolve(result);
            }))
            console.log("EMAIL UPDATE"); 
        }

        const stmt = `SELECT * FROM users WHERE userID='${req.params.id}'`
        const user = await new Promise((resolve, reject)=> connection.query(stmt, (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))
        
        const {password, isAdmin, ...others} = user[0];
        res.status(200).json({...others, message:"Password and email changed successfully.."});
        
        
    }catch(err){
        res.status(500).json(err);
    }
})


//DELETE
route.delete('/:id',verifyTokenAndAuth, async (req, res)=>{
    try{

        const stmt1 = `SELECT userID FROM users WHERE userID='${req.params.id}'`;
        const searchRS = await new Promise((resolve , reject)=> connection.query(stmt1, (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }));

        if(searchRS.length==0)
            return res.status(400).json('NO SUCH USER EXISTS :(');

        const stmt = `DELETE FROM users WHERE userID='${req.params.id}'`
        const rs= await new Promise((resolve , reject)=> connection.query(stmt, (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))

        res.status(200).json('USER DELETED..');

    }catch(err){
        res.status(500).json(err);
    }
})


//GET USER
route.get('/find/:id', verifyToken, async (req, res)=>{
    try{

        const stmt = `SELECT * FROM users WHERE userID='${req.params.id}'`
        const user = await new Promise((resolve, reject)=>connection.query(stmt, (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result);
        }))
        const {password, isAdmin, ...others} = user[0];
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL USERS
route.get('/find', verifyTokenAndAdmin, async (req, res)=>{
    try{

        const stmt = 'SELECT * FROM users'
        const user = await new Promise((resolve, reject)=>connection.query(stmt, (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result);
        }))
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = route;