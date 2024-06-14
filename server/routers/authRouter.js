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

 authRouter.post('/googleLogin', (req, res) => {
    const { googleId, email, name } = req.body;
    const registerDate = dayjs();

    // 이미 등록된 사용자인지 확인하기 위해 데이터베이스에서 해당 이메일로 사용자 조회
    db.query('SELECT * FROM membertbl WHERE userId = ?', [email], (err, result) => {
        if (err) {
            throw err;
        } else {
            // 이미 등록된 사용자인 경우
            if (result.length > 0) {
                const existingUser = result[0];
                // 구글 ID가 이미 존재하는 경우 해당 사용자 정보를 업데이트
                if (!existingUser.googleId) {
                    db.query('UPDATE membertbl SET googleId = ?, loginType = ? WHERE userId = ?', [googleId, 'google', email], (err, updateResult) => {
                        if (err) {
                            throw err;
                        } else {
                            // 업데이트가 성공하면 업데이트된 사용자 정보 반환
                            db.query('SELECT * FROM membertbl WHERE userId = ?', [email], (err, updatedUser) => {
                                if (err) {
                                    throw err;
                                } else {
                                    res.send(updatedUser[0]);
                                }
                            });
                        }
                    });
                } else {
                    db.query('SELECT * FROM membertbl WHERE googleId = ?', [googleId], (err, updatedUser) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send(updatedUser[0]);
                        }
                    });
                }
            } else {
                // 새로운 사용자 등록
                db.query('INSERT INTO membertbl (googleId, userId, userIrum, loginType, registerDate) VALUES (?, ?, ?, ?, ?)', [googleId, email, name, 'google', registerDate.format('YYYY-MM-DD')], (err, insertResult) => {
                    if (err) {
                        throw err;
                    } else {
                        // 새로운 사용자 등록 후 해당 사용자 정보 반환
                        db.query('SELECT * FROM membertbl WHERE userId = ?', [email], (err, newUser) => {
                            if (err) {
                                throw err;
                            } else {
                                res.send(newUser[0]);
                            }
                        });
                    }
                });
            }
        }
    });
});


authRouter.post('/kakaoLogin', (req, res) => {
    const { kakaoId, email, name } = req.body;
    const registerDate = dayjs();

    db.query('SELECT * FROM membertbl WHERE userId = ?', [email], (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                const existingUser = result[0];
                if (!existingUser.kakaoId) {
                    db.query('UPDATE membertbl SET kakaoId = ?, loginType = ? WHERE userId = ?', [kakaoId, 'kakao', email], (err, updateResult) => {
                        if (err) {
                            throw err;
                        } else {
                            // 업데이트가 성공하면 업데이트된 사용자 정보 반환
                            db.query('SELECT * FROM membertbl WHERE userId = ?', [email], (err, updatedUser) => {
                                if (err) {
                                    throw err;
                                } else {
                                    res.send(updatedUser[0]);
                                }
                            });
                        }
                    });
                } else {
                    db.query('SELECT * FROM membertbl WHERE kakaoId = ?', [kakaoId], (err, updatedUser) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send(updatedUser[0]);
                        }
                    });
                }
            } else {
                // 새로운 사용자 등록
                db.query('INSERT INTO membertbl (kakaoId, userId, userIrum, loginType, registerDate) VALUES (?, ?, ?, ?, ?)', [kakaoId, email, name, 'kakao', registerDate.format('YYYY-MM-DD')], (err, insertResult) => {
                    if (err) {
                        throw err;
                    } else {
                        // 새로운 사용자 등록 후 해당 사용자 정보 반환
                        db.query('SELECT * FROM membertbl WHERE userId = ?', [email], (err, newUser) => {
                            if (err) {
                                throw err;
                            } else {
                                res.send(newUser[0]);
                            }
                        });
                    }
                });
            }
        }
    });
});

authRouter.post('/naverLogin', (req, res) => {
    const { naverId, email, name } = req.body;
    const registerDate = dayjs();

    db.query('SELECT * FROM membertbl WHERE userId = ?', [email], (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                const existingUser = result[0];
                if (!existingUser.naverId) {
                    db.query('UPDATE membertbl SET naverId = ?, loginType = ? WHERE userId = ?', [naverId, 'naver', email], (err, updateResult) => {
                        if (err) {
                            throw err;
                        } else {
                            // 업데이트가 성공하면 업데이트된 사용자 정보 반환
                            db.query('SELECT * FROM membertbl WHERE userId = ?', [email], (err, updatedUser) => {
                                if (err) {
                                    throw err;
                                } else {
                                    res.send(updatedUser[0]);
                                }
                            });
                        }
                    });
                } else {
                    db.query('SELECT * FROM membertbl WHERE naverId = ?', [naverId], (err, updatedUser) => {
                        if (err) {
                            throw err;
                        } else {
                            res.send(updatedUser[0]);
                        }
                    });
                }
            } else {
                // 새로운 사용자 등록
                db.query('INSERT INTO membertbl (naverId, userId, userIrum, loginType, registerDate) VALUES (?, ?, ?, ?, ?)', [naverId, email, name, 'naver', registerDate.format('YYYY-MM-DD')], (err, insertResult) => {
                    if (err) {
                        throw err;
                    } else {
                        // 새로운 사용자 등록 후 해당 사용자 정보 반환
                        db.query('SELECT * FROM membertbl WHERE userId = ?', [email], (err, newUser) => {
                            if (err) {
                                throw err;
                            } else {
                                res.send(newUser[0]);
                            }
                        });
                    }
                });
            }
        }
    });
});


export default authRouter;