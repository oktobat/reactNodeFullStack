import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name:"products",
    initialState : {
        products : [],   // { "key":"", "category":"woman", "id":1001, "title":"여성의류1", "price":437500, "rating":5, "description":"여성의류1 요약설명은 <strong>중요</strong>합니다.", "inventory":10, "image":"./assets/image/0010050001972.jpg" },
        carts: [],       //  firebase : {key:key, userId:userId, id:id, qty:3 }
        cartsCount : 0,
        orders:[]
    },
    reducers : {
        initProducts(state, action){
            state.products = action.payload
        },
        initCarts(state, action){
            state.carts = action.payload
            state.cartsCount = state.carts.length
        },
        initOrders(state, action){
            state.orders = action.payload
        }
    }
})

export const { initProducts, initCarts, initOrders } = productSlice.actions;

export default productSlice.reducer;