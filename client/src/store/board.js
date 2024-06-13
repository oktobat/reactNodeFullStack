import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const serverUrl = import.meta.env.VITE_API_URL;

const boardSlice = createSlice({
    name:"boards",
    initialState : {
        notice : [],  
        review : [],
        type : "notice",
        list : [],
        itemPerReviewCount : 0,  
        totalCount: 0,
        currentPage : 1,
    },
    reducers : {
        initNotice(state, action){
            state.notice = action.payload.data
            state.list = action.payload.data
            state.totalCount = action.payload.totalCount;
        },
        initReview(state, action){
            state.review = action.payload.data
            state.list = action.payload.data
            state.totalCount = action.payload.totalCount;
        },
        changeType(state, action){
            state.type = action.payload
            if (state.type=="notice") {
                state.list = state.notice
                state.currentPage = 1
            } else if (state.type=="review") {
                state.list = state.review
                state.currentPage = 1
            }
        },
        setPage(state, action) {
            state.currentPage = action.payload
        }
    }
})

export const { initNotice, initReview, changeType, setPage } = boardSlice.actions;

export const fetchNotice = (page) => (dispatch) =>{
    axios.get(`${serverUrl}/board/notice/list?page=${page}`)
    .then((res)=>{
        console.log("공지글", res)
        const { totalCount, data} = res.data;
        dispatch(initNotice({ totalCount : totalCount, data : data }))
    })
    .catch(err=>console.log(err))
}

export const fetchReview = (page) => (dispatch) =>{
    axios.get(`${serverUrl}/board/review/list?page=${page}`)
    .then((res)=>{
        console.log("공지글", res)
        const { totalCount, data} = res.data;
        dispatch(initReview({ totalCount : totalCount, data : data }))
    })
    .catch(err=>console.log(err))
}

export default boardSlice.reducer;