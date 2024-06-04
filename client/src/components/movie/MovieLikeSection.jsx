import React, { useState, useEffect} from 'react';
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import axios from 'axios'

const MovieLikeSectionBlock = styled.ul`
    display:flex;
    flex-wrap:wrap;
    li {
        flex:0 0 24%;
        margin:10px 0.5%; 
    }
`

const MovieLikeSection = () => {
    const user = useSelector(state=>state.members.user)
    const [myMovieLike, setMyMovieLike] = useState(null)  
    useEffect(() => {
        if (user) {
            axios.post('http://localhost:8001/other/movie/myMovieLike', { userNo: user.userNo })
                .then(res => {
                    if (res.data) {
                        console.log("좋아요리스트", res.data);
                        setMyMovieLike(res.data);
                    } else {
                        console.log("저장실패");
                    }
                })
                .catch(error => {
                    console.error("좋아요 상태 전송 중 오류 발생:", error);
                    // 실패 시 다시 이전 상태로 되돌리기
                });
        } 
    }, [user]);

    const onRemove = (likeNo)=>{
        setMyMovieLike(myMovieLike.filter(item=>item.no!=likeNo))
        axios.post('http://localhost:8001/other/movie/likeRemove', {no:likeNo, userNo:user.userNo})
        .then(res=>{
            if (res.data) {
                setMyMovieLike(res.data)
            } else {
                console.log("삭제 실패");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <>
        { user ?
             myMovieLike && myMovieLike.length>0 ?
                <MovieLikeSectionBlock>
                        {myMovieLike.map((item, index) => (
                                <li key={index}>
                                    <span>
                                        <img src={`https://www.themoviedb.org/t/p/w500/${item.moviePhoto}`} onError={ (e)=>{ e.target.onerror=null; e.target.src="./assets/image/p_cravity.jpg" } } alt={item.movieTitle} />
                                    </span>
                                    <span>{item.movieTitle}</span>
                                    <span style={{cursor:'pointer', padding:'3px 5px', background:'#ddd', display:'inline-block', marginLeft:'20px'}} onClick={()=>onRemove(item.no)}>삭제</span>
                                </li>
                        ))}
                </MovieLikeSectionBlock>
                :
                <div style={{textAlign:'center'}}>찜한 영화가 없습니다.</div>
            :
            <div style={{textAlign:'center'}}>
                로그인 후 확인할 수 있습니다.
            </div>
        }
        </>
    );
};

export default MovieLikeSection;