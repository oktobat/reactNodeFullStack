import React from 'react';
import BoardType from '@/components/board/BoardType'
import BoardList from '@/components/board/BoardList'

const BoardListView = () => {

    return (
        <div className="row">
            <BoardType />
            <BoardList />
        </div>
    );
};

export default BoardListView;