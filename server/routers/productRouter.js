import express from 'express'
import { db } from '../db.js'
import multer from "multer"     // multer 미들웨어를 사용하여 파일 업로드를 처리함
import dayjs from 'dayjs'

const productRouter = express.Router()

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // 파일이 저장될 폴더 경로
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // 파일명 설정
    },
});
const upload = multer({ storage: storage });

// 한개의 파일을 업로드할 때는 upload.single("photo")
// 여러개 파일을 업로드할 때는 upload.array("photos", 5)
productRouter.post("/register", upload.single("photo"), (req, res)=>{
    const { category, name, price, description, inventory} = req.body
    const photo = req.file   // 
    db.query("INSERT INTO producttbl (category, name, price, description, inventory, photo, reviewCount, averageRating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [category, name, price, description, inventory, photo.filename, 0, 0], (err, result)=>{
        if (err) {
            res.status(500).send("상품등록 실패");
            throw err
        } else {
            res.send(result)
        }
    })
})

productRouter.get("/list", (req, res)=>{
    const page = parseInt(req.query.page)
    const category = req.query.category

    const itemsPerPage = 12; // 페이지당 아이템 수
    const offset = (page - 1) * itemsPerPage;  // 오프셋 계산

    let countQuery = '';
    let dataQuery = '';
    let queryParams1 = [];
    let queryParams2 = [];
    if (category=='all') {
        countQuery = 'SELECT COUNT(*) AS totalCount FROM producttbl';
        queryParams1 = []
        dataQuery = 'SELECT * FROM producttbl ORDER BY prNo DESC LIMIT ?, ?';
        queryParams2 = [offset, itemsPerPage];
    } else {
        countQuery = 'SELECT COUNT(*) AS totalCount FROM producttbl WHERE category=?';
        queryParams1 = [category]
        dataQuery = 'SELECT * FROM producttbl WHERE category=? ORDER BY prNo DESC LIMIT ?, ?';
        queryParams2 = [category, offset, itemsPerPage];
    }

    db.query(countQuery, queryParams1, (err, countResult)=>{
        if (err) {
            res.status(500).send('레코드 카운트 가져오기 실패');
            throw err
        } else {
            console.log("레코드 카운트 : ", countResult)
            const totalCount = countResult[0].totalCount
            db.query(dataQuery, queryParams2, (errData, dataResult)=>{
                if (errData) {
                    res.status(500).send('상품목록 가져오기 실패');
                    throw errData
                } else {
                    console.log(dataResult)
                    res.send({
                        totalCount : totalCount,
                        data : dataResult
                    })
                }
            })
        }
    })
})

productRouter.put("/modify", upload.single("photo"), (req, res)=>{
    const {prNo, category, name, price, description, inventory} = req.body
    const photo = req.file
    const query = `UPDATE producttbl 
                   SET category=?, name=?, price=?, description=?, inventory=?, photo=? 
                   WHERE prNo=?`
    const queryparam = [category, name, price, description, inventory, photo.filename, prNo]
    db.query(query, queryparam, (err, result)=>{
        if (err) {
            res.status(500).send("상품정보 수정 실패");
            throw err
        } else {
            res.send(result)
        }
    })
})

productRouter.delete("/remove", (req, res)=>{
    const prNo = req.query.prNo
    db.query("DELETE FROM producttbl WHERE prNo=?", [prNo], (err, result)=>{
        if (err) {
            res.status(500).send("상품 삭제 실패");
            throw err
        } else {
            res.send(result)
        }
    })
})

productRouter.post("/cart", (req, res)=>{
  const {userNo, prNo, qty} = req.body

  const query = `
                INSERT INTO cart (userNo, prNo, qty) VALUES (?, ?, ?)
                ON DUPLICATE KEY 
                UPDATE qty = qty + VALUES(qty)
                `

  db.query(query, [userNo, prNo, qty], (err, cartResult)=>{
        if (err) {
            res.status(500).send("장바구니 담기 실패");
            throw err
        } else {
            res.send(cartResult)
        }
  })
})

productRouter.get("/cartList", (req, res)=>{
   const userNo = req.query.no

   const query = `
                SELECT c.cartNo, c.prNo, c.userNo, c.qty, p.name, p.price, p.photo, p.inventory 
                FROM cart c
                JOIN producttbl p
                ON c.prNo = p.prNo
                WHERE c.userNo=? 
                 `

   db.query(query, [userNo], (err, cartResult)=>{
        if (err) {
            res.status(500).send("장바구니 검색 실패");
            throw err
        } else {
            res.send(cartResult)
        }
   })
})

