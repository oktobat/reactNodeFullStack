import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

const PaymentSectionBlock = styled.div`
    h2 { margin:20px 0 }
    table { margin-bottom:50px }
    table.orderList {
        col:nth-child(1) { width:auto}
        col:nth-child(2) { width:150px; }
        col:nth-child(3) { width:150px; }
        thead { th { padding:10px } }
        tbody { td { padding:10px } }
        tfoot {
            td { text-align:center; 
                >div {
                  padding:20px; 
                  display:flex; 
                  justify-content:center; 
                  align-items:center;  
                  >div { margin:0 20px; 
                       p:nth-child(2) { font-size:30px }
                    }
                }
            }
        }
    }

    table.customerInfo {
        col:nth-child(1) { width:150px }
        col:nth-child(2) { width:auto }
        tbody { td { padding:10px } }
        input[type=text] { border:1px solid #ddd; height:30px; width:400px; padding-left:10px }
        input[type=radio] + span { margin-right:20px }
    }

`

const PaymentSection = ({product}) => {

    const user = useSelector(state=>state.members.user)
    console.log(user)
    const total = product.reduce((acc, item)=>acc+(parseInt(item.product.price) * parseInt(item.qty)), 0)

    const mZipcodeRef = useRef("")
    const mAddressRef = useRef("")
    const mAddressSubRef = useRef("")

    const [userInfo, setUserInfo] = useState({
        userId: user.userId,
        userIrum: user.userIrum,
        handphone: user.handphone,
        zipCode : user.zipCode,
        addr1 : user.addr1,
        addr2 : user.addr2
    })

    const handleChange = (e)=>{
        const {value, name } = e.target
        setUserInfo(userInfo=>({...userInfo, [name]:value}))
    }

    const [placeType, setPlaceType] = useState('default');
    const placeTypeChange = (type) => {
        setPlaceType(type);
      };

    const onReset = (type)=>{
        if (type=="default") {
            setUserInfo({
                userId: user.userId,
                userIrum: user.userIrum,
                handphone: user.handphone,
                zipCode: user.zipCode,
                addr1 : user.addr1,
                addr2 : user.addr2
            })
        } else {
            setUserInfo({
                userId: "",
                userIrum: "",
                handphone: "",
                zipCode: "",
                addr1 : "",
                addr2 : ""
            })
        }
    }

    useEffect(() => {
        window.openDaumPostcode = () => {
          new window.daum.Postcode({
            oncomplete: (data) => {
              let fullAddr = ''; // 최종 주소 변수
              let extraAddr = ''; // 조합형 주소 변수
              if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                fullAddr = data.roadAddress;
              } else { // 사용자가 지번 주소를 선택했을 경우(J)
                fullAddr = data.jibunAddress;
              }
              if (data.userSelectedType === 'R') {
                if (data.bname !== '') {
                  extraAddr += data.bname;
                }
                if (data.buildingName !== '') {
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
              }
              // 주소 정보를 입력 요소에 설정
              setUserInfo(prevState => ({
                  ...prevState,
                  zipCode: data.zonecode,
                  addr1: fullAddr
              }));
              mAddressSubRef.current.focus();
            },
          }).open();
        };
    }, []);


    return (
        <PaymentSectionBlock>
            <h2>STEP1. 주문하시는 상품</h2>
            <table className="orderList" border="1">
                <colgroup>
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>상품명</th>
                        <th>주문금액</th>
                        <th>배송비</th>
                    </tr>
                </thead>
                <tbody>
                    { product.map((item, index)=>(
                        <tr key={index}>
                            <td><img src={item.product.photo} alt={item.product.name} /> 상품명 : {item.product.name} / 수량 : {item.qty}개 / 가격 : {parseInt(item.product.price).toLocaleString()}원</td>
                            <td style={{textAlign:"right"}}>{(parseInt(item.qty)*parseInt(item.product.price)).toLocaleString()}원</td>
                            <td style={{textAlign:"right"}}>0원</td>
                        </tr>
                    ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            <div>
                                <div>
                                    <p>주문금액</p>
                                    <p>{total.toLocaleString()}원</p>
                                </div>
                                <div style={{fontSize:'30px'}}>
                                    +
                                </div>
                                <div>
                                    <p>배송비</p>
                                    <p>0원</p>
                                </div>
                                <div style={{fontSize:'30px'}}>
                                    =
                                </div>
                                <div>
                                    <p>총 주문금액</p>
                                    <p>{total.toLocaleString()}원</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <h2>STEP2. 주문고객/배송지 정보</h2>
            <table className="customerInfo" border="1">
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <td>주문하시는 분</td>
                        <td>주문하시는 분의 정보를 입력하는 곳입니다.(*는 필수)</td>
                    </tr>
                    <tr>
                        <td>주문지 선택</td>
                        <td>
                            <input type="radio" name="placeType" value="default" onClick={()=>{onReset("default"); placeTypeChange("default")}} checked={placeType=="default" } /> <span>기본주소(회원정보)</span>
                            <input type="radio" name="placeType" value="self" onClick={ ()=>{onReset("self"); placeTypeChange("self")} } checked={placeType=="self" } /> <span>새로입력</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            이름
                        </td>
                        <td>
                            <input type="text" value={userInfo.userIrum} />
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan="3"><label htmlFor="addr1">주소 : </label></td>
                        <td>
                            <button type="button" onClick={window.openDaumPostcode} style={{ height:'30px', verticalAlign:'middle', padding:'0 5px', marginRight:'5px'}}>우편번호</button>
                            <input style={{ width:'150px'}} type="text" name="zipCode" id="zipCode" ref={mZipcodeRef} value={userInfo.zipCode} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="addr1" id="addr1" ref={mAddressRef} value={userInfo.addr1} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="addr2" id="addr2" ref={mAddressSubRef} value={userInfo.addr2} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>휴대전화</td>
                        <td>
                            <input type="text" name="handphone" value={userInfo.handphone} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>
                            <input type="text" name="userId" value={userInfo.userId} onChange={handleChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{ textAlign:'center'}}>
                <Link to="/paymentFinish" state={{ product }} style={{ padding:'10px', background:'red', color:'#fff'}}>결제하기</Link>
            </div>
        </PaymentSectionBlock>
    );
};

export default PaymentSection;