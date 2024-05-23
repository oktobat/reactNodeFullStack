import React from 'react';
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import BoardModify from '@/components/board/BoardModify'
import styled from 'styled-components'

const BoardModifyViewBlock = styled.div`
h2 { 
    font-size:30px; text-align:center; margin:30px 0; 
}
`

const BoardModifyView = () => {

    const type = useSelector(state=>state.boards.type)
    const location = useLocation()
    const { post } = location.state

    return (
        <BoardModifyViewBlock className="row">
            <h2>{ type }</h2>
            <BoardModify post={post} />
        </BoardModifyViewBlock>
    );
};

export default BoardModifyView;