import React from 'react';
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import BoardDetail from '@/components/board/BoardDetail'
import {useLocation} from 'react-router-dom'

const BoardDetailViewBlock = styled.div`
    h2 { 
        font-size:30px; text-align:center; margin:30px 0; 
    }
`

const BoardDetailView = () => {
    
    const type = useSelector(state=>state.boards.type)
    const location = useLocation()
    const { post } = location.state

    return (
        <BoardDetailViewBlock className="row">
            <h2>{ type }</h2>
            <BoardDetail post={post} />
        </BoardDetailViewBlock>
    );
};

export default BoardDetailView;