import express from 'express'   // 웹서버 생성을 위해 express 관련 파일을 가져옴
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path'            
import cors from 'cors'  
import authRouter from './routers/authRouter.js'
import boardRouter from './routers/boardRouter.js'
import productRouter from './routers/productRouter.js'
import otherRouter from './routers/otherRouter.js'

const app = express()
const PORT = 8001
          
// CORS 설정
app.use(cors({
    origin: 'http://localhost:5173',
    // methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
  
app.use(express.json())           // 사용자의 json 요청을 처리하여 req.body 객체에 저장해줌

const server = createServer(app); 
const wsServer = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  });

// WebSocket 연결관리
wsServer.on('connection', (socket)=>{
    console.log('a user connected', socket.id);

    // 클라이언트로부터 메시지 수신
    socket.on("Message", (msg)=>{
        console.log('message: ' + msg.message);
        // 모든 클라이언트에게 메시지 브로드캐스팅
        wsServer.emit('Message', msg);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

})  

// 리소스 파일들을 관리하는 경로 지정하기
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'build')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRouter)
app.use('/board', boardRouter)
app.use('/product', productRouter)
app.use('/other', otherRouter)


// 지정한 포트에서 서버를 실행함
server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))
