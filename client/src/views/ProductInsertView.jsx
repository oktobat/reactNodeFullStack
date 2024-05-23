import React from 'react';
import Title from '@/components/layout/Title'
import ProductInsertSection from '@/components/product/ProductInsertSection'

const ProductInsertView = () => {
    return (
        <div>
            <Title title="상품등록" />
            <ProductInsertSection />
        </div>
    );
};

export default ProductInsertView;