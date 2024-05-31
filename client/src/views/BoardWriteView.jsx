import React from 'react';
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import BoardWrite from '@/components/board/BoardWrite'
import {useLocation} from 'react-router-dom'

const BoardWriteViewBlock = styled.div`
    h2 { 
        font-size:30px; text-align:center; margin:30px 0; 
    }
`

const BoardWriteView = () => {
    const location = useLocation()
    const {orderItem} = location.state
    const type = useSelector(state=>state.boards.type)

    return (
        <BoardWriteViewBlock className="row">
            <h2>{ type }</h2>
            <BoardWrite type={type} orderItem={orderItem} />
        </BoardWriteViewBlock>
    );
};

export default BoardWriteView;