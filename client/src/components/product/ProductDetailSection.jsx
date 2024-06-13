import React, {useState} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '@/components/product/Modal'
import axios from 'axios'
import {fetchProduct, fetchCart} from '@/store/product'

const serverUrl = import.meta.env.VITE_API_URL;

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

const ProductDetailSection = ({product, category}) => {

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const carts = useSelector(state=>state.products.carts)
   const user = useSelector(state=>state.members.user)
   const currentPage = useSelector(state=>state.products.currentPage)
   const [modalOpen, setModalOpen] = useState({open:false, what:""})
   const [qty, setQty] = useState(1)

   const onReset = ()=>{
      setModalOpen({open:false, what:""})
   }

   const removeProduct = (e, pNo)=>{
      e.preventDefault()
      axios.delete(`${serverUrl}/product/remove`, {params:{prNo:pNo}})
      .then(res=>{
        if (res.data.affectedRows==1) {
            console.log("삭제성공")
            dispatch(fetchProduct(currentPage, category))
            navigate("/product", {state:{page:currentPage, category:category}})
        } else {
            console.log("삭제실패")
        }
      })
      .catch(err=>console.log(err))
   }

   const handleChange = (e)=>{
      let newQty = parseInt(e.target.value)
      if (newQty<1) {
        newQty = 1
      }
      if (newQty>product.inventory) {
          newQty = product.inventory
      }
      setQty(newQty)
   }

   const addToCart = async (no)=>{
    if (user) {
        axios.post(`${serverUrl}/product/cart`, {prNo:no, userNo:user.userNo, qty:qty })
        .then((res)=>{
            if (res.data.affectedRows!=0) {
                console.log("장바구니 담기 성공")
                dispatch(fetchCart(user.userNo))
                setModalOpen({open:true, what:"cart"});
            } else {
                console.log("장바구니 담기 실패")
            }
        })
        .catch(err=>console.log(err))
    } else {
        alert("로그인을 해주세요.")
        const state = { page: 1, category: 'all' };
        sessionStorage.setItem('previousUrl', '/product');
        sessionStorage.setItem('previousState', JSON.stringify(state));
        navigate("/login")
    }
}

    return (
        <ProductDetailSectionBlock className="row"> 
            <h2>{ product.name }</h2>
            <div className="content">
                <div className="photo">
                    <img src={`${serverUrl}/uploads/${product.photo}`} alt={product.name} />
                </div>
                <div className="info">
                    <p>이 상품의 아이디는 { product.prNo }</p>
                    <p>카테고리 : { product.category }</p>
                    <p>가격 : { product.price.toLocaleString() }</p>
                    <p>요약설명 : <span dangerouslySetInnerHTML={{ __html: product.description }} /></p>
                    <p>
                      구매수량 : { product.inventory ? <input id="quantity" type="number" value={qty} onChange={handleChange} /> : <span>품절!</span> }
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
                        <a href="#" onClick={(e)=>{e.preventDefault(); addToCart(product.prNo); }}>장바구니</a>
                        <a href="#" onClick={(e)=>{e.preventDefault(); setModalOpen({open:true, what:"buy"})}}>구매하기</a>
                      </>
                      : ""
                      }
                      { (user && user.userId=='tsalt@hanmail.net') && <Link to="/productModify" state={{ product, category }}>상품수정</Link>}
                      { (user && user.userId=='tsalt@hanmail.net') && <a href="#" onClick={ (e)=>removeProduct(e, product.prNo) }>상품삭제</a>}
                    </div>
                </div>
            </div>
            <Modal modalOpen={modalOpen} onReset={onReset} product={product} qty={qty} />
        </ProductDetailSectionBlock>
    );
};

export default ProductDetailSection;