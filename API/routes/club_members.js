const connection = require('../dbConnection');
const route  = require('express').Router();
const {verifyTokenAndAuth} = require('./verifyToken');

//CREATE
route.post('/:id', verifyTokenAndAuth, async(req, res)=>{
    const memID = req.body.memID;
    try{

        const stmt1 = "SELECT * FROM clubs_profile WHERE userID=?";
        const rs1 = await new Promise((resolve, reject)=>connection.query(stmt1, [req.params.id], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))
        
        if(rs1.length==0)
            return res.status(402).json("Sorry couldn't find resource you looking for :(");

        const stmt2 = "SELECT * FROM stud_profile WHERE userID=?";
        const rs2 = await new Promise((resolve, reject)=>connection.query(stmt2, [memID], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))
            
        if(rs2.length==0)
            return res.status(402).json("OOPS..NO STUDENT REGISTERED WITH THAT ID :(");

        const stmt = "INSERT INTO club_members VALUES (?,?)";
        const rs = await new Promise((resolve, reject)=>connection.query(stmt, [req.params.id, memID], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))
            
        return res.status(200).json("CLUB MEMBER ADDED..");
        

    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL MEMBERS
route.get('/:id', verifyTokenAndAuth, async(req, res)=>{
    try{

       const stmt = "SELECT * FROM club_members AS c_m INNER JOIN stud_profile AS s_p ON c_m.memID = s_p.userID";
        

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = route;