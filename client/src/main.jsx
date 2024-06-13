import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '@/store/index.js'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import '@/assets/css/reset.css'
import { fetchNotice } from '@/store/board';
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

// 어플리케이션이 실행될 때 초기 데이터를 가져옴
store.dispatch(fetchNotice(1));

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> 태그로 이 감싸져있으면
  // 개발모드에서 (개발 단계시 오류를 잘 잡기위해) 두 번씩 렌더링함
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={googleClientId}>
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>,
)
