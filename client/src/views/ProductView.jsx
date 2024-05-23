import React, {useState} from 'react';
import Title from '@/components/layout/Title'
import ProductCategory from '@/components/product/ProductCategory'
import ProductSection from '@/components/product/ProductSection'

const ProductView = () => {

    const [title, setTitle] = useState("all")
    const changeTitle = (value)=>{
        setTitle(value)
    }

    return (
        <div className="row">
            <Title title="Product" />
            <ProductCategory changeTitle={changeTitle} title={title} />
            <ProductSection title={title} />
        </div>
    );
};

export default ProductView;