import express from 'express'
import { db } from '../db.js'
import dayjs from 'dayjs'

const authRouter = express.Router()

authRouter.post('/join', (req, res)=>{
   const {userId, userPw, userIrum, handphone, zipCode, addr1, addr2 } = req.body.addMember
   const registerDate = dayjs()
   db.query("INSERT INTO membertbl (userId, userPw, userIrum, handphone, zipCode, addr1, addr2, registerDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [userId, userPw, userIrum, handphone, zipCode, addr1, addr2, registerDate.format('YYYY-MM-DD')], (err, result)=>{
        if (err) {
            throw err
        } else {
            res.send(result)
        }
   })
})

authRouter.get('/idcheck', (req, res)=>{
    const userId = req.query.userId
    db.query("SELECT * FROM membertbl WHERE userId=?", [userId], (err, result)=>{
        if (err) {
            throw err
        } else {
            res.send(result)
        }
    })
 })

 authRouter.get('/login', (req, res)=>{
    const {userId, userPw} = req.query
    db.query("SELECT * FROM membertbl WHERE userId=? AND userPw=?", [userId, userPw], (err, result)=>{
        if (err){
            throw err
        } else {
            res.send(result)
        }
    })
})

authRouter.get('/refresh', (req, res)=>{
    const userNo = req.query.userNo
    db.query("SELECT * FROM membertbl WHERE userNo=?", [userNo], (err, result)=>{
        if (err){
            throw err
        } else {
            res.send(result)
        }
    })
})

authRouter.put('/modify', (req, res)=>{
    const {userNo, userPw, userIrum, handphone, zipCode, addr1, addr2 } = req.body.userInfo
    db.query("UPDATE membertbl SET userPw=?, userIrum=?, handphone=?, zipCode=?, addr1=?, addr2=? WHERE userNo=?", [userPw, userIrum, handphone, zipCode, addr1, addr2, userNo], (err, result)=>{
         if (err) {
             throw err
         } else {
             res.send(result)
         }
    })
 })

 authRouter.delete('/remove', (req, res)=>{
    const userNo = req.query.userNo
    db.query("DELETE FROM membertbl WHERE userNo=?", [userNo], (err, result)=>{
         if (err) {
             throw err
         } else {
             res.send(result)
         }
    })
 })

export default authRouter;