import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product'
import memberReducer from './member'
import boardReducer from './board'

const store = configureStore({
    reducer : {
        products : productReducer,
        members : memberReducer,
        boards : boardReducer
    }
})

export default store; 