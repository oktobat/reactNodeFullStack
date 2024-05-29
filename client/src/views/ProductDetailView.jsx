import React from 'react';
import { useLocation } from 'react-router-dom'
import ProductDetailSection from '@/components/product/ProductDetailSection'

const ProductDetailView = () => {
    const location = useLocation()
    const { item, title } = location.state
    return (
        <ProductDetailSection product={item} category={title}  className="row" />
    );
};

export default ProductDetailView;