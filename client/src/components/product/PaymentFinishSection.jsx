import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { fetchCart, fetchOrder } from '@/store/product'

const serverUrl = import.meta.env.VITE_API_URL;

const PaymentFinishSection = ({product, path}) => {
    console.log("구매구매상품", product)
    const [orderProduct, setOrderProduct] = useState(null)
    const dispatch = useDispatch()    
    const user = useSelector(state=>state.members.user)

    useEffect(() => {
        if (path === 'cart') {
            setOrderProduct(product);
        } else {
            setOrderProduct([{prNo:product[0].product.prNo, qty:product[0].qty, userNo:user.userNo}]);
        }
    }, [path, product, user?.userNo]);

    useEffect(() => {
        if (orderProduct !== null) {
            axios.post(`${serverUrl}/product/order`, { orderProduct })
                .then(res => {
                    console.log("꼭찍", res);
                    if (res.data=="성공") {
                        console.log("결제, 주문추가, 장바구니삭제, 재고수정 성공");
                        console.log(user.userNo)
                        dispatch(fetchOrder(user.userNo));
                        dispatch(fetchCart(user.userNo));
                        dispatch(fetchProduct(1, 'all'));
                    } else {
                        console.log("결제, 주문추가, 장바구니삭제, 재고수정 실패");
                    }
                })
                .catch(err => console.log(err));
        }
    }, [orderProduct, dispatch, user.userNo]);


    return (
        <div>
            <p style={{ fontSize:'50px', margin:'50px 0', textAlign:'center'}}>결제가 완료되었습니다. </p>
            <p style={{ fontSize:'30px', margin:'50px 0', textAlign:'center'}}>
                <Link to="/product" style={{ padding:'10px', background:'red'}}>계속쇼핑</Link>
            </p>
        </div>
    );
};

export default PaymentFinishSection;