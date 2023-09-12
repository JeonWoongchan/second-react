import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
import cart from './store/cartSlice.js'

export default configureStore({
    reducer: { 
        user : user.reducer,
        cart : cart.reducer
    }
}) 

//Redux state 수정
// 1. state에 reducers : {변경함수()} 만들기
// 2. export let {변수명} = state명.actions
// 3. 사용할 파일에서 변경함수명 import
// 4. 사용할 파일에서 useDispatch()
// 5. dispatch(변경함수명()) 으로 사용


