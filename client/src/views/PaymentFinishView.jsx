import React from 'react';
import PaymentFinishSection from '@/components/product/PaymentFinishSection'
import {useLocation} from 'react-router-dom'

const PaymentFinishView = () => {
    const location = useLocation()
    const {product, path} = location.state
    return (
        <div className="row">
            <PaymentFinishSection product={product} path={path} />
        </div>
    );
};

export default PaymentFinishView;