const connection = require('../dbConnection');
const route  = require('express').Router();
const { verifyToken, verifyTokenAndAuth } = require('./verifyToken')

//CREATE
route.post('/:id', verifyToken, async(req, res)=>{
    const memID = req.body.memID
    const position = req.body.position
    try{

        const stmt1 = "SELECT * FROM clubs_profile WHERE userID=?";
        const rs1 = await new Promise((resolve, reject)=>connection.query(stmt1, [req.params.id], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))
        
        if(rs1.length==0)
            return res.status(400).json("NO SUCH CLUB :(");

        const stmt2 = "SELECT * FROM stud_profile WHERE userID=?";
        const rs2 = await new Promise((resolve, reject)=>connection.query(stmt2, [memID], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))
            
        if(rs2.length==0)
            return res.status(400).json("NO SUCH ID :(");


        const duplicate = "SELECT * FROM club_members WHERE memId=?"
        const check = await new Promise((resolve, reject)=> connection.query(duplicate, [memID], (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        }))

        if(check.length!==0)
            return res.status(400).json("ALREADY A MEMBER :(")

        const stmt = "INSERT INTO club_members VALUES (?,?,?)";
        const rs = await new Promise((resolve, reject)=>connection.query(stmt, [req.params.id, memID, position], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))
            
        return res.status(200).json("MEMBER ADDED ;)");
        

    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL MEMBERS
route.get('/:id', async(req, res)=>{
    try{

       const stmt = "SELECT * FROM club_members AS c_m INNER JOIN stud_profile AS s_p ON c_m.memID = s_p.userID WHERE c_m.clubId=?";
       const result = await new Promise((resolve, reject)=> connection.query(stmt,[req.params.id], (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
       }))

       res.status(200).json(result)
        

    }catch(err){
        res.status(500).json(err);
    }
})


//DELETE A MEMBER
route.delete('/:id/:memID', verifyTokenAndAuth, async (req, res)=>{
    const club = req.params.id
    const member = req.params.memID
    try{

        const stmt = `DELETE FROM club_members WHERE clubId=? AND memId=?`
        const ans = await new Promise((resolve, reject)=>connection.query(stmt, [club, member], (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        }))

        res.status(200).json("DELETED SUCCESSFULLY.")

    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = route;