import React, {useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { BsCartPlusFill, BsCartPlus  } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom'
import { setPage, fetchProduct } from '@/store/product'

const ProductSectionBlock = styled.div``

const UlBlock = styled.ul`
    border: 0px solid #000;
    display: flex;
    flex-wrap: wrap;
    list-style:none; 
    margin-top:50px; 
`
const ListBlock = styled.li`
    flex: 0 0 21%;
    margin: 20px 2%;
`

const LoadingBlock = styled.div`
    display:flex; justify-content:center; 
    margin:100px 0; 
    .loadIcon {
        font-size : 80px; 
        animation : loadSpin 5s linear infinite;
    }
    @keyframes loadSpin {
        0% { transform : rotate(0deg) }
        100% { transform : rotate(3turn) }
    }
`

const ButtonBlock = styled.div`
    button {
        margin:50px 5px; padding:5px 10px; 
        &.on { background:red; color:#fff }
    }
`
const ProductInsert = styled.div`
    text-align:center;
    margin:50px 0;
    a { padding:10px 20px; background:#999; }
`

const PageButton = styled.div`
    text-align:center;
    button { padding:5px 10px; background:#ddd; margin:20px 5px;
        &.on { background:red }
    }
`

const ProductSection = ({title}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state=>state.members.user)
    const carts = useSelector(state=>state.products.carts)
    const allData = useSelector(state=>state.products.products)
    const currentPage = useSelector(state=>state.products.currentPage)
    const totalCount = useSelector(state=>state.products.totalCount)
    const totalPages = Math.ceil(totalCount / 12);
    const [products, setProducts] = useState(null)
    const sortType = [
        { type:'name', text:'상품명순'},
        { type:'price', text:'가격순'}
    ]

    const [changeSort, setChangeSort] = useState("")

    const [loading, setLoading] = useState(false)

    const sortFlag = useRef(false)

    const sortProduct = (keyname)=>{
        if (!sortFlag.current) {
            setProducts( (products)=>{
                let sortProducts = [...products]
                return sortProducts.sort( (a, b)=> a[keyname] < b[keyname] ? -1:1) 
            })
        } else {
            setProducts( (products)=>{
                let sortProducts = [...products]
                return sortProducts.sort( (a, b)=> a[keyname] > b[keyname] ? -1:1) 
            })
        }
        sortFlag.current = !sortFlag.current
    }

    const cartIdCount = (id) => {
        const userItem = carts.find(value=>value.key==id)
        if (userItem) {
            return userItem.qty
        } else {
            return 0
        }
    }

    const addToCart = async (id)=>{
        if (user) {
            
        } else {
            alert("로그인을 해주세요.")
            sessionStorage.setItem('previousUrl', '/product');
            navigate("/login")
        }
    }
    
    const renderPageButtons = ()=>{
        const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
        const endPage = Math.min(startPage + 9, totalPages);
        const pages = []
        if (startPage>1) {
            pages.push(
                <button key="prev" onClick={() => dispatch(setPage(startPage - 1))}>
                    &lt; 
                </button>
            );
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={currentPage === i ? 'on' : ''}
                    onClick={() => dispatch(setPage(i))}
                >
                    {i}
                </button>
            );
        }
        if (endPage < totalPages) {
            pages.push(
                <button key="next" onClick={() => dispatch(setPage(endPage + 1))}>
                    &gt;
                </button>
            );
        }
        return pages;
    }

    useEffect(()=>{
        dispatch(fetchProduct(currentPage, title))
    }, [dispatch, currentPage, title])

    useEffect(()=>{
        if (allData.length>0) {
            setProducts(allData);
            setLoading(true)
        }
    }, [allData])
 
    if (!loading) {
        return (
            <ProductSectionBlock>
                <LoadingBlock>
                    <ImSpinner className="loadIcon" />
                </LoadingBlock>
                <ProductInsert>
                    <Link to="/productInsert">상품등록</Link>
                </ProductInsert>
           </ProductSectionBlock>
        );
    } 
    return (
        <ProductSectionBlock>
            <ButtonBlock>
                {
                    sortType.map((item, index)=>(
                        <button key={index} onClick={()=>{setChangeSort(item.type); sortProduct(item.type)}} className={ changeSort==item.type && "on" }>{item.text}</button>
                    ))
                }
            </ButtonBlock>
            <UlBlock>
            {
                products.map((item, index)=>(
                    <ListBlock key={index}>
                        <div className="photo">
                            <Link to={`/product/${item.id}`} state={{ item : item }}><img src={`http://localhost:8001/uploads/${item.photo}`} alt={item.name} /></Link>
                        </div>
                        <div className="info">
                            <p><a href="#">{item.name}</a></p>
                            <p>{parseInt(item.price).toLocaleString()}</p>
                            <p>
                               { 
                                  Array.from({length:5}).map((_, index)=>(
                                    <span 
                                    key={index} 
                                    style={{ color: index < item.averageRating ? 'red' : '#ddd'}}
                                    >★</span>
                                  ))
                               }
                               <span style={{marginLeft:"10px"}}>{item.reviewCount}</span>건
                            </p>
                            { item.inventory!=cartIdCount(item.id) ? 
                                <>
                                    <button onClick={ ()=>addToCart(item.id) }><BsCartPlusFill /></button> 
                                    <span>{ item.inventory - cartIdCount(item.id) }개 남았습니다.</span>
                                </>
                                : 
                                <>
                                    <button><BsCartPlus /></button> 
                                    <span>품절!!</span>
                                </>
                            }
                        </div>
                    </ListBlock>
                ))
            }
            </UlBlock>
            <PageButton className="pagebutton">
                { renderPageButtons() }
            </PageButton>
            { (user && user.userId=='tsalt@hanmail.net') &&
                <ProductInsert>
                    <Link to="/productInsert">상품등록</Link>
                </ProductInsert>
            }
        </ProductSectionBlock>
    );
};

export default ProductSection;