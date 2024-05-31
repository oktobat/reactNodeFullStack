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

boardRouter.get("/notice/hit", (req, res)=>{
    const noNo = req.query.no
    const hit = parseInt(req.query.hit)
    db.query("UPDATE noticetbl SET hit=? WHERE noNo=?", [hit+1, noNo], (err, result)=>{
        if (err) {
            res.status(500).send("수정 실패")
        } else {
            res.send(result)
        }
    })
})

boardRouter.post("/notice/modify", (req, res)=>{
    const {noNo, subject, content } = req.body.board
    db.query("UPDATE noticetbl SET subject=?, content=? WHERE noNo=?", [subject, content, noNo], (err, result)=>{
        if (err) {
            res.status(500).send("수정 실패")
        } else {
            res.send(result)
        }
    })
})

boardRouter.get("/notice/remove", (req, res)=>{
    const noNo = req.query.no
    db.query("DELETE FROM noticetbl WHERE noNo=?", [noNo], (err, result)=>{
        if (err) {
            res.status(500).send("실패")
        } else {
            res.send(result)
        }
    })
})


boardRouter.post('/review/write', (req, res)=>{
    let connection;
    try {
        connection = db.getConnection((err, connection)=>{
            if (err) {
                console.error('Error getting connection from pool:', err);
                res.status(500).send('실패');
                return;
            }
            connection.beginTransaction((err)=>{
                if (err) {
                    console.error('Error beginning transaction:', err);
                    res.status(500).send('실패');
                    connection.release();  // connection 자원 반납
                    return;
                }
                const { subject, content, rating, prNo, writer, orderNo } = req.body
                const date = dayjs()
                const reviewQuery = "INSERT INTO reviewtbl (subject, content, rating, prNo, writer, date, hit, orderNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
                connection.query(reviewQuery, [subject, content, rating, prNo, writer, date.format('YYYY-MM-DD'), 0, orderNo], (err, result)=>{
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).send(err);
                        });
                    }
                    if (result.affectedRows==1) {
                        const updateProductQuery = `
                                                    UPDATE producttbl 
                                                    SET reviewCount = reviewCount + 1, 
                                                        averageRating = (SELECT AVG(rating) FROM reviewtbl WHERE prNo = ?) 
                                                    WHERE prNo = ?
                                                `;
                        connection.query(updateProductQuery, [prNo, prNo], (err, result)=>{
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    res.status(500).send(err);
                                });
                            }
                            connection.commit(err=>{
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        res.status(500).send(err);
                                    });
                                }
    
                                connection.release();
                                res.send(result);
                            })
                        })                        
                    } else {
                        connection.rollback(() => {
                            connection.release();
                            res.status(500).send('리뷰 추가 실패');
                        });
                    }
                })
            })
        })
    } catch (err) {
        console.error('주문 실패:', err);
        res.status(500).send('실패');
        if (connection) {
            connection.rollback(() => {
                connection.release();
            });
        }
    }
 })

boardRouter.get('/review/list', (req, res)=>{
    const page = parseInt(req.query.page)
    const itemsPerPage = 10; // 페이지당 아이템 수

    const offset = (page - 1) * itemsPerPage;  // 오프셋 계산

    const countQuery = "SELECT COUNT(*) AS totalCount FROM reviewtbl";
    const dataQuery = "SELECT * FROM reviewtbl ORDER BY reNo DESC LIMIT ?, ?";

    db.query(countQuery, (err, countResult)=>{
         if (err) {
            res.status(500).send('리뷰글 가져오기 실패');
            throw err
         } else {
            console.log("카운트 어떻게 생겼니?", countResult)
            const totalCount = countResult[0].totalCount
            db.query(dataQuery, [offset, itemsPerPage], (errData, dataResult)=>{
                if (errData) {
                    res.status(500).send('리뷰글 가져오기 실패');
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

 boardRouter.get("/review/hit", (req, res)=>{
    const reNo = req.query.no
    const hit = parseInt(req.query.hit)
    db.query("UPDATE reviewtbl SET hit=? WHERE reNo=?", [hit+1, reNo], (err, result)=>{
        if (err) {
            res.status(500).send("수정 실패")
        } else {
            res.send(result)
        }
    })
})

boardRouter.post("/review/modify", (req, res)=>{
    const {reNo, subject, content, rating } = req.body
    db.query("UPDATE reviewtbl SET subject=?, content=?, rating=? WHERE reNo=?", [subject, content, rating, reNo], (err, result)=>{
        if (err) {
            res.status(500).send("수정 실패")
        } else {
            res.send(result)
        }
    })
})


boardRouter.get("/review/remove", (req, res)=>{
    const reNo = req.query.no
    db.query("DELETE FROM reviewtbl WHERE reNo=?", [reNo], (err, result)=>{
        if (err) {
            res.status(500).send("실패")
        } else {
            res.send(result)
        }
    })
})

export default boardRouter;