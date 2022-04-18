const connection = require('../dbConnection');
const route  = require('express').Router();
const {verifyTokenAndAuth} = require('./verifyToken');


//UPDATE PROFILE
route.put('/profile/:id', verifyTokenAndAuth, async(req, res)=>{
    const name = (req.body.name) ? req.body.name : null
    const senior = (req.body.senior_Lead) ? req.body.senior_Lead : null
    const senior_Class = (req.body.senior_Lead_Class) ? req.body.senior_Lead_Class : null
    const junior = (req.body.junior_Lead) ? req.body.junior_Lead : null
    const junior_Class = (req.body.junior_Lead_Class) ? req.body.junior_Lead_Class : null
    const dept = (req.body.department) ? req.body.department : null
    const staff = (req.body.teacher_Staff) ? req.body.teacher_Staff : null
    const obj = (req.body.objective) ? req.body.objective : null
    const contact = (req.body.contact) ? req.body.contact : null
    const alternate = (req.body.alternate_Contact) ? req.body.alternate_Contact : null
    const profile = (req.body.profile) ? req.body.profile : null

    try{

        stmt = `UPDATE clubs_profile SET name=?, senior_Lead=?, senior_Lead_Class=?, junior_Lead=?, junior_Lead_Class=?, department=?, 
                teacher_Staff=?, objective=?, contact=?, alternate_Contact=?, profile=? WHERE userID=?`
        
        const rs = await new Promise((resolve, reject)=> connection.query(stmt, [
            name, senior, senior_Class, junior, junior_Class, dept, staff, obj, contact, alternate, profile, req.params.id
        ], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))

        if(rs.affectedRows===0)
            res.status(402).json("Sorry couldn't find the resource you looking for :(")
        else
            res.status(200).json("UPDATE SUCCESS.");

    }catch(err){
        res.status(500).json(err);
    }

})


//GET PROFILE

route.get('/profile/:id', verifyTokenAndAuth, async(req, res)=>{
    const id = req.params.id;
    try{

        const stmt= "SELECT * FROM clubs_profile WHERE userID=?";
        const profile = await new Promise((resolve, reject)=>connection.query(stmt, [id], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        }))
        
        if(profile.length==0)
            res.status(402).json("Sorry couldn't find the resource you looking for :(")

        else
            res.status(200).json(profile[0]);

    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = route;