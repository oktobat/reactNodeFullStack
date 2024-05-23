import React from 'react';
import styled from 'styled-components'

const ProductCategoryBlock = styled.div`
    display: flex;
    justify-content: center;
    button {
        width: 100px;
        height: 40px;
        margin: 0 20px;
        background: blue;
        color: #fff;
        &.on {
          background: red;
        }
      }
`

const ProductCategory = ({changeTitle, title}) => {
    const category = ['all', 'woman', 'man', 'underwear', 'kids']
    return (
        <ProductCategoryBlock>
            {
                category.map((item, index)=>(
                    <button key={index} type="button" onClick={()=>changeTitle(item)} className={ title==item && "on" }>{item}</button>
                ))
            }
        </ProductCategoryBlock>
    );
};

export default ProductCategory;