import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import {changeType } from '@/store/board'
import { fetchOrder } from '@/store/product'

const MyOrderSectionBlock = styled.div`
h2 { margin:20px 0 }
table { margin-bottom:50px }
table.orderList {
    col:nth-child(1) { width:200px}
    col:nth-child(2) { width:auto }
    thead { th { padding:10px } }
    tbody { td { padding:10px } }
}
`

const MyOrderSection = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orders = useSelector(state=>state.products.orders)

    // 데이터를 orderDate별로 그룹화
    // 0: {orderNo: 51, userNo: 4, orderDate: '2024-05-30T06:44:30.000Z', qty: 2, prNo: 234, …}
    // 1: {orderNo: 52, userNo: 4, orderDate: '2024-05-30T06:44:30.000Z', qty: 4, prNo: 528, …}
    // 2: {orderNo: 53, userNo: 4, orderDate: '2024-05-30T06:44:30.000Z', qty: 6, prNo: 529, …}
    // 3: {orderNo: 54, userNo: 4, orderDate: '2024-05-30T06:56:45.000Z', qty: 2, prNo: 529, …}
    // 4: {orderNo: 55, userNo: 4, orderDate: '2024-05-30T07:34:06.000Z', qty: 1, prNo: 529, …}
    // 5: {orderNo: 56, userNo: 4, orderDate: '2024-05-30T07:35:46.000Z', qty: 1, prNo: 530, …}
    // 6: {orderNo: 57, userNo: 4, orderDate: '2024-05-30T07:37:37.000Z', qty: 1, prNo: 530, …}
    // 7: {orderNo: 58, userNo: 4, orderDate: '2024-05-30T07:37:48.000Z', qty: 1, prNo: 530, …}
    // 8: {orderNo: 59, userNo: 4, orderDate: '2024-05-30T07:38:44.000Z', qty: 1, prNo: 530, …}
    // 9: {orderNo: 60, userNo: 4, orderDate: '2024-05-30T07:43:18.000Z', qty: 1, prNo: 530, …}
    const groupedOrders = orders.reduce((acc, order) => {
        const orderDate = new Date(order.orderDate).toLocaleString(); // 날짜 형식을 원하는 형태로 변환
        if (!acc[orderDate]) {
           acc[orderDate] = [];
        }
        acc[orderDate].push(order);
        return acc;
    }, {});

    // acc = {
    //     '2024-5-30 4:43:18 PM': [
    //         { orderNo: 60, userNo: 4, orderDate: '2024-05-30T07:43:18.000Z', qty: 1, prNo: 530 },
    //         { orderNo: 61, userNo: 5, orderDate: '2024-05-30T07:43:18.000Z', qty: 2, prNo: 531 }
    //     ],
    //     '2024-5-29 8:20:00 PM': [
    //         { orderNo: 62, userNo: 6, orderDate: '2024-05-29T11:20:00.000Z', qty: 1, prNo: 532 }
    //     ],
    //     '2024-5-28 12:35:10 AM': [
    //         { orderNo: 63, userNo: 7, orderDate: '2024-05-28T15:35:10.000Z', qty: 3, prNo: 533 }
    //     ]
    // }

    const user = useSelector(state=>state.members.user)
    const review = useSelector(state=>state.boards.review)

    const [userCompleteReview, setUserCompleteReview] = useState([])

    useEffect(() => {
        if (user) {
            setUserCompleteReview(review.filter(item=>item.writer==user.userId))
            dispatch(fetchOrder(user.userNo))
        }
    }, [dispatch, user.userNo]);

    const handleReviewClick = (orderItem)=>{
        dispatch(changeType("review"))
        navigate("/boardWrite", {state:{ orderItem}})
    }

    return (
        <MyOrderSectionBlock>
            {user ? (
        Object.keys(groupedOrders).length ? (
          <table className="orderList" border="1">
            <colgroup>
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>주문일자</th>
                <th>주문상품</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedOrders).map((orderDate, index) => (
                <tr key={index}>
                  <td>{orderDate}</td>
                  <td>
                    {groupedOrders[orderDate].map((item, ind) => {
                      const isReviewed = userCompleteReview.some((userReview) => userReview.orderNo === item.orderNo);
                      return (
                        <div
                          key={ind}
                          style={{
                            borderBottom: '1px solid #ddd',
                            position: 'relative',
                          }}
                        >
                          <span>
                            <img src={`http://localhost:8001/uploads/${item.photo}`} alt={item.name} />
                          </span>
                          <span>상품명 : {item.name} </span> /{' '}
                          <span>수량 : {item.qty}개 </span> /{' '}
                          <span>
                            금액 : {parseInt(item.qty) * parseInt(item.price)}원{' '}
                          </span>
                          {isReviewed ? (
                            <span
                              style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                marginTop: '-13px',
                                padding: '5px',
                                background: '#eee',
                              }}
                            >
                              리뷰완료
                            </span>
                          ) : (
                            <span
                              style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                marginTop: '-13px',
                                padding: '5px',
                                background: '#eee',
                                cursor: 'pointer',
                              }}
                              onClick={()=>{ handleReviewClick(item) } }
                            >
                              리뷰쓰기
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '30px' }}>
            주문하신 상품이 없습니다.
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center' }}>
          로그인하면 확인하실 수 있습니다. <br />
          <br />
          <br />
          <Link to="/login" style={{ padding: '10px', background: '#ddd' }}>
            로그인
          </Link>
        </div>
      )}
        </MyOrderSectionBlock>
    );
};

export default MyOrderSection;