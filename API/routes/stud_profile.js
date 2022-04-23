const connection = require('../dbConnection');
const route  = require('express').Router();
const {verifyTokenAndAuth, verifyToken} = require('./verifyToken');
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './public/profiles')
    },
    filename: (req, file, cb)=>{
        cb(null, req.params.id + Date.now())
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png' || file.mimetype==='image/jfif' || 
        file.mimetype==='image/webp' || file.mimetype==='image/gif'){
            cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage : storage,
    fileFilter : fileFilter
});


//UPDATE PROFILE
route.put('/profile/:id', verifyTokenAndAuth, async(req, res)=>{
    const name = (req.body.name) ? req.body.name : null
    const stud_class = (req.body.class) ? req.body.class : null
    const dept = (req.body.department) ? req.body.department : null
    const contact = (req.body.contact) ? req.body.contact : null
    const hostel = (req.body.hostel) ? req.body.hostel : null
    const dob = (req.body.dob) ? req.body.dob : null

    try{

        const stmt = `UPDATE stud_profile SET name=?, class=?, department=?, contact=?, hostel=?, dob=? WHERE userID=?`
        
        const rs = await new Promise((resolve, reject)=> connection.query(stmt, [
            name, stud_class, dept, contact, hostel, dob, req.params.id
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


//UPLOAD PROFILE IMAGE
route.put('/profile/picture/:id', upload.single("profile"), verifyTokenAndAuth, async (req, res)=>{
    try{
        const updateProfile = `UPDATE stud_profile SET profile='${req.file.filename}' WHERE userID='${req.params.id}'`

            const rs = await new Promise((resolve, reject)=> connection.query(updateProfile, (err, result)=>{
                if(err)
                    reject(err)
                else
                    resolve(result)
            }))

            return res.status(200).json("PROFILE PICTURE UPDATED")

    }catch(err){
        res.status(500).json(err)
    }
})

//GET PROFILE

route.get('/profile/:id', verifyToken, async(req, res)=>{
    const id = req.params.id;
    try{

        const stmt= "SELECT * FROM stud_profile WHERE userID=?";
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