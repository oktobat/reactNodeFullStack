import React from 'react';
import {useLocation} from 'react-router-dom'
import ProductModify from '@/components/product/ProductModify'

const ProductModifyView = () => {
    const location = useLocation()
    const { product, category } = location.state
    return (
        <div>
            <ProductModify item={product} title={category} />
        </div>
    );
};

export default ProductModifyView;