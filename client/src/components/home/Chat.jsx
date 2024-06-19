import React, {useEffect, useState, useRef} from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 99999999;
`;

const ChatMessages = styled.div`
  height: 200px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
`;

const UserInput = styled.form`
    display:flex;
    input { flex:1; height:50px; padding:5px;  }
    button { width:50px; background:red; color:#fff }
`

const socket = io('http://localhost:8001');

socket.on('connect', () => {
    console.log('connected to server');
});
socket.on('disconnect', () => {
    console.log('disconnected from server');
});

const Chat = () => {
    const [isUserName, setIsUserName] = useState(false)
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    const saveUser = (e)=>{
        e.preventDefault()
        if (userName=='') {
            setUserName("무명")
        }
        setIsUserName(true)
    }

    const sendMessage = (e)=>{
        e.preventDefault()
    }


    return (
        <ChatContainer>
            <h2>Chat Room</h2>
            <ChatMessages></ChatMessages>
            { !isUserName ? 
               (
                <UserInput onSubmit={saveUser}>
                    <input 
                    type="text" 
                    placeholder="닉네임을 입력하세요." 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    />
                    <button type="submit">저장</button>
                </UserInput>
               ) 
               : 
               (
                <UserInput onSubmit={sendMessage}>
                    <input 
                    type="text" 
                    placeholder="메세지를 입력하세요." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">전송</button>
                </UserInput>
               )
            }
        </ChatContainer>
    );
};

export default Chat;