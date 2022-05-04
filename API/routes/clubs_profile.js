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
    const lead = req.body.lead ? req.body.lead : null
    const dept = (req.body.department) ? req.body.department : null
    const staff = (req.body.faculty) ? req.body.faculty : null
    const obj = (req.body.objective) ? req.body.objective : null
    const contact = (req.body.contact) ? req.body.contact : null
    const alternate = (req.body.alternate) ? req.body.alternate : null

    try{

        stmt = `UPDATE clubs_profile SET name=?, lead=?, department=?, faculty=?, objective=?, contact=?, alternate_Contact=? WHERE userID=?`
        
        const rs = await new Promise((resolve, reject)=> connection.query(stmt, [
            name, lead, dept, staff, obj, contact, alternate, req.params.id
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


//UPDATE NEW PROFILE PICTURE
route.put('/profile/picture/:id', upload.single("profile"), verifyTokenAndAuth, async (req, res)=>{
    try{
        const updateProfile = `UPDATE clubs_profile SET profile='${req.file.filename}' WHERE userID='${req.params.id}'`

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