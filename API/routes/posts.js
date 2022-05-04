const route = require('express').Router();
const { verifyTokenAndAuth, verifyToken } = require('./verifyToken');
const con = require('../dbConnection');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './public/posts')
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
})

//CREATE POST
route.post('/:id', upload.single("photo"), verifyTokenAndAuth, async(req, res)=>{
    const userID = req.params.id;
    const photo = req.file ? req.file.filename : null;
    try{

        const stmt = "SELECT userID, isAdmin from users WHERE (userID=? AND isAdmin=?)"
        const isPresent = await new Promise((resolve, reject)=> con.query(stmt, [userID, 0], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        })) 

        if(isPresent.length==0)
            return res.status(400).json("SORRY..Can't locate resource you looking for :(")

        const currentDate = new Date();
        const pid = userID + 
                    currentDate.getFullYear().toString() + 
                    (currentDate.getMonth()+1).toString() + 
                    currentDate.getDate().toString() + 
                    currentDate.getHours().toString() + 
                    currentDate.getMinutes().toString() + 
                    currentDate.getSeconds().toString();
                    
        const stmt1 = "INSERT INTO posts(pid, uid, caption, photo) VALUES(?,?,?,?)"
        const results = await new Promise((resolve, reject)=> con.query(stmt1, 
            [pid, userID, req.body.caption, photo],
            (err, result)=>{
                if(err)
                    reject(err)
                    
                else
                    resolve(result)
            }))
        
        const tags = req.body.tags
        const tagsArray = tags.split(",")
        
        if(results.affectedRows !== 0){
            tagsArray.forEach(async (item)=>{
                   
                if(item!==''){
                    const stm = "INSERT INTO posts_tags VALUES (?,?)"
                    const resTags = await new Promise((resolve, reject)=>con.query(stm, [pid, item], (err, result)=>{
                        if(err)
                            reject(err)
                        else
                            resolve(result)
                    }))
                }

            })
        }

        return res.status(200).json("POSTED SUCCESSFULLY.")

    }catch(err){
        res.status(500).json(err);
    }
})


//GET ALL POSTS
route.get('/find/:id', verifyToken, async(req,res)=>{
    const userID = req.params.id;
    try{

        const isClub = "SELECT * FROM users WHERE userID=?"
        const isClubQ = await new Promise((resolve, reject)=>con.query(isClub, [userID], (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        }))

        let table;

        if(isClubQ[0].isClub==1){
            table = "clubs_profile"
        }

        else
            table = "stud_profile"

        const stmt = `SELECT * FROM posts as p INNER JOIN ${table} as pcs ON p.uid=pcs.userID WHERE p.uid=? ORDER BY p.createdAt DESC`;
        const results = await new Promise((resolve, reject)=>con.query(stmt, [userID], (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result);
        }))

        res.status(200).json(results)
        
    }catch(err){
        res.status(500).json(err);
    }
})

//GET A SINGLE POST
route.get('/find', verifyToken, async(req, res)=>{

      const query = req.query.tag;  
      try{
          const stmt = `SELECT * FROM posts AS p INNER JOIN posts_tags AS pt ON p.pid=pt.pid WHERE tags LIKE '%${query}%'`
          const results = await new Promise((resolve, reject)=>con.query(stmt, (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result);
        })) 

        res.status(200).json(results);
     }catch(err){
         res.status(500).json(err);
     }
})


//DELETE A POST
route.delete('/:id/:postID',verifyTokenAndAuth, async(req, res)=>{
    const postID = req.params.postID;
    try{

        const stmt = "DELETE FROM posts WHERE pid=?"

        const results = await new Promise((resolve, reject)=>con.query(stmt, [postID], (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        }))

        if(results.affectedRows !== 0)
            res.status(200).json("DELETED");

        else
            res.status(200).json("NO SUCH POST :(");

    }catch(err){
        console.log(err);
    }
})


module.exports = route;
