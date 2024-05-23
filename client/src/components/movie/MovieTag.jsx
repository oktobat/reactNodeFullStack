import React, {useState} from 'react';
import styled from 'styled-components'

const MovieTagBlock = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
button {
    flex: 0 0 150px;
    border: 1px solid #00c183;
    padding: 10px 20px;
    margin: 0 10px 10px;
    color: #00c183;
    background: #fff;
    &:hover, &.on {
        color: #fff;
        background: #00c183;
    }
}
`

const MovieTag = ({onClick, changeType}) => {
    const movieType = [
        { name: '인기 영화',        media: 'movie',     type: 'popular' },
        { name: '현재 상영',        media: 'movie',     type: 'now_playing' },
        { name: '최신 영화',        media: 'movie',     type: 'upcoming' },
        { name: '인기 TV SHOW',     media: 'tv',        type: 'popular' },
        { name: 'TV 순위',          media: 'tv',        type: 'top_rated' },
        { name: 'TV SHOW',          media: 'tv',        type: 'on_the_air' }
      ]

    return (
        <MovieTagBlock>
            {
                movieType.map((item, index)=>(
                    <button key={index} type="button" onClick={()=>onClick({name:item.name, media:item.media, type:item.type}, 1)} className={changeType.name==item.name && 'on'}>{item.name}</button>
                ))
            }
        </MovieTagBlock>
    );
};

export default MovieTag;