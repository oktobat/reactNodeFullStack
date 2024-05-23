import React from 'react';
import PaymentSection from '@/components/product/PaymentSection'
import {useLocation} from 'react-router-dom'

const PaymentView = () => {
 
    const location = useLocation()
    const { product } = location.state

    return (
        <div className="row">
            <h2 style={{ fontSize:'30px', textAlign:'center', padding:'50px 0 20px'}}>주문결제</h2>
            <PaymentSection product={product} />
        </div>
    );
};

export default PaymentView;