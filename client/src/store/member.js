import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
    name:"member",
    initialState : {
        user : null,    // {userNo, userId, userPw, userIrum, handphone, zipCode, addr1, addr2, registerDate}
    },
    reducers : {
        userLogin(state, action){
            const { userNo, userId, userIrum, userPw, handphone, addr1, addr2, zipCode} = action.payload
            state.user = { userNo, userId, userIrum, userPw, handphone, addr1, addr2, zipCode}
            localStorage.loging = JSON.stringify({userNo:userNo, userId:userId}) 
        },
        localUser(state, action){
            state.user = action.payload
        },
        userLogout(state, action){
            state.user = null
            localStorage.clear()
        }
    }
})

export const { userLogin, userLogout, localUser } = memberSlice.actions;

export default memberSlice.reducer;