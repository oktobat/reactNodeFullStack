import express from 'express'
import { db } from '../db.js'
import dayjs from 'dayjs'

const otherRouter = express.Router()

otherRouter.post('/movie/likeList', (req, res)=>{
   const userNo = req.body.userNo
   db.query('SELECT * FROM movielike WHERE userNo=?', [userNo], (err, result)=>{
        if (err) {
            throw err
        } else {
            res.send(result)
        }
   })
})

export default otherRouter;