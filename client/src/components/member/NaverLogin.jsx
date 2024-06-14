import React, { useEffect } from "react";
import styled from "styled-components";
import { ImSpinner } from "react-icons/im";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { userLogin } from '@/store/member';
import { fetchCart } from '@/store/product';

const Wrap = styled.div`

`;

const LoadingBlock = styled.div`
    height:100vh;
    display:flex; justify-content:center; align-items:center;
    .loadIcon {
        font-size : 80px; 
        animation : loadSpin 5s linear infinite;
    }
    @keyframes loadSpin {
        0% { transform : rotate(0deg) }
        100% { transform : rotate(3turn) }
    }
`

const NaverLogin = () => {
  const dispatch = useDispatch()
  const { naver } = window;

  const serverUrl = import.meta.env.VITE_API_URL;
  const naverClientId = import.meta.env.VITE_NAVER_AUTH_CLIENT_ID;
  const naverAuthRedirectUri = import.meta.env.VITE_NAVER_AUTH_REDIRECT_URI;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: naverClientId,
      callbackUrl: naverAuthRedirectUri,
      isPopup: false,
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(function (status) {
      if (status) {
        const naverId = naverLogin.user.getId(); 
        const email = naverLogin.user.getEmail();
        const name = naverLogin.user.getName();
        console.log("네이버 사용자 ID:", naverId);
        console.log("이메일:", email);
        console.log("이름:", name);
        if (!email && !name) {
          alert("이메일과 사용자명은 필수정보입니다. 정보제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        }
        // 백엔드로 네이버 계정으로 로그인한 회원의 정보를 전송
        axios.post(`${serverUrl}/auth/naverLogin`, {naverId, email, name})
        .then((res)=>{
            if (res.data) {
              alert("네이버 계정으로 로그인되었습니다.");
              console.log("회원입니다.", res.data)
              dispatch(userLogin(res.data))
              dispatch(fetchCart(res.data.userNo))
              window.opener.location.href = "/"
              window.close() 
            } else {
              alert("네이버 로그인에 실패했습니다.");
            }
        })
      } else {
        console.log("로그인 실패");
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

    return (
        <Wrap>
            <div className="container">
                <LoadingBlock>
                    <ImSpinner className="loadIcon" />
                </LoadingBlock>
            </div>
        </Wrap>
    );
  };
  
  export default NaverLogin;