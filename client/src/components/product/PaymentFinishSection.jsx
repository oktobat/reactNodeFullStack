import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import { useDispatch} from 'react-redux'

const PaymentFinishSection = ({userKey, product}) => {
    
    const dispatch = useDispatch()    

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