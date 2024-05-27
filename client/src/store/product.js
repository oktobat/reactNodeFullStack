import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const productSlice = createSlice({
    name:"products",
    initialState : {
        products : [],   // { "key":"", "category":"woman", "id":1001, "title":"여성의류1", "price":437500, "rating":5, "description":"여성의류1 요약설명은 <strong>중요</strong>합니다.", "inventory":10, "image":"./assets/image/0010050001972.jpg" },
        carts: [],       //  firebase : {key:key, userId:userId, id:id, qty:3 }
        cartsCount : 0,
        orders:[],
        totalCount:0,
        currentPage:1
    },
    reducers : {
        initProducts(state, action){
            state.products = action.payload.data
            state.totalCount = action.payload.totalCount
        },
        initCarts(state, action){
            state.carts = action.payload
            state.cartsCount = state.carts.length
        },
        initOrders(state, action){
            state.orders = action.payload
        },
        setPage(state, action){
            state.currentPage = action.payload
        }
    }
})

export const { initProducts, initCarts, initOrders, setPage } = productSlice.actions;

export const fetchProduct = (page, category)=>(dispatch)=>{
    axios.get(`http://localhost:8001/product/list?page=${page}&category=${category}`)
    .then((res)=>{
        console.log("상품목록", res)
        const { totalCount, data} = res.data;
        dispatch(initProducts({ totalCount : totalCount, data : data }))
    })
    .catch(err=>console.log(err))
}

export default productSlice.reducer;