import React, { useEffect } from 'react';
import BoardType from '@/components/board/BoardType'
import BoardList from '@/components/board/BoardList'
import { useDispatch } from 'react-redux'
import { setPage } from '@/store/board'

const BoardListView = () => {
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setPage(1))
    }, [])

    return (
        <div className="row">
            <BoardType />
            <BoardList />
        </div>
    );
};

export default BoardListView;