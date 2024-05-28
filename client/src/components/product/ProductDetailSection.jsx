import React, {useState} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '@/components/product/Modal'

const ProductDetailSectionBlock = styled.div`
  h2 {
    text-align: center;
    font-size: 30px;
    margin: 20px 0;
  }
  .content {
    display: flex;
    .photo {
      width: 300px;
      margin-right: 50px;
    }
    .info {
      flex: 1;
      #quantity { padding:5px;  }
      button {
        background: red;
        color: #fff;
        padding: 10px 20px;
        margin: 10px 0;
      }
      .btn {
        a { padding:10px 20px; background:red; color:#fff; margin:20px 5px;
          &:nth-child(2) { background:blue }
          &:nth-child(3) { background:black }
        }
      }
    }
  }
`

const ProductDetailSection = ({product}) => {

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const carts = useSelector(state=>state.products.carts)
   const user = useSelector(state=>state.members.user)
   const [modalOpen, setModalOpen] = useState({open:false, what:""})
   const [qty, setQty] = useState(1)

   const onReset = ()=>{
      setModalOpen({open:false, what:""})
   }

    return (
        <ProductDetailSectionBlock className="row"> 
            <h2>{ product.name }</h2>
            <div className="content">
                <div className="photo">
                    <img src={`http://localhost:8001/uploads/${product.photo}`} alt={product.name} />
                </div>
                <div className="info">
                    <p>이 상품의 아이디는 { product.prNo }</p>
                    <p>카테고리 : { product.category }</p>
                    <p>가격 : { product.price.toLocaleString() }</p>
                    <p>요약설명 : <span dangerouslySetInnerHTML={{ __html: product.description }} /></p>
                    <p>
                      구매수량 : { product.inventory ? <input id="quantity" type="number" value={qty} /> : <span>품절!</span> }
                    </p>
                    <p>
                      고객만족도 : <span style={{marginRight:'10px'}}>{Math.round(product.averageRating*100)/100}점</span>
                      { 
                          Array.from({length:5}).map((_, index)=>(
                            <span 
                            key={index} 
                            style={{ color: index < product.averageRating ? 'red' : '#ddd'}}
                            >★</span>
                          ))
                      }
                    </p>
                    <div className="btn">
                    { product.inventory ?
                      <>
                        <a href="#" onClick={(e)=>{e.preventDefault();  }}>장바구니</a>
                        <a href="#" onClick={(e)=>{e.preventDefault(); setModalOpen({open:true, what:"buy"})}}>구매하기</a>
                      </>
                      : ""
                      }
                      { (user && user.userId=='tsalt@hanmail.net') && <Link to="/productModify" state={{ product  }}>상품수정</Link>}
                      { (user && user.userId=='tsalt@hanmail.net') && <a href="#" onClick={ (e)=>removeProduct(e, product.prNo) }>상품삭제</a>}
                    </div>
                </div>
            </div>
            <Modal modalOpen={modalOpen} onReset={onReset} product={product} qty={qty} />
        </ProductDetailSectionBlock>
    );
};

export default ProductDetailSection;