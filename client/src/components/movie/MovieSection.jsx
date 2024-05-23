import React from 'react';
import styled from 'styled-components'

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
`

const MovieSection = ({movies}) => {
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
                    </ListBlock>
                ))
            }
        </MovieSectionBlock>
    );
};

export default MovieSection;