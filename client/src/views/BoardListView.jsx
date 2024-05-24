import React, { useEffect } from 'react';
import BoardType from '@/components/board/BoardType'
import BoardList from '@/components/board/BoardList'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setPage } from '@/store/board'

const BoardListView = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { page } = location.state

    useEffect(()=>{
        dispatch(setPage(page))
    }, [page])
 
    return (
        <div className="row">
            <BoardType />
            <BoardList />
        </div>
    );
};

export default BoardListView;