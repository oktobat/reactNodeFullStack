import express from 'express'
import { db } from '../db.js'
import dayjs from 'dayjs'

const boardRouter = express.Router()

boardRouter.post('/notice/write', (req, res)=>{
   const {writer, subject, content} = req.body.board
   const date = dayjs()
   db.query("INSERT INTO noticetbl (subject, writer, date, hit, content) VALUES (?, ?, ?, ?, ?)", [subject, writer, date.format('YYYY-MM-DD'), 0, content], (err, result)=>{
        if (err) {
            throw err
        } else {
            res.send(result)
        }
   })
})

boardRouter.get('/notice/list', (req, res)=>{
    const page = parseInt(req.query.page)
    const itemsPerPage = 10; // 페이지당 아이템 수

    const offset = (page - 1) * itemsPerPage;  // 오프셋 계산

    const countQuery = "SELECT COUNT(*) AS totalCount FROM noticetbl";
    const dataQuery = "SELECT * FROM noticetbl ORDER BY noNo DESC LIMIT ?, ?";

    db.query(countQuery, (err, countResult)=>{
         if (err) {
            res.status(500).send('공지글 가져오기 실패');
            throw err
         } else {
            console.log("카운트 어떻게 생겼니?", countResult)
            const totalCount = countResult[0].totalCount
            db.query(dataQuery, [offset, itemsPerPage], (errData, dataResult)=>{
                if (errData) {
                    res.status(500).send('공지글 가져오기 실패');
                } else {
                    res.send({
                        totalCount : totalCount,
                        data : dataResult
                    })
                }
            })

         }
    })
 })

export default boardRouter;