productRouter.put("/cartQtyUpdate", (req, res)=>{
    const {cartNo, qty} = req.body
    db.query("UPDATE cart SET qty=? WHERE cartNo=?", [qty, cartNo], (err, result)=>{
        if (err) {
            res.status(500).send("장바구니 수량 수정 실패");
            throw err
        } else {
            res.send(result)
        }
    })
})

productRouter.delete("/cartItemRemove", (req, res)=>{
    const cartNo = req.query.cartNo
    db.query("DELETE FROM cart WHERE cartNo=?", [cartNo], (err, result)=>{
        if (err) {
            res.status(500).send("장바구니 아이템 삭제 실패");
            throw err
        } else {
            res.send(result)
        }
    })
})

productRouter.post('/order', (req, res) => {
    let connection;
    try {
        connection = db.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                res.status(500).send('실패');
                return;
            }

            connection.beginTransaction((err) => {
                if (err) {
                    console.error('Error beginning transaction:', err);
                    res.status(500).send('실패');
                    connection.release();  // connection 자원 반납
                    return;
                }

                const orderProduct = req.body.orderProduct;
                // 상세페이지 구매하기 : [{ prNo, qty, userNo }]
                // 장바구니 페이지 : [ {cartNo, userNo, qty, prNo, name, photo, inventory }, { }... ]
                const orderDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
                const orderQuery = 'INSERT INTO `order` (userNo, orderDate, prNo, qty) VALUES (?, ?, ?, ?)';
                const deleteCartQuery = 'DELETE FROM `cart` WHERE cartNo=?';
                const updateInventoryQuery = 'UPDATE `producttbl` SET inventory = inventory - ? WHERE prNo = ?';

                const promises = orderProduct.map((item) => {
                    const { cartNo, userNo, prNo, qty } = item;
                    return new Promise((resolve, reject) => {
                        connection.query(orderQuery, [userNo, orderDate, prNo, qty], (err, orderResult) => {
                            if (err) {
                                console.error('주문 목록 추가 실패:', err);
                                reject('주문 목록 추가 실패');
                            } else {
                                console.log("주문 성공")
                                connection.query(deleteCartQuery, [cartNo], (err, deleteResult) => {
                                    if (err) {
                                        console.error('장바구니 항목 삭제 실패:', err);
                                        reject(err);
                                    } else {
                                        console.log("장바구니 삭제 성공")
                                        connection.query(updateInventoryQuery, [qty, prNo], (err, updateResult) => {
                                            if (err) {
                                                console.error('재고 감소 실패:', err);
                                                reject(err);
                                            } else {
                                                console.log("주문 성공, 장바구니 항목 삭제 및 재고 감소 성공");
                                                resolve();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                });

                Promise.all(promises)  // 여러 개의 프로미스를 동시에 처리하고, 모든 프로미스가 완료될 때까지 기다린 후에 결과를 반환하는 메서드.
                    .then(() => {
                        connection.commit((err) => {
                            if (err) {
                                console.error('Error committing transaction:', err);
                                res.status(500).send('실패');
                                connection.rollback(() => {
                                    connection.release();
                                });
                                return;
                            }
                            console.log('Transaction successfully committed.');
                            connection.release();
                            res.send('성공');
                        });
                    })
                    .catch((err) => {
                        console.error('Error in Promise.all:', err);
                        res.status(500).send('실패');
                        connection.rollback(() => {
                            connection.release();
                        });
                    });
            });
        });
    } catch (err) {
        console.error('주문 실패:', err);
        res.status(500).send('실패');
        if (connection) {
            connection.rollback(() => {
                connection.release();
            });
        }
    }
});

productRouter.get("/myOrderList", (req, res)=>{
   const userNo = req.query.no
   const query = `
                SELECT o.orderNo, o.userNo, o.orderDate, o.qty, p.prNo, p.name, p.price, p.photo 
                FROM  \`order\` o
                JOIN producttbl p
                ON o.prNo = p.prNo
                WHERE o.userNo = ?
                `
   db.query(query, [userNo], (err, result)=>{
        if (err) {
            res.status(500).send("마이주문 목록 검색 실패");
            throw err
        } else {
            res.send(result)
        }
   })
})

export default productRouter;