import express from 'express'   // 웹서버 생성을 위해 express 관련 파일을 가져옴
const app = express()
const PORT = process.env.PORT || 8001
// 서버 오픈을 위한 포트 지정
// 포트 번호 : 0~65,535
// 주요 통신을 위한 규약에 이미 정해진 번호 : 0~1023
// 특정 프로토콜이나 어플리케이션에서 사용하는 번호 : 1024~49151
// 어플리케이션에서 혹은 임시 사용번호 : 49152~65535

import path from 'path'            // nodejs에 내장된 라이브러리. 설치없이 바로 사용함
import cors from 'cors'            // 교차출처 허용을 위한 라이브러리
const corsOptions = {
    origin:'http://localhost:5173', credentials:true
} 
app.use(cors(corsOptions)) 

app.use(express.json())           // 사용자의 json 요청을 처리하여 req.body 객체에 저장해줌

import authRouter from './routers/authRouter.js'
import boardRouter from './routers/boardRouter.js'
import productRouter from './routers/productRouter.js'

// 리소스 파일들을 관리하는 경로 지정하기
const __dirname = path.resolve()
// app.use(express.static(path.join(__dirname, 'build')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/auth', authRouter)
app.use('/board', boardRouter)
app.use('/product', productRouter)


// 지정한 포트에서 서버를 실행함
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))
