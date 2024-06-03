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

otherRouter.post('/movie/myMovieLike', (req, res)=>{
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
                const userNo = req.body.userNo
                const deleteQuery = "DELETE FROM movielike WHERE userNo=? AND isLiked=0";
                connection.query(deleteQuery, [userNo], (err, result)=>{
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).send(err);
                        });
                    }
                    
                    const  selectLikeQuery = 'SELECT Count(*) AS count FROM movielike WHERE userNo=? AND isLiked=1';
                    connection.query(selectLikeQuery, [userNo], (err, result)=>{
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                res.status(500).send(err);
                            });
                        }
                        const likeCount = result[0].count;
                        if (likeCount>5) {
                            connection.query("DELETE FROM movielike WHERE userNo=? AND isLiked=1 ORDER BY date ASC LIMIT ?", [userNo, likeCount-5], (err, result)=>{
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        res.status(500).send(err);
                                    });
                                }
                                const selectRecentQuery = `
                                    SELECT * FROM movielike 
                                    WHERE userNo = ?
                                    ORDER BY date DESC 
                                `;
                                connection.query(selectRecentQuery, [userNo], (err, result) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            res.status(500).send(err);
                                        });
                                    }
                                    connection.commit((err) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                res.status(500).send(err);
                                            });
                                        }
                                        connection.release();
                                        res.status(200).send(result);
                                    });
                                });
                            })
                        } else {
                            const selectRecentQuery = `
                                    SELECT * FROM movielike 
                                    WHERE userNo = ?
                                    ORDER BY date DESC 
                                `;
                            connection.query(selectRecentQuery, [userNo], (err, result) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        res.status(500).send(err);
                                    });
                                }
                                connection.commit((err) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            res.status(500).send(err);
                                        });
                                    }
                                    connection.release();
                                    res.status(200).send(result);
                                });
                            });
                        }
                    })
                })
            })
        })
    } catch (err) {
        console.error('싫어요 삭제 실패:', err);
        res.status(500).send('실패');
        if (connection) {
            connection.rollback(() => {
                connection.release();
            });
        }
    }
})

otherRouter.delete('/movie/likeRemove', (req, res)=>{
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

                const {no, userNo} = req.query
                const deleteLikeQuery = `DELETE FROM movielike WHERE no=?`
                connection.query(deleteLikeQuery, [no], (err, result)=>{
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