import React from 'react';
import Title from '@/components/layout/Title'
import MyOrderSection from '@/components/product/MyOrderSection'

const MyOrderView = () => {
    return (
        <div className="row">
            <Title title="My Order List" />
            <MyOrderSection />
        </div>
    );
};

export default MyOrderView;