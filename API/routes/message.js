const router = require("express").Router();
const con = require("../dbConnection");

//add

router.post("/", async (req, res) => {
  const cid = req.body.cid
  const sender = req.body.sender
  const text = req.body.text
  const currentDate = new Date();
  const mid = cid + 
                currentDate.getFullYear().toString() + 
                (currentDate.getMonth()+1).toString() + 
                currentDate.getDate().toString() + 
                currentDate.getHours().toString() + 
                currentDate.getMinutes().toString() + 
                currentDate.getSeconds().toString();

  try {
    
    const stmt = "INSERT INTO messages (mid, cid, senderId, msg) VALUES (?,?,?,?)"

    const result = await new Promise((resolve, reject)=>con.query(stmt, [mid, cid, sender, text], (err, result)=>{
        if(err)
            reject(err)
        else
            resolve(result);
    }))

    const newAdd = await new Promise((resolve,reject)=>con.query(`SELECT * FROM messages WHERE mid=?`,[mid], (err, result)=>{
      if(err)
        reject(err)
      else
        resolve(result)
    }))

    return res.status(200).json(newAdd[0]);



  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
      const stmt = "SELECT * FROM messages WHERE cid=?"
    const messages = await new Promise((resolve, reject) => con.query(stmt, [req.params.conversationId], (err, result)=>{
        if(err)
            reject(err)
        else
            resolve(result)
    }))
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;