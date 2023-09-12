import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({ // useState 역할
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
        changeName(state){ //state 수정하는 함수, 파라미터는 기존 initialState 내용
            // obj, arr 형일때 state 수정하는법
            state.name == 'kim' ? state.name = 'park' : state.name = 'kim'
        },
        changeAge(state, action){// action : 걍 매개변수임
            state.age += action.payload;//.payload 써야 제대로 파라미터 가져옴
        }
    }
})

export let {changeName, changeAge} = user.actions // 오른쪽 자료를 변수로 쉽게 export

export default user;