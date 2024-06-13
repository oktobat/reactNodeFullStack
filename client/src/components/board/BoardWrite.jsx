import React, {useState} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

const serverUrl = import.meta.env.VITE_API_URL;

const BoardWriteBlock = styled.div`
max-width:600px; margin:0 auto 50px; 
table {
    col:nth-child(1) { width:100px; }
    col:nth-child(2) { width:auto; }
    td { padding:5px;
        input { width:100%; border:1px solid #ddd; height:30px; padding:5px; }
        textarea { width:100%; border:1px solid #ddd; padding:5px; height:200px }
    }
}
.btn { text-align:center; margin-top:20px;
    button, a { margin:0 10px; padding:10px 20px; background:#ddd;
        font-size:14px }
}
`

const BoardWrite = ({ type, orderItem }) => {
    const user = useSelector(state=>state.members.user)
    const navigate = useNavigate()

    const [board, setBoard] = useState({
        writer:user.userId,
        subject:"",
        content:""
    })

    const [rating, setRating] = useState(5); 

    const handleStarClick = (starIndex) => {
        // 클릭된 별 이후의 모든 별의 색을 토글하고 평점을 설정합니다.
        setRating(starIndex); // 평점 설정
    };


    const handleChange = (e)=>{
        console.log(e)
        const {value, name} = e.target
        setBoard(post=>({...post, [name]:value }))
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        if (type=="notice") {
            axios.post(`${serverUrl}/board/notice/write`, { board:board })
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    navigate("/boardList", {state:{page:1}})
                } else {
                    alert("글이 등록되지 않았습니다.")
                }
            })
            .catch(err=>console.log(err))
        } else if (type=="review") {
            axios.post(`${serverUrl}/board/review/write`, { subject:orderItem.name, content:board.content, rating, prNo:orderItem.prNo, writer:user.userId, orderNo:orderItem.orderNo })
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    navigate("/boardList", {state:{page:1}})
                } else {
                    alert("글이 등록되지 않았습니다.")
                }
            })
            .catch(err=>console.log(err))
        }
    }

    return (
        <BoardWriteBlock>
            <form onSubmit={onSubmit}>
                <table border="1">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>작성자</td>
                            <td><input type="text" name={user.userId} value={user.userId} disabled /></td>
                        </tr>
                        { type=="review" &&
                           <tr>
                              <td>평점</td>
                              <td>
                                    {
                                        Array.from({length:5}).map((_, index)=>(
                                            <span 
                                            key={index} 
                                            style={{ color: index < rating ? 'red' : '#ddd', cursor:'pointer'}}
                                            onClick={ () => handleStarClick(index+1) }
                                            >
                                                ★
                                            </span>  
                                        ))
                                    }
                                    <span>({rating})점</span>
                              </td>
                           </tr> 
                        }
                        { type=="notice" ? 
                            <tr>
                                <td>제목</td>
                                <td><input type="text" name="subject" value={board.subject} onChange={handleChange} /></td>
                            </tr>
                            :
                            <tr>
                                <td>상품명</td>
                                <td><input type="text" name="subject" value={orderItem.name} disabled /></td>
                            </tr>
                        }
                        <tr>
                            <td>내용</td>
                            <td><textarea name="content" value={board.content} onChange={handleChange}></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                    <button type="submit">작성</button>
                    <Link to="/boardList" state={{ page:1}}>목록</Link>
                </div>
            </form>
        </BoardWriteBlock>
    );
};

export default BoardWrite;