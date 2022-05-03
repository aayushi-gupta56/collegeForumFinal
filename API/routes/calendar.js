const connection = require('../dbConnection');
const route  = require('express').Router();
const { verifyTokenAndAuth } = require('./verifyToken')

route.post('/:id', verifyTokenAndAuth, async (req,res)=>{
    const event = req.body.event;
    const event_Date = req.body.event_Date;
    const uid = req.params.id;
    try{

        const currentDate = new Date();
        const eid = uid + 
                    currentDate.getFullYear().toString() + 
                    (currentDate.getMonth()+1).toString() + 
                    currentDate.getDate().toString() + 
                    currentDate.getHours().toString() + 
                    currentDate.getMinutes().toString() + 
                    currentDate.getSeconds().toString();
        const stmt = 'INSERT INTO calendar(eid, uid, event, event_Date) VALUES(?,?,?,?)'
        const results = await new Promise((resolve, reject)=>connection.query(stmt, [eid, uid, event, event_Date], (err, result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        })) 
        res.status(200).json(results);

    }catch(err){
        res.status(500).json(err);
    }
})

route.get('/:id', verifyTokenAndAuth, async (req, res)=>{
    const uid = req.params.id;
    try{

        const stmt = `SELECT * FROM calendar WHERE uid=?`
        const results = await new Promise((resolve, reject)=>connection.query(stmt, [uid], (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        }))

        res.status(200).json(results);

    }catch(err){
        res.status(500).json(err);
    }
})

route.delete('/:id/:deleteId', verifyTokenAndAuth, async(req, res)=>{
    const uid = req.params.id
    const event = req.params.deleteId
    try{
        const stmt = 'DELETE from calendar WHERE uid=? AND eid=?'

        const results = await new Promise((resolve, reject)=>connection.query(stmt, [uid, event], (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        }))

        res.status(200).json(results);
    }catch(err){
        res.status(500).json(err);
    }
})

route.get('/recents/:id', verifyTokenAndAuth, async (req, res)=>{
    const uid = req.params.id;
    try{
        let start = new Date()
        let end = new Date()
        end.setDate(start.getDate()+7)
        const stmt = `SELECT * FROM calendar WHERE uid=? AND (event_Date>=? AND event_Date<=?) ORDER BY 'event_Date'`
        const results = await new Promise((resolve, reject)=>connection.query(stmt, [uid, start, end], (err, result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        }))

        res.status(200).json(results);

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = route;