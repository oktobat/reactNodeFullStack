import express from 'express'
import { db } from '../db.js'

const authRouter = express.Router()

authRouter.post('/join', (req, res)=>{
   const {userId, userPw, userIrum, handphone, zipCode, addr1, addr2 } = req.body.addMember
   const addr = `${addr1} ${addr2}`;
   db.query("INSERT INTO membertbl (userId, userPw, userIrum, handphone, zipCode, addr) VALUES (?, ?, ?, ?, ?, ?)", [userId, userPw, userIrum, handphone, zipCode, addr], (err, result)=>{
        if (err) {
            throw err
        } else {
            res.send(result)
        }
   })
})

authRouter.post('/idcheck', (req, res)=>{
    const userId = req.body.userId
    db.query("SELECT * FROM membertbl WHERE userId=?", [userId], (err, result)=>{
        if (err) {
            throw err
        } else {
            res.send(result)
        }
    })
 })


export default authRouter;