import React from 'react';
import PaymentFinishSection from '@/components/product/PaymentFinishSection'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'

const PaymentFinishView = () => {
    const user = useSelector(state=>state.members.user)
    const location = useLocation()
    const {product} = location.state
    return (
        <div className="row">
            <PaymentFinishSection userKey={user.key} product={product} />
        </div>
    );
};

export default PaymentFinishView;