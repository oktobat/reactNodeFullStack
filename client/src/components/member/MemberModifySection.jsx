import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { localUser, userLogout } from '@/store/member'
import axios from 'axios'

const MemberModifySectionBlock = styled.div`
    max-width:600px; margin:50px auto; 
    table { 
        col:nth-child(1) { width:150px }
        col:nth-child(2) { width:auto }
        td { padding:5px; 
            &:nth-child(1) { text-align:right }
            input { border:1px solid #ddd; height:30px; width:100%;
                text-indent:1em; }
        }
    }
    .btn { text-align:center; margin-top:20px; 
        button { padding:10px; background:red; color:#fff;  }
    }
`

const MemberModifySection = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.members.user)

    const userIdRef = useRef("")
    const userPwRef = useRef("")
    const userPwOkRef = useRef("")
    const mZipcodeRef = useRef("")
    const mAddressRef = useRef("")
    const mAddressSubRef = useRef("")

    const [userInfo, setUserInfo] = useState({
        userNo:user.userNo,
        userId:user.userId,
        userPw:"",
        userPwOk:"",
        userIrum:user.userIrum,
        handphone: user.handphone,
        zipCode : user.zipCode,
        addr1 : user.addr1,
        addr2 : user.addr2
    })

    const handleChange = (e)=>{
        const {value, name } = e.target
        setUserInfo(userInfo=>({...userInfo, [name]:value}))
    }

    const modify = async (e) =>{
        e.preventDefault()
        if (!userInfo.userPw) {
            alert("비밀번호를 입력하세요.")
            userPwRef.current.focus()
            return
        }
        if (!userInfo.userPwOk) {
            alert("비밀번호를 입력하세요.")
            userPwOkRef.current.focus()
            return
        }
        if (userInfo.userPw!=userInfo.userPwOk){
            alert("비밀번호가 일치하지 않습니다.")
            userPwRef.current.focus()
            return
        }
        
        axios.post("http://localhost:8001/auth/modify", { userInfo:userInfo })
        .then((res)=>{
            if (res.data.affectedRows==1) {
                alert("정보가 수정되었습니다.")
                console.log(JSON.parse(res.config.data).userInfo)
                dispatch(localUser(JSON.parse(res.config.data).userInfo))
                navigate("/")
            } else {
                alert("정보 수정중 오류가 발생했습니다.")
            }
        })

    }

    const memberRemove = async (e)=>{
        e.preventDefault()
        const answer = confirm("정말로 탈퇴하시겠습니까?")
        if (answer) {
            axios.post("http://localhost:8001/auth/remove", { userNo : userInfo.userNo })
            .then((res)=>{
                console.log("탈퇴성공", res)
                if (res.data.affectedRows==1) {
                    dispatch(userLogout())
                    navigate("/")
                } else {
                    alert("회원탈퇴를 실패했습니다.")
                    return
                }
            })
        } else {
            return
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
                addr1: fullAddr,
                addr2 : ""
            }));
            mAddressSubRef.current.focus();
            },
        }).open();
        };
    }, []);
   
    return (
        <MemberModifySectionBlock>
            <form onSubmit={modify}>
                <table border="0">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label htmlFor="userId">이메일 : </label></td>
                            <td><input type="text" name="userId" id="userId" ref={userIdRef} value={userInfo.userId} disabled /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userPw">비밀번호 : </label></td>
                            <td><input type="password" name="userPw" id="userPw" ref={userPwRef} value={userInfo.userPw} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userPwOk">비밀번호확인 : </label></td>
                            <td><input type="password" name="userPwOk" id="userPwOk" ref={userPwOkRef} value={userInfo.userPwOk} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userIrum">이름 : </label></td>
                            <td><input type="text" name="userIrum" id="userIrum" value={userInfo.userIrum} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="handphone">휴대폰번호 : </label></td>
                            <td><input type="text" name="handphone" id="handphone" value={userInfo.handphone} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td rowSpan="3"><label htmlFor="addr1">주소 : </label></td>
                            <td>
                                <button type="button" onClick={window.openDaumPostcode} style={{ height:'30px', verticalAlign:'middle', padding:'0 5px', marginRight:'5px'}}>우편번호</button>
                                <input style={{ width:'150px'}} type="text" name="zipCode" id="zipCode" ref={mZipcodeRef} value={userInfo.zipCode} onChange={handleChange} readOnly  />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name="addr1" id="addr1" ref={mAddressRef} value={userInfo.addr1} onChange={handleChange} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name="addr2" id="addr2" ref={mAddressSubRef} value={userInfo.addr2} onChange={handleChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                    <button type="submit">회원정보수정</button>
                    <button type="button" onClick={memberRemove} style={{marginLeft:"20px"}}>회원탈퇴</button>
                </div>
            </form>
        </MemberModifySectionBlock>
    );
};

export default MemberModifySection;