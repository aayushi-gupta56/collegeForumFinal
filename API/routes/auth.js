const route = require('express').Router();
const cryptoJS = require('crypto-js');
const connection = require('../dbConnection');
const jwt = require('jsonwebtoken');


//REGISTER
route.post('/register',async(req,res)=>{
    const reqUserID = req.body.userID;
    const reqPassword = req.body.password;
    const reqEmail = req.body.email;
    const isClub = (req.body.isClub) ? req.body.isClub : 0;
    const isAdmin = (req.body.isAdmin) ? req.body.isAdmin : 0;
    res.header("Access-Control-Allow-Origin", "*");
    if(reqUserID && reqPassword && reqEmail){
        const password = cryptoJS.AES.encrypt(reqPassword, process.env.PASS_SEC_KEY).toString();

        try{

            const stmt = `INSERT INTO users (userID,email,password,isClub,isAdmin) VALUES ('${reqUserID}','${reqEmail}','${password}','${isClub}','${isAdmin}');`;
            const savedUser = await new Promise((resolve, reject)=> connection.query(stmt, (err, result)=>{
                if(err)
                    reject(err);
                else
                    resolve(result); 
            }));

            if(savedUser.affectedRows !== 0){
                if(isClub==1){
                    const s = `INSERT INTO clubs_profile (userID) VALUES ('${reqUserID}');`
                    const savedClub = await new Promise((resolve, reject)=> connection.query(s, (err, result)=>{
                        if(err)
                            reject(err);
                        else
                            resolve(result); 
                    }));
                }else if(isAdmin==0){
                    const s = `INSERT INTO stud_profile (userID) VALUES ('${reqUserID}');`
                    const savedStud = await new Promise((resolve, reject)=> connection.query(s, (err, result)=>{
                        if(err)
                            reject(err);
                        else
                            resolve(result); 
                    }));
                }
            }

            res.status(200).json(`${savedUser.affectedRows} rows affected.`);

        }catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(400).json("Bad INPUT values..");
    }
})



//LOGIN
route.post('/login', async(req, res)=>{
    const reqUserID = req.body.userID;
    const reqPassword = req.body.password;
    if(reqUserID && reqPassword){
        try{
            const stmt = "SELECT * FROM users WHERE userID = '" + reqUserID + "'";
            const user = await new Promise((resolve, reject)=> connection.query(stmt, (err, results)=>{
                if(err)
                    reject(err);
                else
                    resolve(results);
            }))
            if(user.length==0)
                return res.status(400).json("NO SUCH USER ID EXISTS..");

            const hashedPass = user[0].password;
            const decryptedPass = cryptoJS.AES.decrypt(hashedPass, process.env.PASS_SEC_KEY).toString(cryptoJS.enc.Utf8);
            if(reqPassword !== decryptedPass){
                return res.status(400).send("WRONG PASSWORD..");
            }
                

            const AccessToken = jwt.sign({
                userID: reqUserID,
                isAdmin: user[0].isAdmin,
                isClub: user[0].isClub
            }, process.env.JWT_SEC_KEY,
            {expiresIn:"1h"});

            const {password, ...others} = user[0];
            res.status(200).json({...others, AccessToken});

        }catch(err){
            res.status(500).json(err);
        }

    }else{
        return res.status(400).json("Please enter username and password..");
    }
    
})

module.exports = route;