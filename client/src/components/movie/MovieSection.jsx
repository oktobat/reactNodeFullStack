import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from 'axios'
import {useSelector} from 'react-redux'

const MovieSectionBlock = styled.ul`
    display: flex;
    flex-wrap: wrap;
`

const ListBlock = styled.li`
    flex: 0 0 23%;
    margin: 20px 1%;
    position: relative;
    a { display:block; img { width:100% }}
    .title { display: block;
      padding: 5px 0;
      font-size: 20px;
      font-weight: bold;
    }
    .star { position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      background-color: #fff;
      text-align: center;
      line-height: 30px;
      border-radius: 50%;
      font-size: 12px;
    }
    .like {
        position:absolute;
        bottom:0;
        right:0;
        color:hotpink;
        cursor:pointer;
        z-index:9999;
    }
`

const MovieSection = ({movies}) => {
    const user = useSelector(state => state.members.user);
    const [hearts, setHearts] = useState([]);  // [ { movieId:6999, isLiked:1 }, { movieId:69991, isLiked:0 } ]

    useEffect(()=>{
        if (user) {
            axios.post('http://localhost:8001/other/movie/likeList', { userNo: user.userNo })
            .then(res=>{
                if (res.data) {
                    console.log("좋아요리스트", res.data);
                    const newHearts = res.data.map(item => ({ movieId: item.movieId, isLiked: item.isLiked }));
                    setHearts(newHearts);
                } else {
                    console.log("저장실패");
                }
            })
            .catch(error => {
                console.error("좋아요 상태 전송 중 오류 발생:", error);
            });
        } else {
            setHearts(movies.map(movie => ({ movieId: movie.id, isLiked: 0 })));
        }
    }, [user, movies])

    const onToggle = (movieItem)=>{
        if (user) {
           const updatedHearts =  hearts.map((heart)=> heart.movieId==movieItem.id ? {...heart, isLiked:!heart.isLiked } : heart );
           setHearts(updatedHearts)
        } else {
            alert("로그인을 해주세요.")
            // sessionStorage.setItem('previousUrl', '/movie');
            // navigate("/login")
        }
    }

    return (
        <MovieSectionBlock>
            {
                movies.map((item, index)=>(
                    <ListBlock key={index}>
                        <a href={`https://www.themoviedb.org/movie/${item.id}?language=ko`} target="_blank">
                            <img src={`https://www.themoviedb.org/t/p/w500/${item.poster_path}`} onError={ (e)=>{ e.target.onerror=null; e.target.src="./assets/image/p_cravity.jpg" } } alt={item.title} />
                        </a>
                        <span className="title">{item.title}</span>
                        <span className="star">{item.vote_average.toFixed(1)}</span>
                        <span className="like" onClick={ () => onToggle(item) }>
                            {/* 
                               ? : 옵셔널 체이닝 연산자를 붙이면 hearts가 null일 경우 undefined를 리턴함. 
                                   이것을 안붙이면 아무 값도 리턴하지 않으며 오류로 인해 프로그램 중단됨.
                                   삼항조건연산문에서 undefined 는 false로 해석됨.
                            */}
                           { hearts.find(heart => heart.movieId === item.id)?.isLiked ? <FaHeart /> : <FaRegHeart /> }
                        </span>
                    </ListBlock>
                ))
            }
        </MovieSectionBlock>
    );
};

export default MovieSection;