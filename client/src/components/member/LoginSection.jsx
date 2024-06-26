import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import axios from 'axios'
import { userLogin } from '@/store/member';
import { fetchCart } from '@/store/product';
import {  useGoogleLogin } from '@react-oauth/google';
import  KakaoLogin  from 'react-kakao-login';

const serverUrl = import.meta.env.VITE_API_URL;
const KakaoClientId = import.meta.env.VITE_KAKAO_AUTH_CLIENT_ID;
// const KakaoAuthRedirectUri = import.meta.env.VITE_KAKAO_AUTH_REDIRECT_URI;


const LoginSectionBlock = styled.div`
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
    .snslogin { padding:50px 50px 50px 150px; 
        div { 
            display:flex; height:40px; line-height:40px; margin:5px 0; cursor:pointer;
            span:nth-child(1) { width:40px; text-align:center; font-size:18px; padding-top:1px }
            span:nth-child(2) { flex:1 }
            &.naver { background:#03c75a;   color:#fff }
            &.kakao { background:yellow;    color:#000 }
            &.google { background:#ea4335;  color:#fff }
            &.github { background:#000;     color:#fff }
        }
    }
`

const LoginSection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userId, setUserId] = useState("")
    const [userPw, setUserPw] = useState("")

    const userIdRef = useRef("")
    const userPwRef = useRef("")

    const previousUrl = sessionStorage.getItem('previousUrl');
    const previousState = sessionStorage.getItem('previousState');
    const choiceProduct = sessionStorage.getItem('choiceProduct')

    const handleLogin = (e)=>{
        e.preventDefault()
        if (!userId) {
            alert("이메일을 입력하세요.")
            userIdRef.current.focus()
            return
        }
        if (!userPw) {
            alert("비밀번호를 입력하세요.")
            userPwRef.current.focus()
            return
        }
        
        axios.get(`${serverUrl}/auth/login`, {params:{ userId, userPw }})
        .then((res)=>{
            memberLogin(res.data[0])
        })
        .catch(err=>console.log(err))
    }

    const memberLogin = (userData)=>{
        if (userData) {
            console.log("회원입니다.", userData)
            dispatch(userLogin(userData))
            dispatch(fetchCart(userData.userNo))
            if (previousUrl=='/payment') {
                navigate(previousUrl, {state:JSON.parse(choiceProduct)})
                sessionStorage.removeItem('previousUrl')
            } else if (previousUrl=='/product' &&  previousState){
                const state = JSON.parse(previousState);
                navigate(previousUrl, {state})
                sessionStorage.removeItem('previousUrl')
                sessionStorage.removeItem('previousState')
            } else if (previousUrl=='/cart'){
                navigate(previousUrl)
                sessionStorage.removeItem('previousUrl')
            } else {
                navigate('/')                
            }
        } else {
            alert("회원이 아닙니다.")
            userIdRef.current.focus()
            return false
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                console.log("구글에서 온 정보 :", userInfo)
                const { sub:googleId, email, name } = userInfo.data;

                axios.post(`${serverUrl}/auth/googleLogin`, { googleId, email, name })
                    .then((res) => {
                        if (res.data) {
                            alert("구글 계정으로 로그인되었습니다.");
                            console.log(res.data)
                            memberLogin(res.data)
                        } else {
                            alert("Google 로그인에 실패했습니다.");
                        }
                    })
                    .catch(err => console.log(err));
            } catch (error) {
                console.error("Google 로그인 에러:", error);
            }
        },
        onError: errorResponse => {
            console.error("Google 로그인 에러:", errorResponse);
        },
      });

    const onKakaoLogin = (response)=>{
        console.log("카카오에서 보내온 정보", response)
        const { id, kakao_account } = response.profile
        const { email, profile: { nickname } } = kakao_account

        axios.post(`${serverUrl}/auth/kakaoLogin`, {kakaoId : id, email, name:nickname})
        .then((res) => {
            if (res.data) {
                alert("카카오 계정으로 로그인되었습니다.");
                console.log(res.data);
                memberLogin(res.data);
            } else {
                alert("카카오 로그인에 실패했습니다.");
            }
        })
        .catch(err => console.log(err));
    }

    const naverClientId = import.meta.env.VITE_NAVER_AUTH_CLIENT_ID;
    const naverAuthRedirectUri = import.meta.env.VITE_NAVER_AUTH_REDIRECT_URI;
   
    useEffect(() => {
        initNaverLogin();
        }, []);
      
    const initNaverLogin = () => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: naverClientId,
            callbackUrl: naverAuthRedirectUri,
            isPopup: true,
            loginButton: { color: "green", type: 3, height: 60 },
            callbackHandle: true,
        });
        naverLogin.init();
    };
      
    const handleNaverClick = () => {
        const naverLoginButton = document.getElementById(
          "naverIdLogin_loginButton"
        );
        if (naverLoginButton) naverLoginButton.click();
    };
 
    return (
        <LoginSectionBlock>
            <form onSubmit={handleLogin}>
                <table>
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label htmlFor="userId">이메일: </label></td>
                            <td><input ref={userIdRef} type="text" id="userId" name="userId" onChange={ (e)=>setUserId(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userPw">비밀번호: </label></td>
                            <td><input ref={userPwRef} type="password" id="userPw" name="userPw" onChange={ (e)=>setUserPw(e.target.value) } /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                    <button type="submit">로그인</button>
                </div>
            </form>
            <div className="snslogin">
                <div id="naverIdLogin" style={{ display:'none'}} />
                <div className="naver">
                    <span style={{ fontSize:'15px'}}><SiNaver /></span>
                    <span onClick={handleNaverClick}>네이버 로그인</span> 
                </div>
                <KakaoLogin 
                   token={KakaoClientId}
                   onSuccess={onKakaoLogin}
                   onFail={console.error}
                   onLogout={console.info}
                   render={({onClick})=>(
                    <div className="kakao">
                        <span><RiKakaoTalkFill /></span>
                        <span onClick={onClick}>카카오 로그인</span>
                    </div>
                   )}
                />
                <div className="google">
                    <span><FaGoogle /></span>
                    <span onClick={googleLogin}>구글 로그인</span>
                </div>
            </div>
        </LoginSectionBlock>
    );
};

export default LoginSection;