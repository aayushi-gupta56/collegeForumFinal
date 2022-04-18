const router = require("express").Router();
const con = require('../dbConnection');

//new conv
router.post("/", async (req, res) => {
  let partners = [req.body.senderId, req.body.recieverId];
  partners.sort();
  const cid = partners[0] + partners[1];
  try {
    
    const stmt = "INSERT INTO conversations (cid, memId_1, memId_2) VALUES (?,?,?)"

    const result = await new Promise((resolve, reject)=>con.query(stmt, [cid, partners[0], partners[1]], (err, result)=>{
        if(err)
            reject(err)
        else
            resolve(result);
    }))

    return res.status(200).json("CONVO CREATED SUCCESSFULLY..")


  } catch (err) {
    res.status(500).json(err);
  }
});





//get conv of a user

router.get("/:id", async (req, res) => {
   try {

    const stmt = `SELECT * FROM conversations WHERE memId_1=? OR memId_2=?`
    const ans = await new Promise((resolve, reject) => con.query(stmt, [req.params.id, req.params.id], (err, result)=>{
        if(err)
            reject(err)
        else
            resolve(result);
     }))

    res.status(200).json(ans);
   } catch (err) {
     res.status(500).json(err);
   }
});


// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
   try {
     
        const stmt = `SELECT * FROM conversations WHERE (memId_1=? AND memId_2=?) OR (memId_1=? AND memId_2=?)`
        const ans = await new Promise((resolve, reject) => con.query(stmt, 
                [req.params.firstUserId,req.params.secondUserId,req.params.secondUserId,req.params.firstUserId], 
                (err, result)=>{
                    if(err)
                        reject(err)
                    else
                        resolve(result);
        }))

        res.status(200).json(ans[0]);


   } catch (err) {
     res.status(500).json(err);
   }
});

module.exports = router;