import React, {useState, useEffect} from 'react';
import Title from '@/components/layout/Title'
import ProductCategory from '@/components/product/ProductCategory'
import ProductSection from '@/components/product/ProductSection'
import { useLocation } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { fetchProduct, setPage } from '@/store/product'

const ProductView = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    
    const {page, category } = location.state
    const [title, setTitle] = useState("all")
    const changeTitle = (value)=>{
        setTitle(value)
        dispatch(setPage(1))
        dispatch(fetchProduct(1, value))
    }

    useEffect(()=>{
        dispatch(setPage(page))
        dispatch(fetchProduct(page, category))
    }, [])

    return (
        <div className="row">
            <Title title="Product" />
            <ProductCategory changeTitle={changeTitle} title={title} />
            <ProductSection title={title} />
        </div>
    );
};

export default ProductView;