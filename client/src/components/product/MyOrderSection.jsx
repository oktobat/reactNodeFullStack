import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import {changeType } from '@/store/board'

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
    const user = useSelector(state=>state.members.user)
    const review = useSelector(state=>state.boards.review)

    const [userCompleteReview, setUserCompleteReview] = useState([])

    useEffect(() => {
        if (user) {
            setUserCompleteReview(review.filter(item=>item.writer==user.userId))
        }
    }, []);

    const handleReviewClick = (orderKey, product)=>{
        dispatch(changeType("review"))
        navigate("/boardWrite", {state:{ orderKey, product}})
    }

    return (
        <MyOrderSectionBlock>
            {
                user ? (
                    orders.length ? 
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
                            {
                                orders.map((items, index)=>(
                                    <tr key={index}>
                                        <td>{items.key}</td>
                                        <td>
                                            {
                                                Object.keys(items).map((item, ind)=>{
                                                    if (item==='key') return null;
                                                    const value = items[item];
                                                    const isReviewed = userCompleteReview.some(
                                                        (userReview)=> userReview.orderKey===items.key && userReview.product.id === value.id
                                                    )
                                                    return (
                                                        <div key={ind} style={{ borderBottom: '1px solid #ddd', position: 'relative' }}>
                                                           <span>
                                                             <img src={value.photo} alt={value.name} />
                                                           </span>
                                                           <span>상품명 : {value.name} </span> / 
                                                           <span>수량 : {value.quantity}개 </span> /
                                                           <span>금액 : {parseInt(value.quantity) * parseInt(value.price)}원 </span>  
                                                           {
                                                            isReviewed ? 
                                                            <span style={{
                                                                position: 'absolute', right: '10px', top: '50%',
                                                                marginTop: '-13px', padding: '5px', background: '#eee',
                                                            }}>리뷰완료</span>
                                                            : 
                                                            <span onClick={ () => handleReviewClick(items.key, value)  } style={{
                                                                position: 'absolute', right: '10px', top: '50%',
                                                                marginTop: '-13px', padding: '5px', background: '#eee',
                                                                cursor:'pointer'
                                                            }}>리뷰쓰기</span>
                                                           }
                                                        </div>
                                                    );
                                                })
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div style={{textAlign:'center', fontSize:'30px'}}>주문하신 상품이 없습니다.</div>
                ) : 
                <div style={{textAlign:'center'}}>
                    로그인하면 확인하실 수 있습니다. <br /><br /><br />
                    <Link to="/login" style={{ padding:'10px', background:'#ddd'}}>로그인</Link>
                </div>
            }
        </MyOrderSectionBlock>
    );
};

export default MyOrderSection;