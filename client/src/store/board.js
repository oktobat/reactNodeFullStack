import { createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
    name:"boards",
    initialState : {
        notice : [],  
        review : [],
        type : "notice",
        list : [],
        itemPerReviewCount : 0,  
    },
    reducers : {
        initNotice(state, action){
            state.notice = action.payload
            state.list = action.payload.sort((a, b)=>a.key>b.key ? -1 : 1);
        },
        initReview(state, action){
            state.review = action.payload.sort((a, b)=>a.key>b.key ? -1 : 1);
        },
        changeType(state, action){
            state.type = action.payload
            if (state.type=="notice") {
                state.list = state.notice.sort((a, b)=>a.key>b.key ? -1 : 1);
            } else if (state.type=="review") {
                state.list = state.review.sort((a, b)=>a.key>b.key ? -1 : 1);
            }
        }
    }
})

export const { initNotice, initReview, changeType } = boardSlice.actions;

export default boardSlice.reducer;