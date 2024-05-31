import React, {useEffect} from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { changeType, fetchNotice, fetchReview, setPage } from '@/store/board'
import dayjs from 'dayjs'

const BoardListBlock = styled.div`
    margin:0px 0 50px; 
    table {
        col:nth-child(1) {width:50px }
        col:nth-child(2) {width:auto }
        col:nth-child(3) {width:200px }
        col:nth-child(4) {width:100px }
        col:nth-child(5) {width:100px }
        th { padding:5px }
        td { 
            padding:5px; text-align:center;
            &:nth-child(2) { text-align:left }
        }
    }
    .btn {
        text-align:center; margin:20px 0; 
        a { padding:10px 20px; background:red; color:#fff }
    }
    .pagebutton {
        text-align:center;
        button { padding:5px 10px; background:#ddd; margin:20px 5px;
            &.on { background:red }
        }
    }
`

const BoardList = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.members.user)
    const {list, type, totalCount, currentPage } = useSelector(state=>state.boards)

    const totalPages = Math.ceil(totalCount / 10);

    useEffect(()=>{
        if (type=="notice") {
            dispatch(changeType("notice"))
            dispatch(fetchNotice(1))
        } else {
            dispatch(changeType("review"))
            dispatch(fetchReview(1))
        }
    }, [dispatch, type])

    useEffect(()=>{
        if (type=="notice") {
            dispatch(fetchNotice(currentPage))
        } else {
            dispatch(fetchReview(currentPage))
        }
    }, [dispatch, currentPage])

    return (
        <BoardListBlock>
            <table border="1">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>날짜</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    { list.length>0 && list.map((post, index)=>(
                        <tr key={index}>
                            <td>{totalCount - ((currentPage - 1) * 10 + index)}</td>
                            <td><Link to={`/boardList/${post.subject}`} state={{ post : post }}>{post.subject}</Link></td>
                            <td>{post.writer}</td>
                            <td>{dayjs(post.date).format('YYYY-MM-DD')}</td>
                            <td>{post.hit}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <div className="pagebutton">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} className={ currentPage == (i+1) && "on"} onClick={()=>{ dispatch(setPage(i + 1)); } }>
                        {i + 1}
                    </button>
                ))}
            </div>
            { (type=="notice" && user && user.userId == "tsalt@hanmail.net") &&
                <div className="btn">
                    <Link to="/boardWrite">글쓰기</Link>
                </div>
            }
            {/* { (type=="review" && user) &&
                <div className="btn">
                    <Link to="/boardWrite">글쓰기</Link>
                </div>
            } */}
        </BoardListBlock>
    );
};

export default BoardList;