import React from 'react';
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const ModalBlock = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0; 
    background:rgba(0,0,0,0.5);
    display:none;
    &.on { display:flex; justify-content:center; align-items:center;
        .content {
            display:block; 
            width:308px; text-align:center; color:#555; background:#fff; 
            h2 { text-align:left; background:red; color:#fff; padding:10px; margin:0; font-size:20px; }
            p { padding:30px 0 }
            .btn { padding:20px 0; 
                button { border:1px solid #ddd; padding:5px; margin:0 5px }
            }
        }
    }
`

const Modal = ({modalOpen, onReset, product, qty}) => {
    
    const navigate = useNavigate()
    const user = useSelector(state=>state.members.user)

    const onBuy = ()=>{
        if (!user) {
            alert("로그인을 하십시오.")
            sessionStorage.setItem('previousUrl', '/payment');
            sessionStorage.setItem('choiceProduct', JSON.stringify({product : [{product, qty}] }))
            navigate("/login")
        } else {
            navigate("/payment", {state : {product : [{product, qty}] }})
        }
    }

    const onCart = ()=>{
        navigate("/cart")
    }

    return (
        <ModalBlock className={modalOpen.open && "on"}>
            { modalOpen.what == "buy" ?
                <div className="content">
                    <h2>확인</h2>
                    <p>바로구매를 진행하시겠습니까?</p>
                    <div className="btn">
                        <button onClick={onBuy}>확인</button>
                        <button onClick={onReset}>취소</button>
                    </div>
                </div>
                :
                <div className="content">
                    <h2>확인</h2>
                    <p>상품이 장바구니에 담겼습니다.<br />바로 확인 하시겠습니까?</p>
                    <div className="btn">
                        <button onClick={onCart}>확인</button>
                        <button onClick={onReset}>계속쇼핑</button>
                    </div>
                </div>
            }
        </ModalBlock>
    );
};

export default Modal;