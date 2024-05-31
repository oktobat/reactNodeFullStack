import React, {useEffect} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

const BoardDetailBlock = styled.div`
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

const BoardDetail = ({post}) => {

    const type = useSelector(state=>state.boards.type)    
    const user = useSelector(state=>state.members.user)
    const currentPage = useSelector(state=>state.boards.currentPage)

    const navigate = useNavigate()

    const onRemove = (e)=>{
        e.preventDefault()
        if (type=="notice") {
            axios.get(`http://localhost:8001/board/notice/remove?no=${post.noNo}`)
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    navigate("/boardList", { state : {page : currentPage }})
                } else {
                    alert("삭제하지 못했습니다.")
                    return 
                }
            })
            .catch(err=>console.log(err))
        } else if (type=="review") {
            axios.get(`http://localhost:8001/board/review/remove?reNo=${post.reNo}&prNo=${post.prNo}`)
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    navigate("/boardList", { state : {page : currentPage }})
                } else {
                    alert("삭제하지 못했습니다.")
                    return 
                }
            })
            .catch(err=>console.log(err))
        }
    }

    useEffect(()=>{
        if (type=="notice") {
            axios.get(`http://localhost:8001/board/notice/hit?no=${post.noNo}&hit=${post.hit}`)
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    console.log("증가했습니다.")
                } else {
                    console.log("증가하지 못했습니다.")
                }
            })
            .catch(err=>console.log(err.toJSON()))
        } else if (type=="review") {
            axios.get(`http://localhost:8001/board/review/hit?no=${post.reNo}&hit=${post.hit}`)
            .then((res)=>{
                if (res.data.affectedRows==1) {
                    console.log("증가했습니다.")
                } else {
                    console.log("증가하지 못했습니다.")
                }
            })
            .catch(err=>console.log(err.toJSON()))
        }
    }, [])

    return (
        <BoardDetailBlock>
            <table border="1">
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <td>작성자</td>
                        <td><input type="text" name={post.writer} value={post.writer} disabled /></td>
                    </tr>
                    { type=="review" &&
                        <tr>
                            <td>평점</td>
                            <td>
                                {
                                    Array.from({length:5}).map((_, index)=>(
                                        <span 
                                        key={index} 
                                        style={{ color: index < post.rating ? 'red' : '#ddd', cursor:'pointer'}}
                                        >
                                            ★
                                        </span>  
                                    ))
                                }
                                <span>({post.rating})점</span>
                            </td>
                        </tr> 
                        }
                        { type=="notice" ? 
                            <tr>
                                <td>제목</td>
                                <td><input type="text" name="subject" value={post.subject} disabled /></td>
                            </tr>
                            :
                            <tr>
                                <td>상품명</td>
                                <td><input type="text" name="subject" value={post.subject} disabled /></td>
                            </tr>
                        }
                    <tr>
                        <td>내용</td>
                        <td><textarea name="content" value={post.content} disabled></textarea></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn">
                { (user && post.writer==user.userId) &&  
                    <>
                        <Link to={`/boardModify/${post.subject}`} state={{ post : post }}>수정</Link>
                        <a href="#" onClick={ onRemove }>삭제</a>
                    </>
                }
                <Link to="/boardList" state={{ page:currentPage}}>목록</Link>
            </div>
        </BoardDetailBlock>
    );
};

export default BoardDetail;