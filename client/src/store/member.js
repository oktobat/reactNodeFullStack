import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
    name:"member",
    initialState : {
        members : [],  // [{key, userId, userPw, userIrum, 주소, ... }, {key, userId, userPw }, ...]
        user : null,    // {key, userId, userPw, 모든 정보}
    },
    reducers : {
        initMembers(state, action){
            state.members = action.payload
            const loggedInUser = JSON.parse(localStorage.getItem('loging'));
            if (loggedInUser) {
                const findUser = state.members.find(item=>item.key==loggedInUser.key)
                state.user = findUser
            }
        },
        userLogin(state, action){
            const { key, userId, userIrum, userPw, handphone, addr1, addr2, zipCode} = action.payload.findUser
            state.user = { key, userId, userIrum, userPw, handphone, addr1, addr2, zipCode}
            localStorage.loging = JSON.stringify({key:key, userId:userId}) 
        },
        localUser(state, action){
            const findUser = state.members.find(item=>item.key==action.payload.key)
            state.user = findUser
        },
        userLogout(state, action){
            state.user = null
            localStorage.clear()
        }
    }
})

export const { initMembers, userLogin, userLogout, localUser } = memberSlice.actions;

export default memberSlice.reducer;