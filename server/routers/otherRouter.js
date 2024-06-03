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

otherRouter.post('/movie/likeToggle', (req, res)=>{
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

                const {movie, userNo} = req.body
                const date = dayjs()
                const insertLikeQuery = `Insert Into 
                                movielike (userNo, movieId, movieTitle, moviePhoto, isLiked, date) 
                                Values (?, ?, ?, ?, 1, ?)
                                On Duplicate Key 
                                Update isLiked = Not isLiked
                                `
                connection.query(insertLikeQuery, [userNo, movie.id, movie.title, movie.poster_path, date.format("YYYY-MM-DD HH:mm:ss")], (err, result)=>{
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).send(err);
                        });
                    }
                    if (result.affectedRows!=0) {
                        const  selectLikeQuery = 'SELECT * FROM movielike WHERE userNo=?';
                        connection.query(selectLikeQuery, [userNo], (err, result)=>{
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    res.status(500).send(err);
                                });
                            }
                            connection.commit((err)=>{
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        res.status(500).send(err);
                                    });
                                }
                                console.log("결과", result)
                                connection.release();
                                res.send(result);
                            })
                        })
                    } else {
                        connection.rollback(() => {
                            connection.release();
                            res.status(500).send('좋아요 테이블 업데이트 실패');
                        });
                    }
                })
            })
        })
    } catch (err) {
        console.error('좋아요 수정 실패:', err);
        res.status(500).send('실패');
        if (connection) {
            connection.rollback(() => {
                connection.release();
            });
        }
    }
})

export default otherRouter;